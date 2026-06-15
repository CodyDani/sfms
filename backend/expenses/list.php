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

$stmt = $conn->prepare(
    "SELECT
        e.*,
        c.category_name
     FROM expenses e
     INNER JOIN categories c
        ON e.category_id = c.id
     WHERE e.user_id = ?
     ORDER BY e.expense_date DESC"
);

$stmt->execute([
    $_SESSION['user_id']
]);

$expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $expenses
]);