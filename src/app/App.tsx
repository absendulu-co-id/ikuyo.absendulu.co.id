import { Routes, Route, Navigate } from "react-router-dom";
import { Template } from "@/app/layouts";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { SignIn, SignUp } from "./pages/auth";
import { FirstRoute } from "./routes/FirstRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { routes } from "./routes";

function App(): JSX.Element {
  const pathUrl = window.location.pathname.split("/");
  const pathOrigin = routes.filter((data) => data.layout.includes(pathUrl[1]));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FirstRoute>
            <Navigate to="/dashboard" />
          </FirstRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset-password" element={<SignUp />} />
      <Route path="/404" element={<NotFoundPage />} />
      {pathOrigin.length > 0 ? (
        <Route
          path="/:layout/*"
          element={
            <ProtectedRoute>
              <Template />
            </ProtectedRoute>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/404" replace />} />
      )}
    </Routes>
  );
}

export default App;
