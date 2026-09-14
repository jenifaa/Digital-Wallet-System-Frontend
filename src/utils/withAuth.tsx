import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

export default function withAuth(
  Component: ComponentType,
  requiredRole?: TRole | TRole[],
) {
  return function AuthWrapper() {
    const { data, isLoading, error, refetch } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <PageSkeleton />;
    }

    if (error) {
      const message = getApiErrorMessage(error);
      if (/blocked|deactivated/i.test(message)) {
        return (
          <div className="min-h-screen bg-[#020617] p-6 text-white">
            <ErrorState title="Account restricted" message={message} onRetry={refetch} />
          </div>
        );
      }
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
