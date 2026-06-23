<?php

require_once "../config/cors.php";
require_once "../config/database.php";

session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

$userId = $_SESSION['user_id'];

$query = "
SELECT
    c.id,
    c.category_name,
    c.budget_amount,

    COALESCE(
        SUM(e.amount),
        0
    ) AS spent_amount

FROM categories c

LEFT JOIN expenses e
    ON e.category_id = c.id

WHERE c.user_id = ?

GROUP BY
    c.id,
    c.category_name,
    c.budget_amount

ORDER BY c.category_name ASC
";

$stmt = $conn->prepare($query);
$stmt->execute([$userId]);

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($categories as &$category) {

    $budget = (float)$category['budget_amount'];
    $spent = (float)$category['spent_amount'];

    $category['percentage'] =
        $budget > 0
            ? round(($spent / $budget) * 100)
            : 0;

    $category['remaining'] =
        max($budget - $spent, 0);

    $category['overspent'] =
        $spent > $budget
            ? $spent - $budget
            : 0;
}

echo json_encode([
    "success" => true,
    "data" => $categories
]);