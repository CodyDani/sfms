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
$month = $_GET['month'] ?? date("n");
$year = $_GET['year'] ?? date("Y");

$totalIncome = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM income
     WHERE user_id = ?
     AND MONTH(income_date) = ?
     AND YEAR(income_date) = ?"
);

$totalIncome->execute([
    $user_id,
    $month,
    $year
]);

$income = $totalIncome->fetch(PDO::FETCH_ASSOC)['total'];

$totalExpense = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM expenses
     WHERE user_id = ?
     AND MONTH(expense_date) = ?
     AND YEAR(expense_date) = ?"
);

$totalExpense->execute([
    $user_id,
    $month,
    $year
]);

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
    
$savingsRate = 0;

if ($income > 0) {
    $savingsRate =
        round((($income - $expense) / $income) * 100, 2);
}

echo json_encode([
    "success" => true,
    "total_income" => (float)$income,
    "total_expenses" => (float)$expense,
    "balance" => (float)($income - $expense),
    "savings_rate" => round($savingsRate, 2),
    "categories" => (int)$categories,
    "transactions" => (int)$transactions
]);