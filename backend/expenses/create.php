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

$category_id = $data['category_id'] ?? '';
$amount = $data['amount'] ?? '';
$description = trim($data['description'] ?? '');
$expense_date = $data['expense_date'] ?? '';
$priority = $data['priority'] ?? 'Essential';

if (
    empty($category_id) ||
    empty($amount) ||
    empty($expense_date)
) {
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO expenses
    (user_id, category_id, amount, description, expense_date, priority)
    VALUES (?, ?, ?, ?, ?, ?)"
);

$result = $stmt->execute([
    $_SESSION['user_id'],
    $category_id,
    $amount,
    $description,
    $expense_date,
    $priority
]);

echo json_encode([
    "success" => $result,
    "message" => $result
        ? "Expense added successfully"
        : "Failed to add expense"
]);