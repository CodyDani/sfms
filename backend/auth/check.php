<?php

require_once "../config/cors.php";

session_start();

echo json_encode([
    "loggedIn" => isset($_SESSION['user_id']),
    "user_id" => $_SESSION['user_id'] ?? null
]);