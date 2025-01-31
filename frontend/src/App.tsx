import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useEffect } from "react";
import { verify } from "./api/axios.verify";
import { useUserStore } from "./store/useUserStore";
import AuthRoute from "./components/auth/auth-route";
import PrivateRoute from "./components/auth/private-route";
import BudgetPage from "./pages/BudgetPage";
import CategoryPage from "./pages/CategoryPage";
import TransactionPage from "./pages/TransactionPage";
import SettingsPage from "./pages/SettingsPage";
import CategoryId from "./components/category/category";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import { setAuthToken } from "./api/axios.instance";

function App() {
  const { setUser, clearUser } = useUserStore();
  const token = localStorage.getItem("token");
  setAuthToken(token);

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
    <>
      <Router>
        <div className="w-full h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/budgets" element={<BudgetPage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/categories/:categoryId" element={<CategoryId />} />

              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <Toaster richColors />
    </>
  );
}

export default App;
