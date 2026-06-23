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

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');

if (
    empty($full_name) ||
    empty($email)
) {

    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);

    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("
    UPDATE users
    SET
        full_name = ?,
        email = ?
    WHERE id = ?
");

$stmt->execute([
    $full_name,
    $email,
    $user_id
]);

echo json_encode([
    "success" => true,
    "message" => "Profile updated successfully"
]);