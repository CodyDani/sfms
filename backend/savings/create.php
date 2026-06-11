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

$data = json_decode(file_get_contents("php://input"), true);

$goal_name = trim($data['goal_name'] ?? '');
$target_amount = $data['target_amount'] ?? '';
$current_amount = $data['current_amount'] ?? 0;
$target_date = $data['target_date'] ?? null;

if (
    empty($goal_name) ||
    empty($target_amount)
) {

    echo json_encode([
        "success" => false,
        "message" => "Goal name and target amount are required"
    ]);

    exit;
}

$status = 'Active';

if ($current_amount >= $target_amount) {
    $status = 'Completed';
}

$stmt = $conn->prepare(
    "INSERT INTO savings_goals
    (
        user_id,
        goal_name,
        target_amount,
        current_amount,
        target_date,
        status
    )
    VALUES
    (?, ?, ?, ?, ?, ?)"
);

$result = $stmt->execute([
    $_SESSION['user_id'],
    $goal_name,
    $target_amount,
    $current_amount,
    $target_date,
    $status
]);

echo json_encode([
    "success" => $result,
    "message" => $result
        ? "Savings goal created successfully"
        : "Failed to create goal"
]);