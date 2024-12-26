import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";
import { verify } from "./api/axios.verify";
import { useUserStore } from "./store/useUserStore";
import AuthRoute from "./components/auth/auth-route";
import PrivateRoute from "./components/auth/private-route";

function App() {
  const { setUser, clearUser } = useUserStore();

  //check if user is authenticated and restore the user data
  useEffect(() => {
    const initializeAuth = async () => {
      const user = await verify();

      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    };
    initializeAuth();
  }, [setUser, clearUser]);

  return (
    <Router>
      <div className="w-full h-screen">
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
