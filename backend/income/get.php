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

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "Income ID is required"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT *
     FROM income
     WHERE id = ?
     AND user_id = ?"
);

$stmt->execute([
    $id,
    $_SESSION['user_id']
]);

$income = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$income) {
    echo json_encode([
        "success" => false,
        "message" => "Income record not found"
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "data" => $income
]);