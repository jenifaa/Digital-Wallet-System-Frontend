import { useEffect } from "react";
import {  useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { authApi } from "@/redux/features/auth/auth.api";

export  const useGoogleAuthCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
 

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Store in localStorage/cookie so your baseApi picks them up
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Invalidate user cache so useUserInfoQuery refetches
      dispatch(authApi.util.invalidateTags(["USER"]));

      // Clean up URL params
      searchParams.delete("accessToken");
      searchParams.delete("refreshToken");
      setSearchParams(searchParams, { replace: true });
    }
  }, [dispatch, setSearchParams, searchParams]);
};