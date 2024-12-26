import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";
import { verify } from "./api/axios.verify";
import { useUserStore } from "./store/useUserStore";

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
      <div className="h-screen w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
