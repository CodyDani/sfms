<?php

require_once "../config/cors.php";

session_start();

require_once "../config/database.php";

require_once "../fpdf/fpdf.php";

if (!isset($_SESSION['user_id'])) {

    die("Unauthorized");
}

$user_id = $_SESSION['user_id'];


// USER INFO

$userStmt = $conn->prepare("
    SELECT full_name, email
    FROM users
    WHERE id = ?
");

$userStmt->execute([$user_id]);

$user = $userStmt->fetch(PDO::FETCH_ASSOC);


// OVERVIEW

$incomeStmt = $conn->prepare("
    SELECT COALESCE(SUM(amount),0) total
    FROM income
    WHERE user_id = ?
");

$incomeStmt->execute([$user_id]);

$totalIncome =
    $incomeStmt->fetch(PDO::FETCH_ASSOC)['total'];


$expenseStmt = $conn->prepare("
    SELECT COALESCE(SUM(amount),0) total
    FROM expenses
    WHERE user_id = ?
");

$expenseStmt->execute([$user_id]);

$totalExpenses =
    $expenseStmt->fetch(PDO::FETCH_ASSOC)['total'];

$balance =
    $totalIncome - $totalExpenses;

$savingsRate = 0;

if ($totalIncome > 0) {

    $savingsRate =
        (($balance) / $totalIncome) * 100;
}


// CATEGORY REPORT

$categoryStmt = $conn->prepare("
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

$categoryStmt->execute([$user_id]);

$categories =
    $categoryStmt->fetchAll(PDO::FETCH_ASSOC);


// RECENT INCOME

$incomeListStmt = $conn->prepare("
SELECT
source,
amount,
income_date

FROM income

WHERE user_id = ?

ORDER BY income_date DESC

LIMIT 5
");

$incomeListStmt->execute([$user_id]);

$recentIncome =
    $incomeListStmt->fetchAll(PDO::FETCH_ASSOC);


// RECENT EXPENSES

$expenseListStmt = $conn->prepare("
SELECT

c.category_name,
e.amount,
e.expense_date

FROM expenses e

JOIN categories c
ON e.category_id = c.id

WHERE e.user_id = ?

ORDER BY e.expense_date DESC

LIMIT 5
");

$expenseListStmt->execute([$user_id]);

$recentExpenses =
    $expenseListStmt->fetchAll(PDO::FETCH_ASSOC);


// PDF

$pdf = new FPDF();

$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 16);

$pdf->Cell(
    0,
    10,
    'Student Financial Management Report',
    0,
    1,
    'C'
);

$pdf->Ln(5);

$pdf->SetFont('Arial', '', 12);

$pdf->Cell(
    0,
    8,
    'User: ' . $user['full_name'],
    0,
    1
);

$pdf->Cell(
    0,
    8,
    'Generated: ' . date('d M Y'),
    0,
    1
);

$pdf->Ln(5);


// OVERVIEW

$pdf->SetFont('Arial', 'B', 14);

$pdf->Cell(
    0,
    10,
    'Financial Overview',
    0,
    1
);

$pdf->SetFont('Arial', '', 12);

$pdf->Cell(
    0,
    8,
    'Total Income: N' .
    number_format($totalIncome, 2),
    0,
    1
);

$pdf->Cell(
    0,
    8,
    'Total Expenses: N' .
    number_format($totalExpenses, 2),
    0,
    1
);

$pdf->Cell(
    0,
    8,
    'Balance: N' .
    number_format($balance, 2),
    0,
    1
);

$pdf->Cell(
    0,
    8,
    'Savings Rate: ' .
    round($savingsRate, 2) . '%',
    0,
    1
);

$pdf->Ln(5);


// CATEGORY ANALYSIS

$pdf->SetFont('Arial', 'B', 14);

$pdf->Cell(
    0,
    10,
    'Category Analysis',
    0,
    1
);

$pdf->SetFont('Arial', 'B', 10);

$pdf->Cell(50, 8, 'Category', 1);
$pdf->Cell(40, 8, 'Budget', 1);
$pdf->Cell(40, 8, 'Spent', 1);
$pdf->Cell(40, 8, 'Remaining', 1);

$pdf->Ln();

$pdf->SetFont('Arial', '', 10);

foreach ($categories as $category) {

    $remaining =
        $category['budget_amount']
        - $category['spent'];

    $pdf->Cell(
        50,
        8,
        $category['category_name'],
        1
    );

    $pdf->Cell(
        40,
        8,
        number_format(
            $category['budget_amount'],
            2
        ),
        1
    );

    $pdf->Cell(
        40,
        8,
        number_format(
            $category['spent'],
            2
        ),
        1
    );

    $pdf->Cell(
        40,
        8,
        number_format(
            $remaining,
            2
        ),
        1
    );

    $pdf->Ln();
}

$pdf->Output(
    'D',
    'financial_report.pdf'
);