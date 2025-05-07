import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../componants/Sidebar";
import Topbar from "../componants/Topbar";
import Dashboard from "../pages/DashboardPage";

function App() {
  return (
    <Router>
      <div className="flex bg-[#0c1220] h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-scroll">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
