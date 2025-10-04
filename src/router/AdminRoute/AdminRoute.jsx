import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://fourm-server.vercel.app/users/admin/${user?.email}`
      );
      return res.data?.admin; // backend থেকে true/false আসবে
    },
    enabled: !!user?.email,
  });

  if (loading || isLoading) {
    return <p className="text-center py-10">Checking admin access...</p>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
