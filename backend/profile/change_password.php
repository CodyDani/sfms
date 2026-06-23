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

$current_password =
    $data['current_password'] ?? '';

$new_password =
    $data['new_password'] ?? '';

if (
    empty($current_password) ||
    empty($new_password)
) {

    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);

    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("
    SELECT password
    FROM users
    WHERE id = ?
");

$stmt->execute([$user_id]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (
    !password_verify(
        $current_password,
        $user['password']
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "Current password is incorrect"
    ]);

    exit;
}

$newHash =
    password_hash(
        $new_password,
        PASSWORD_DEFAULT
    );

$update = $conn->prepare("
    UPDATE users
    SET password = ?
    WHERE id = ?
");

$update->execute([
    $newHash,
    $user_id
]);

echo json_encode([
    "success" => true,
    "message" => "Password changed successfully"
]);