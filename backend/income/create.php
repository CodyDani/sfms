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

$data = json_decode(file_get_contents("php://input"), true);

$amount = $data['amount'] ?? '';
$source = trim($data['source'] ?? '');
$description = trim($data['description'] ?? '');
$income_date = $data['income_date'] ?? '';

if (
    empty($amount) ||
    empty($source) ||
    empty($income_date)
) {
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO income
    (user_id, amount, source, description, income_date)
    VALUES (?, ?, ?, ?, ?)"
);

$result = $stmt->execute([
    $_SESSION['user_id'],
    $amount,
    $source,
    $description,
    $income_date
]);

echo json_encode([
    "success" => $result,
    "message" => $result
        ? "Income added successfully"
        : "Failed to add income"
]);