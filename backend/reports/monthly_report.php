<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$user_id = $_SESSION['user_id'];
$month = $_GET['month'] ?? date("n");
$year = $_GET['year'] ?? date("Y");

$incomeStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM income
     WHERE user_id = ?
     AND MONTH(income_date) = ?
     AND YEAR(income_date) = ?"
);

$incomeStmt->execute([
    $user_id,
    $month,
    $year
]);

$income =
    $incomeStmt->fetch(PDO::FETCH_ASSOC)['total'];

$expenseStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM expenses
     WHERE user_id = ?
     AND MONTH(expense_date) = ?
     AND YEAR(expense_date) = ?"
);

$expenseStmt->execute([
    $user_id,
    $month,
    $year
]);

$expense =
    $expenseStmt->fetch(PDO::FETCH_ASSOC)['total'];

echo json_encode([
    "success" => true,
    "month" => date(
            "F",
            mktime(0, 0, 0, $month, 1)
        ),
    "year" => $year,
    "income" => (float)$income,
    "expenses" => (float)$expense,
    "balance" => (float)($income - $expense)
]);