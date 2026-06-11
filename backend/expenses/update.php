<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$category_id = $data['category_id'] ?? '';
$amount = $data['amount'] ?? '';
$description = trim($data['description'] ?? '');
$expense_date = $data['expense_date'] ?? '';
$priority = $data['priority'] ?? 'Essential';

$stmt = $conn->prepare(
    "UPDATE expenses
     SET category_id = ?,
         amount = ?,
         description = ?,
         expense_date = ?,
         priority = ?
     WHERE id = ?
     AND user_id = ?"
);

$result = $stmt->execute([
    $category_id,
    $amount,
    $description,
    $expense_date,
    $priority,
    $id,
    $_SESSION['user_id']
]);

echo json_encode([
    "success" => $result
]);