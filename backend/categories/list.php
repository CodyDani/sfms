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

$stmt = $conn->prepare(
    "SELECT *
     FROM categories
     WHERE user_id = ?
     ORDER BY id DESC"
);

$stmt->execute([
    $_SESSION['user_id']
]);

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $categories
]);