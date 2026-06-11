<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';

$stmt = $conn->prepare(
    "DELETE FROM income
     WHERE id = ?
     AND user_id = ?"
);

$result = $stmt->execute([
    $id,
    $_SESSION['user_id']
]);

echo json_encode([
    "success" => $result
]);