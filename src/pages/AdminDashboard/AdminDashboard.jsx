import { FaUser } from "react-icons/fa";
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
              to="/dashboard/manage-users"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <FaUser /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin-profile"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <FaUser /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/announcement"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <FaUser />
              Announcement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/report-comment-admin"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <FaUser />
              Report Admin
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminDashboard;
