import { useState, useCallback } from "react";
import Dashboard from "./components/Dashboard.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import { getSession, logoutUser } from "./infrastructure/authService.js";

export default function App() {
  const [user, setUser] = useState(() => getSession());
  const [page, setPage] = useState("login"); // "login" | "register"

  const handleLogout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  if (page === "register") {
    return (
      <RegisterPage
        onRegister={(newUser) => { setUser(newUser); }}
        onGoToLogin={() => setPage("login")}
      />
    );
  }

  return (
    <LoginPage
      onLogin={(loggedInUser) => { setUser(loggedInUser); }}
      onGoToRegister={() => setPage("register")}
    />
  );
}
