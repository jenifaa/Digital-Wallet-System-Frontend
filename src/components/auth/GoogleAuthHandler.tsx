import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { authApi } from "@/redux/features/auth/auth.api";

export function GoogleAuthHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const needsPhone = searchParams.get("needsPhone");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(authApi.util.invalidateTags(["USER"]));

      searchParams.delete("accessToken");
      searchParams.delete("refreshToken");
      setSearchParams(searchParams, { replace: true });

      toast.success("Signed in with Google");

      if (needsPhone === "true" && userId) {
        navigate(`/set-phone?userId=${userId}`);
        return;
      }

      navigate("/user/analytics");
    }
  }, [dispatch, navigate, searchParams, setSearchParams]);

  return null;
}
