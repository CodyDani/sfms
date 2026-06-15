<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);

    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "
SELECT

c.id,
c.category_name,
c.budget_amount,

COALESCE(SUM(e.amount),0) AS amount_spent

FROM categories c

LEFT JOIN expenses e
ON c.id = e.category_id

AND e.user_id = c.user_id

WHERE c.user_id = ?

GROUP BY c.id

ORDER BY c.category_name
";

$stmt = $conn->prepare($sql);

$stmt->execute([$user_id]);

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

$result = [];

foreach ($categories as $category) {

    $budget = (float)$category['budget_amount'];

    $spent = (float)$category['amount_spent'];

    $remaining = $budget - $spent;

    $percentage = 0;

    if ($budget > 0) {

        $percentage =
            round(($spent / $budget) * 100, 2);
    }

    $status = "Safe";

    if ($percentage >= 80 && $percentage < 100) {

        $status = "Warning";

    } elseif ($percentage >= 100) {

        $status = "Exceeded";
    }

    $result[] = [

        "category_name" =>
            $category['category_name'],

        "budget_amount" =>
            $budget,

        "amount_spent" =>
            $spent,

        "remaining_budget" =>
            $remaining,

        "usage_percentage" =>
            $percentage,

        "status" =>
            $status
    ];
}

echo json_encode([
    "success" => true,
    "data" => $result
]);