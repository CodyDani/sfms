<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare(
    "SELECT *
     FROM savings_goals
     WHERE user_id = ?
     ORDER BY created_at DESC"
);

$stmt->execute([$user_id]);

$goals = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($goals as &$goal) {

    $goal['progress_percentage'] =
        $goal['target_amount'] > 0
            ? round(
                ($goal['current_amount']
                / $goal['target_amount']) * 100,
                2
            )
            : 0;
}

echo json_encode([
    "success" => true,
    "data" => $goals
]);