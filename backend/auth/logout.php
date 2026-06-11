<?php

session_start();

session_unset();
session_destroy();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

echo json_encode([
    "success" => true,
    "message" => "Logged out successfully"
]);