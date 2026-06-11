<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if (isset($_SESSION['user_id'])) {

    echo json_encode([
        "logged_in" => true,
        "user_id" => $_SESSION['user_id'],
        "user_name" => $_SESSION['user_name']
    ]);

} else {

    echo json_encode([
        "logged_in" => false
    ]);
}