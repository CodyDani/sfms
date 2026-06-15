<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$status = 'Active';

if ($data['current_amount'] >= $data['target_amount']) {
    $status = 'Completed';
}

$stmt = $conn->prepare(
    "UPDATE savings_goals
     SET
     goal_name = ?,
     target_amount = ?,
     current_amount = ?,
     target_date = ?,
     status = ?
     WHERE id = ?
     AND user_id = ?"
);

$result = $stmt->execute([
    $data['goal_name'],
    $data['target_amount'],
    $data['current_amount'],
    $data['target_date'],
    $status,
    $id,
    $_SESSION['user_id']
]);

echo json_encode([
    "success" => $result
]);