import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import PageSkeleton from "@/components/shared/PageSkeleton";

export default function withAuth(
  Component: ComponentType,
  requiredRole?: TRole | TRole[],
) {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <PageSkeleton />;
    }

    if (!data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];

      if (!allowedRoles.includes(data.data.role as TRole)) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return <Component />;
  };
}
