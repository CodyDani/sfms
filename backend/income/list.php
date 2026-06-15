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
    "SELECT *
     FROM income
     WHERE user_id = ?
     ORDER BY income_date DESC"
);

$stmt->execute([
    $_SESSION['user_id']
]);

$income = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $income
]);