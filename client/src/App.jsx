import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TradeHistory from "./components/TradeHistory";

function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/history" element={<TradeHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
