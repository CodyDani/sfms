import {
  X,
  LayoutDashboard,
  FolderOpen,
  Wallet,
  Receipt,
  PiggyBank,
  BarChart3,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  CircleUser,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

function Sidebar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FolderOpen size={20} />,
    },
    {
      name: "Income",
      path: "/income",
      icon: <Wallet size={20} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />,
    },
    {
      name: "Savings",
      path: "/savings",
      icon: <PiggyBank size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Insights",
      path: "/insights",
      icon: <Lightbulb size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <CircleUser size={20} />,
    },
  ];
  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          ${collapsed ? "w-20" : "w-64"} h-screen
          bg-white border-r
          z-50
          transform
          transition-transform
          duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        <div className="p-4 flex justify-between items-center">
          {!collapsed && (
            <h1 className="text-xl font-bold text-blue-600">SFMS</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={22} />
          </button>
        </div>

        {/* <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Dashboard</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/categories"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Categories</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/income"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Income</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/expenses"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Expenses</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/savings"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Savings Goals</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/reports"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Reports</span>}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/insights"
                className="block p-3 rounded hover:bg-slate-100"
              >
                {!collapsed && <span>Insights</span>}
              </NavLink>
            </li>
          </ul>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg"
            >
              Logout
            </button>
          )}
        </nav> */}

        <nav className="px-3 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg mb-2 transition
        ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"}`
              }
            >
              {/* {item.icon}

              {!collapsed && <span>{item.name}</span>} */}

              <div className="relative group">
                {item.icon}

                {collapsed && (
                  <div
                    className="
        absolute
        left-12
        top-1/2 
        -translate-y-1/2
        bg-slate-800
        text-white
        text-sm
        px-2
        py-1
        rounded
        whitespace-nowrap
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        transition-all
        duration-200
        z-50
      "
                  >
                    {item.name}
                  </div>
                )}
              </div>

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg"
            >
              Logout
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
