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

$insights = [];


// HIGHEST SPENDING CATEGORY

$stmt = $conn->prepare("
SELECT
c.category_name,
SUM(e.amount) AS total_spent

FROM expenses e

JOIN categories c
ON e.category_id = c.id

WHERE e.user_id = ?

GROUP BY c.id

ORDER BY total_spent DESC

LIMIT 1
");

$stmt->execute([$user_id]);

$topCategory = $stmt->fetch(PDO::FETCH_ASSOC);

if ($topCategory) {

    $insights[] =
        "Your highest spending category is "
        . $topCategory['category_name']
        . ".";
}


// NON-ESSENTIAL SPENDING

$stmt = $conn->prepare("
SELECT
COALESCE(SUM(amount),0)
AS total_nonessential

FROM expenses

WHERE user_id = ?
AND priority='Non-Essential'
");

$stmt->execute([$user_id]);

$nonEssential =
    $stmt->fetch(PDO::FETCH_ASSOC)
    ['total_nonessential'];

$stmt = $conn->prepare("
SELECT
COALESCE(SUM(amount),0)
AS total_expenses

FROM expenses

WHERE user_id = ?
");

$stmt->execute([$user_id]);

$totalExpenses =
    $stmt->fetch(PDO::FETCH_ASSOC)
    ['total_expenses'];

if ($totalExpenses > 0) {

    $percentage =
        round(
            ($nonEssential / $totalExpenses)
            * 100,
            2
        );

    if ($percentage >= 30) {

        $insights[] =
            $percentage .
            "% of your spending is non-essential.";
    }
}


// OVERSPENT CATEGORIES

$stmt = $conn->prepare("
SELECT

c.category_name,
c.budget_amount,

COALESCE(
SUM(e.amount),
0
) AS spent

FROM categories c

LEFT JOIN expenses e
ON e.category_id = c.id

WHERE c.user_id = ?

GROUP BY c.id
");

$stmt->execute([$user_id]);

$categories =
    $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($categories as $category) {

    if (
        $category['spent']
        >
        $category['budget_amount']
    ) {

        $insights[] =
            "You exceeded your budget in "
            . $category['category_name']
            . ".";
    }
}

if (empty($insights)) {

    $insights[] =
        "Your spending behaviour is currently within healthy limits.";
}

echo json_encode([
    "success" => true,
    "insights" => $insights
]);