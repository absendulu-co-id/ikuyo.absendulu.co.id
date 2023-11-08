import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLogin = token && token.length > 0;
  
    if (!isLogin) {
        return <Navigate to="/signin" />;
    }
  return children;
};