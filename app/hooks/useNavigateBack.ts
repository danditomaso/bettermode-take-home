import { useNavigate } from "@remix-run/react";
import React from "react";

function useNavigateBack() {
  const navigate = useNavigate();
  const navigateBack = React.useCallback(() => navigate(-1), [navigate]);
  return { navigateBack };
}
export default useNavigateBack;