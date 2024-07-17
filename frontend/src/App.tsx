import { useEffect, useLayoutEffect } from "react";
import Routes from "./routes";
import { useAppDispatch } from "./store/hooks/redux.hooks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLazyFetchMyAccountQuery } from "./api/services/account.service";
import { Toaster } from "./components/ui/toaster";
import { useLocation } from "react-router-dom";
import { resetPropertyForm } from "./store/slices/property.slices";
import { useLogoutMutation } from "./api/services/auth.service";
import useAuth from "./hooks/use-auth";

function App() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  // Fetch user account when user login and when the page initial load
  const { token } = useAuth();
  const [fetchCurrentUserAccount] = useLazyFetchMyAccountQuery();
  const [logout] = useLogoutMutation();

  useLayoutEffect(() => {
    if (token) {
      fetchCurrentUserAccount();
    } else {
      logout();
    }
  }, [token]);

  // Remove user property form data based on pathname;
  useEffect(() => {
    scrollTo(0, 0);
    if (pathname === "/account/add-new-property") return;
    dispatch(resetPropertyForm());
  }, [pathname]);

  // Initialing Data Aos / Global setting
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {},
          () => {}
        );
      }
    };

    getLocation();
  }, []);

  return (
    <>
      <Toaster />
      <Routes />
    </>
  );
}

export default App;
