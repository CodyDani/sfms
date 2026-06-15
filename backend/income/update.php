<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$amount = $data['amount'] ?? '';
$source = trim($data['source'] ?? '');
$description = trim($data['description'] ?? '');
$income_date = $data['income_date'] ?? '';

$stmt = $conn->prepare(
    "UPDATE income
     SET amount = ?,
         source = ?,
         description = ?,
         income_date = ?
     WHERE id = ?
     AND user_id = ?"
);

$result = $stmt->execute([
    $amount,
    $source,
    $description,
    $income_date,
    $id,
    $_SESSION['user_id']
]);

echo json_encode([
    "success" => $result
]);