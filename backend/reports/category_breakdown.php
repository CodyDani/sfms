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
$month = $_GET['month'] ?? date("n");
$year = $_GET['year'] ?? date("Y");

$stmt = $conn->prepare("
SELECT

    c.category_name,

    COALESCE(
        SUM(e.amount),
        0
    ) AS total

FROM categories c

LEFT JOIN expenses e
ON e.category_id = c.id
AND MONTH(e.expense_date) = ?
AND YEAR(e.expense_date) = ?

WHERE c.user_id = ?

GROUP BY c.id

ORDER BY total DESC
");

$stmt->execute([
    $month,
    $year,
    $user_id
]);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $data
]);