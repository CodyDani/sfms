<?php

require_once "../config/cors.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();


require_once "../config/database.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (
    empty($email) ||
    empty($password)
) {

    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);

    exit;
}

$stmt = $conn->prepare(
    "SELECT * FROM users WHERE email = ?"
);

$stmt->execute([$email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials"
    ]);

    exit;
}

if (
    !password_verify(
        $password,
        $user['password']
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials"
    ]);

    exit;
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['full_name'];

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user['id'],
        "full_name" => $user['full_name'],
        "email" => $user['email']
    ]
]);