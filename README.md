# Student Financial Planning and Budget Advisory System

This project is a final year project focused on building a web-based Student Financial Planning and Budget Advisory System. The goal of the system is to help students manage their money more effectively by tracking income, recording expenses, planning budgets, setting savings goals, and receiving useful financial insights.

## Project Overview

Many students struggle to manage their personal finances, especially when they receive allowance, part-time income, or monthly stipends. This system provides a simple and practical solution for keeping financial records in one place and making better budgeting decisions.

The application is designed to help users:

- understand where their money is going
- stay within planned budgets
- build savings habits
- review financial progress through reports and insights

## Main Features

### 1. User Authentication

- Register a new account
- Log in and log out securely
- Manage personal profile information

### 2. Budget Categories

- Create budgeting categories such as food, transport, entertainment, education, and utilities
- Set monthly budget limits for each category
- Monitor whether spending is within the planned limit

### 3. Income Tracking

- Record income entries with amount, source, description, and date
- Keep track of all incoming money in one place

### 4. Expense Tracking

- Record expenses and link them to a specific budget category
- Add descriptions and dates for each expense entry
- Review spending history easily

### 5. Savings Goals

- Create savings goals for personal plans such as a laptop, trip, or emergency fund
- Set target amounts and target dates
- Track progress toward each goal

### 6. Reports and Financial Summary

- View a dashboard with summary information
- Review recent transactions
- Generate financial reports such as:
  - category breakdown
  - monthly report
  - financial overview
- Export reports as PDF

### 7. Insights and Advisory Support

- Receive budget-related insights
- Identify overspending patterns
- Get guidance on how spending is performing compared to planned budgets

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Recharts for charts and visual summaries
- Axios for API communication

### Backend

- PHP
- MySQL database
- PDO for database access
- FPDF for PDF report generation

## Project Structure

- frontend/ - React frontend application
- backend/ - PHP APIs and server-side logic
- student_finance_manager.sql - database schema and sample structure
- README.md - project documentation

## Database Overview

The system uses the following main database tables:

- users - stores user accounts
- categories - stores budget categories and monthly budget limits
- income - stores income records
- expenses - stores expense records linked to categories
- savings_goals - stores savings targets and progress
- insights - stores generated financial insights

## Installation and Setup

### Requirements

- XAMPP or WAMP installed on your machine
- PHP and MySQL running
- Node.js and npm installed

### Step 1: Place the Project in XAMPP

- Copy or clone the project into the XAMPP htdocs folder
- Example path: htdocs/sfms

### Step 2: Create the Database

- Start Apache and MySQL in XAMPP
- Open phpMyAdmin
- Create a database named student_finance_manager
- Import the SQL file: student_finance_manager.sql

### Step 3: Configure Database Connection

- Open backend/config/database.php
- Make sure the database host, username, password, and database name are correct
- The default setup is usually:
  - host: localhost
  - username: root
  - password: empty

### Step 4: Run the Frontend

Open a terminal in the frontend folder and run:

```bash
cd frontend
npm install
npm run dev
```

This will start the Vite development server.

### Step 5: Open the Application

- Frontend: http://localhost:5173
- Backend API base URL: http://localhost/sfms/backend/

## How the System Works

1. A user registers or logs in.
2. The user creates budget categories and sets monthly limits.
3. Income is added to the system.
4. Expenses are recorded and assigned to a category.
5. Savings goals can be created and monitored.
6. The dashboard, reports, and insights provide a clear view of financial health.

## Expected Use Case

This system is suitable for:

- students who want to manage personal finances
- users who need a simple budgeting tool
- people who want to track spending and save money more consciously

## Future Improvements

Possible future enhancements include:

- recurring income and expense entries
- reminders for bill payments or savings targets
- spending forecasts
- more advanced charts and analytics
- mobile-friendly improvements

## Conclusion

The Student Financial Planning and Budget Advisory System is a practical and educational financial management tool that demonstrates how technology can support better budgeting, smarter spending decisions, and improved savings habits for students.
