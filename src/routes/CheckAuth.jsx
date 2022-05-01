import { Navigate, useLocation } from "react-router-dom";

export const checkAuth = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) return false;
  return true;
};
const PrivateRoute = ({ children }) => {
  const isLoggedIn = checkAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
