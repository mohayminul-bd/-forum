import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Authentication/Register";
import AddPost from "../pages/AddPost/AddPost";
import DashboardLayout from "../layout/DashboardLayout";
import PrivetRouter from "../routes/PrivetRouter";
import MyPost from "../pages/Dashboard/MyPost";
import MembershipPage from "../pages/MembershipPage/MembershipPage";
import PostDetails from "../pages/Home/Home Component/PostDetails";
import HomeDashboard from "../pages/Dashboard/HomeDashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import Payment from "../pages/MembershipPage/Payment";
import NotFound from "../pages/notfound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addPost",
        element: (
          <PrivetRouter>
            <AddPost></AddPost>
          </PrivetRouter>
        ),
      },
      {
        path: "payment",
        Component: Payment,
      },

      {
        path: "/posts/:id",
        element: (
          <PrivetRouter>
            <PostDetails></PostDetails>
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },

      {
        path: "/membership",
        element: (
          <PrivetRouter>
            <MembershipPage></MembershipPage>
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        path: "addPost",
        Component: AddPost,
      },
      {
        path: "homeDashboard",
        Component: HomeDashboard,
      },
      {
        path: "myPost",
        Component: MyPost,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
    ],
  },
]);
