import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// Importing Modules Using Lazy Loading For Better Performance
const HomePage = lazy(() => import("@/pages/home/home-page"));
const LoginPage = lazy(() => import("@/pages/auth/login/login-page"));
const SignupPage = lazy(() => import("@/pages/auth/signup/signup-page"));
const NotFoundPage = lazy(() => import("@/pages/others/not-found-page"));
const PropertiesPage = lazy(() => import("@/pages/properties/properties-page"));
const NearbyPropertiesPage = lazy(
  () => import("@/pages/nearby-properties/nearby-properties-page")
);

const SinglePropertyPage = lazy(
  () => import("@/pages/single-property/single-property-page")
);
const MainLayout = lazy(() => import("@/layouts/main/main.layout"));
const AgentsPage = lazy(() => import("@/pages/agents/agents-page"));
const MyPropertiesPage = lazy(
  () => import("@/pages/(account)/my-properties/my-properties-page")
);
const SingleAgentPage = lazy(
  () => import("@/pages/single-agent/single-agent-page")
);
const AccountLayout = lazy(() => import("@/layouts/account/account.layout"));
const DashboardPage = lazy(
  () => import("@/pages/(account)/dashboard/dashboard-page")
);
const MyProfilePage = lazy(
  () => import("@/pages/(account)/profile/my-profile-page")
);
const MyFavoritePage = lazy(
  () => import("@/pages/(account)/my-favorite/favorite-page")
);
const AddNewPropertyPage = lazy(
  () => import("@/pages/(account)/add-property/add-new-property-page")
);
const AuthLayout = lazy(() => import("@/layouts/auth/auth.layout"));
const Subscription = lazy(() => import("@/pages/subscription/subscription"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgot-password/forgot-password.page")
);
const ResetPasswordPage = lazy(
  () => import("@/pages/auth/reset-password/reset-password.page")
);
const EditPropertyPage = lazy(
  () => import("@/pages/(account)/edit-property/edit-property-page")
);

// Auth states
import useAuth from "@/hooks/use-auth";
import Admin_UsersPage from "@/pages/(admin)/users/users-page";
import AdminDashboardPage from "@/pages/(admin)/dashboard/dashboard";
import Admin_Properties from "@/pages/(admin)/properties/properties-page";

// Initialize Routes
const Routes = () => {
  const { isLoggedIn, role } = useAuth();

  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <HomePage />,
          path: "/",
        },
        {
          path: "/properties",
          children: [
            {
              element: <PropertiesPage />,
              index: true,
            },
            {
              element: <SinglePropertyPage />,
              path: ":propertyId",
            },
          ],
        },
        {
          element: <NearbyPropertiesPage />,
          path: "/nearby",
        },
        {
          path: "/agents",
          children: [
            {
              element: <AgentsPage />,
              index: true,
            },
            {
              element: <SingleAgentPage />,
              path: ":agentUsername",
            },
          ],
        },
        {
          element: <Subscription />,
          path: "/subscription",
        },
        {
          element: <NotFoundPage />,
          path: "*",
        },
      ],
    },

    // Auth Layout
    {
      element: <AuthLayout />,
      children: [
        {
          element: isLoggedIn ? <Navigate to={"/"} /> : <LoginPage />,
          path: "/auth/login",
        },
        {
          element: isLoggedIn ? <Navigate to={"/"} /> : <SignupPage />,
          path: "/auth/signup",
        },
        {
          element: isLoggedIn ? <Navigate to="/" /> : <ForgotPasswordPage />,
          path: "/auth/forgot-password",
        },
        {
          element: isLoggedIn ? <Navigate to="/" /> : <ResetPasswordPage />,
          path: "/auth/reset-password/:resetToken",
        },
      ],
    },

    // Account routes with account layout
    {
      element: isLoggedIn ? <AccountLayout /> : <Navigate to={"/auth/login"} />,
      children: [
        {
          element:
            role === "agent" ? (
              <DashboardPage />
            ) : role === "admin" ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/dashboard",
        },
        {
          element:
            role === "agent" || role === "admin" ? (
              <MyPropertiesPage />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/my-properties",
        },
        {
          element:
            role === "agent" || role === "admin" ? (
              <EditPropertyPage />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/edit-property/:propertyId",
        },
        {
          element:
            role === "agent" || role === "admin" ? (
              <AddNewPropertyPage />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/add-new-property",
        },
        {
          element: <MyProfilePage />,
          path: "/account/my-profile",
        },
        {
          element: <MyFavoritePage />,
          path: "/account/my-favorites",
        },
        {
          element:
            isLoggedIn && role === "admin" ? (
              <Admin_UsersPage />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/users",
        },
        {
          element:
            isLoggedIn && role === "admin" ? (
              <Admin_Properties />
            ) : (
              <Navigate to={"/"} />
            ),
          path: "/account/all-properties",
        },
      ],
    },
  ]);
};

export default Routes;
