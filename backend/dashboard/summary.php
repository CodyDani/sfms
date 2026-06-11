<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];


// TOTAL INCOME
$stmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS total_income
     FROM income
     WHERE user_id = ?"
);

$stmt->execute([$user_id]);

$totalIncome = $stmt->fetch(PDO::FETCH_ASSOC)['total_income'];


// TOTAL EXPENSES
$stmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS total_expenses
     FROM expenses
     WHERE user_id = ?"
);

$stmt->execute([$user_id]);

$totalExpenses = $stmt->fetch(PDO::FETCH_ASSOC)['total_expenses'];


// BALANCE
$balance = $totalIncome - $totalExpenses;


// ESSENTIAL EXPENSES
$stmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS total
     FROM expenses
     WHERE user_id = ?
     AND priority = 'Essential'"
);

$stmt->execute([$user_id]);

$essentialExpenses = $stmt->fetch(PDO::FETCH_ASSOC)['total'];


// NON-ESSENTIAL EXPENSES
$stmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS total
     FROM expenses
     WHERE user_id = ?
     AND priority = 'Non-Essential'"
);

$stmt->execute([$user_id]);

$nonEssentialExpenses = $stmt->fetch(PDO::FETCH_ASSOC)['total'];


// PERCENTAGES
$totalSpending = $essentialExpenses + $nonEssentialExpenses;

$essentialPercentage = 0;
$nonEssentialPercentage = 0;

if ($totalSpending > 0) {

    $essentialPercentage =
        round(($essentialExpenses / $totalSpending) * 100, 2);

    $nonEssentialPercentage =
        round(($nonEssentialExpenses / $totalSpending) * 100, 2);
}

echo json_encode([
    "success" => true,

    "total_income" => (float)$totalIncome,

    "total_expenses" => (float)$totalExpenses,

    "balance" => (float)$balance,

    "essential_expenses" => (float)$essentialExpenses,

    "non_essential_expenses" => (float)$nonEssentialExpenses,

    "essential_percentage" => $essentialPercentage,

    "non_essential_percentage" => $nonEssentialPercentage
]);