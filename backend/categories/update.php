<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$category_name = $data['category_name'] ?? '';
$budget_amount = $data['budget_amount'] ?? '';

$stmt = $conn->prepare(
    "UPDATE categories
     SET category_name = ?,
         budget_amount = ?
     WHERE id = ?
     AND user_id = ?"
);

$result = $stmt->execute([
    $category_name,
    $budget_amount,
    $id,
    $_SESSION['user_id']
]);

echo json_encode([
    "success" => $result
]);