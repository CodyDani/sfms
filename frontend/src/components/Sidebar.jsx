import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">SFMS</h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/categories"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Categories
            </Link>
          </li>

          <li>
            <Link to="/income" className="block p-3 rounded hover:bg-slate-100">
              Income
            </Link>
          </li>

          <li>
            <Link
              to="/expenses"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Expenses
            </Link>
          </li>

          <li>
            <Link
              to="/savings"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Savings Goals
            </Link>
          </li>

          <li>
            <Link
              to="/reports"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Reports
            </Link>
          </li>

          <li>
            <Link
              to="/insights"
              className="block p-3 rounded hover:bg-slate-100"
            >
              Insights
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
