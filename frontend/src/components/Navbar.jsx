import { Menu } from "lucide-react";

function Navbar({ setSidebarOpen }) {
  const userName = "Daniel Alfred";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border-b px-4 md:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <Menu size={24} />
        </button>

        <h2 className="font-semibold">Student Financial Management System</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {initials}
        </div>

        <div className="hidden md:block">Daniel Alfred</div>
      </div>
    </div>
  );
}

export default Navbar;
