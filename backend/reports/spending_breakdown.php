<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "../config/database.php";

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("
SELECT

priority,

COALESCE(
SUM(amount),
0
) total

FROM expenses

WHERE user_id=?

GROUP BY priority
");

$stmt->execute([$user_id]);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $data
]);