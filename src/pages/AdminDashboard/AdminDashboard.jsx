import { NavLink, Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64  p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/manage-users"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-yellow-300"
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-yellow-300"
              }
            >
              Reported Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/announcement"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "hover:text-yellow-300"
              }
            >
              Make Announcement
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
