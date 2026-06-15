<?php

require_once "../config/cors.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (
    empty($full_name) ||
    empty($email) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email format"
    ]);
    exit;
}

$checkUser = $conn->prepare(
    "SELECT id FROM users WHERE email = ?"
);

$checkUser->execute([$email]);

if ($checkUser->rowCount() > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Email already exists"
    ]);

    exit;
}

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);

$stmt = $conn->prepare(
    "INSERT INTO users(full_name,email,password)
     VALUES(?,?,?)"
);

$result = $stmt->execute([
    $full_name,
    $email,
    $hashedPassword
]);

if ($result) {

    echo json_encode([
        "success" => true,
        "message" => "Registration successful"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);
}