import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./styles/main.css";

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  return (
    <div className="app-container">
      {!user ? <Login setUser={setUser} /> : <Dashboard user={user} setUser={setUser} />}
    </div>
  );
}

export default App;
