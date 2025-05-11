import { Routes, Route } from "react-router-dom";
import RoutePage from "./pages/RoutePage";
import Schedule from "./pages/Schedule";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />

      <div className="grid grid-cols-[1fr_4fr]">
        <Sidebar />
        <div className="p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/route" element={<RoutePage />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default App;
