<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

$id = $_GET['id'] ?? '';

$stmt = $conn->prepare(
    "SELECT *
     FROM expenses
     WHERE id = ?
     AND user_id = ?"
);

$stmt->execute([
    $id,
    $_SESSION['user_id']
]);

$expense = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $expense
]);