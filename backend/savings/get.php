<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$id = $_GET['id'] ?? '';

$stmt = $conn->prepare(
    "SELECT *
     FROM savings_goals
     WHERE id = ?
     AND user_id = ?"
);

$stmt->execute([
    $id,
    $_SESSION['user_id']
]);

$goal = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $goal
]);