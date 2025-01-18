import "./App.css"
import { Routes, Route } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <div className="main__container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;

