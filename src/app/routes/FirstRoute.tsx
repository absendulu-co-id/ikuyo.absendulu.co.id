import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const FirstRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLogin = token && token.length > 0;

  useEffect(() => {
    if (localStorage.getItem('play-tour-dashboard') === null) {
      localStorage.setItem('play-tour-dashboard', 'true');
      localStorage.setItem('play-tour-calendar', 'true');
      localStorage.setItem('play-tour-company', 'true');
      localStorage.setItem('play-tour-access', 'true');
      localStorage.setItem('play-tour-approval', 'true');
      localStorage.setItem('play-tour-workflow', 'true');
      localStorage.setItem('play-tour-schedule', 'true');
    }
  }, [])


  if (!isLogin) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};