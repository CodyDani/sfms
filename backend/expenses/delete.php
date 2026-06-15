<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';

$stmt = $conn->prepare(
    "DELETE FROM expenses
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