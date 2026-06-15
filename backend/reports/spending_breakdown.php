<?php

require_once "../config/cors.php";

session_start();

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