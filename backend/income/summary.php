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

$totalStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS total_income
     FROM income
     WHERE user_id = ?"
);

$totalStmt->execute([$user_id]);

$totalIncome = $totalStmt->fetch(PDO::FETCH_ASSOC);

$monthStmt = $conn->prepare(
    "SELECT COALESCE(SUM(amount),0) AS monthly_income
     FROM income
     WHERE user_id = ?
     AND MONTH(income_date) = MONTH(CURRENT_DATE())
     AND YEAR(income_date) = YEAR(CURRENT_DATE())"
);

$monthStmt->execute([$user_id]);

$monthlyIncome = $monthStmt->fetch(PDO::FETCH_ASSOC);

$countStmt = $conn->prepare(
    "SELECT COUNT(*) AS total_records
     FROM income
     WHERE user_id = ?"
);

$countStmt->execute([$user_id]);

$count = $countStmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "total_income" => (float)$totalIncome['total_income'],
    "monthly_income" => (float)$monthlyIncome['monthly_income'],
    "total_records" => (int)$count['total_records']
]);