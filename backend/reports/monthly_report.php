<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

$user_id = $_SESSION['user_id'];

$incomeStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM income
     WHERE user_id=?
     AND MONTH(income_date)=MONTH(CURDATE())
     AND YEAR(income_date)=YEAR(CURDATE())"
);

$incomeStmt->execute([$user_id]);

$income =
    $incomeStmt->fetch(PDO::FETCH_ASSOC)['total'];

$expenseStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) total
     FROM expenses
     WHERE user_id=?
     AND MONTH(expense_date)=MONTH(CURDATE())
     AND YEAR(expense_date)=YEAR(CURDATE())"
);

$expenseStmt->execute([$user_id]);

$expense =
    $expenseStmt->fetch(PDO::FETCH_ASSOC)['total'];

echo json_encode([
    "success" => true,
    "month" => date("F"),
    "income" => (float)$income,
    "expenses" => (float)$expense,
    "balance" => (float)($income - $expense)
]);