<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare(
"
SELECT

COUNT(*) total_goals,

COALESCE(
SUM(target_amount),
0
) total_target,

COALESCE(
SUM(current_amount),
0
) total_saved

FROM savings_goals

WHERE user_id = ?
"
);

$stmt->execute([$user_id]);

$data = $stmt->fetch(PDO::FETCH_ASSOC);

$progress = 0;

if ($data['total_target'] > 0) {

    $progress = round(
        (
            $data['total_saved']
            /
            $data['total_target']
        ) * 100,
        2
    );
}

echo json_encode([
    "success" => true,
    "total_goals" =>
        (int)$data['total_goals'],

    "total_target" =>
        (float)$data['total_target'],

    "total_saved" =>
        (float)$data['total_saved'],

    "overall_progress" =>
        $progress
]);