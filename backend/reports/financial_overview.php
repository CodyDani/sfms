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

$totalIncome = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM income
     WHERE user_id=?"
);

$totalIncome->execute([$user_id]);

$income = $totalIncome->fetch(PDO::FETCH_ASSOC)['total'];

$totalExpense = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM expenses
     WHERE user_id=?"
);

$totalExpense->execute([$user_id]);

$expense = $totalExpense->fetch(PDO::FETCH_ASSOC)['total'];

$categoryCount = $conn->prepare(
    "SELECT COUNT(*) total
     FROM categories
     WHERE user_id=?"
);

$categoryCount->execute([$user_id]);

$categories = $categoryCount->fetch(PDO::FETCH_ASSOC)['total'];

$transactionCount = $conn->prepare(
    "SELECT
        (
            (SELECT COUNT(*) FROM income WHERE user_id=?)
            +
            (SELECT COUNT(*) FROM expenses WHERE user_id=?)
        ) total"
);

$transactionCount->execute([
    $user_id,
    $user_id
]);

$transactions =
    $transactionCount->fetch(PDO::FETCH_ASSOC)['total'];

echo json_encode([
    "success" => true,
    "total_income" => (float)$income,
    "total_expenses" => (float)$expense,
    "balance" => (float)($income - $expense),
    "categories" => (int)$categories,
    "transactions" => (int)$transactions
]);