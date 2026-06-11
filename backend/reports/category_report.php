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

c.category_name,

COALESCE(
SUM(e.amount),
0
) total_spent

FROM categories c

LEFT JOIN expenses e
ON c.id = e.category_id

WHERE c.user_id=?

GROUP BY c.id

ORDER BY total_spent DESC
");

$stmt->execute([$user_id]);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $data
]);