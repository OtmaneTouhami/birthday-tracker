import { lazy, Suspense } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { Spinner } from "@/components/ui/spinner";

// Lazy load pages for better code splitting
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const FriendsPage = lazy(() => import("@/pages/FriendsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <Spinner className="h-8 w-8" />
  </div>
);

// Wrapper for lazy loaded components with Suspense
const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// Route configuration with metadata
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LazyLoad>
          <LoginPage />
        </LazyLoad>
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <LazyLoad>
          <RegisterPage />
        </LazyLoad>
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <LazyLoad>
          <DashboardPage />
        </LazyLoad>
      </ProtectedRoute>
    ),
  },
  {
    path: "/friends",
    element: (
      <ProtectedRoute>
        <LazyLoad>
          <FriendsPage />
        </LazyLoad>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <LazyLoad>
          <ProfilePage />
        </LazyLoad>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <LazyLoad>
        <NotFound />
      </LazyLoad>
    ),
  },
];
