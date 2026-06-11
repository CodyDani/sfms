<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
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

$category_name = trim($data['category_name'] ?? '');
$budget_amount = trim($data['budget_amount'] ?? '');

if (empty($category_name)) {
    echo json_encode([
        "success" => false,
        "message" => "Category name is required"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO categories
    (user_id, category_name, budget_amount)
    VALUES (?, ?, ?)"
);

$result = $stmt->execute([
    $_SESSION['user_id'],
    $category_name,
    $budget_amount
]);

if ($result) {

    echo json_encode([
        "success" => true,
        "message" => "Category created successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to create category"
    ]);
}