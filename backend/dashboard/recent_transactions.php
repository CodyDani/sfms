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
    id,
    amount,
    source AS description,
    'Income' AS type,
    created_at

FROM income

WHERE user_id = ?

UNION ALL

SELECT
    id,
    amount,
    description,
    'Expense' AS type,
    created_at

FROM expenses

WHERE user_id = ?

ORDER BY created_at DESC

LIMIT 10

";

$stmt = $conn->prepare($query);

$stmt->execute([
    $userId,
    $userId
]);

$transactions =
    $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $transactions
]);