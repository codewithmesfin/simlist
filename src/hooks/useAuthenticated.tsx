import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../stores/slices/auth.slice";

const useAuthenticated = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [authenticated, setAuthentiacted] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [isLoggedIn]);
  const checkAuth = async () => {
    const userAuth = await isLoggedIn;
    setAuthentiacted(userAuth);
  };

  return { authenticated };
};
export default useAuthenticated;
