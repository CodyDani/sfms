<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);

    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("
    SELECT
        id,
        full_name,
        email
    FROM users
    WHERE id = ?
");

$stmt->execute([$user_id]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "user" => $user
]);