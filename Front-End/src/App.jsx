import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../componants/Sidebar";
import Topbar from "../componants/Topbar";
import Dashboard from "../pages/DashboardPage";
import Login from "../componants/Login";
import Signup from "../componants/Signup";
import ChatApp from "../pages/ExploreAI";
import Guides from "../pages/Guides";
import SimpleGuideForm from "../componants/GuideForm";
import GuideProfile from "../componants/GuideProfile";
import GuideEdit from "../pages/GuideEdit";
import UserPickForm from "../pages/UserPickForm";
import UserPicks from "../pages/UserPicks";
import Profile from "../pages/Profile";
import HotelList from "../pages/HotelList";
import Favourite from "../pages/FavoritesPage";
import Chennai from "../Placepage/Chennai";
import Coimbatore from "../Placepage/Coimbatore";
import Dindigul from "../Placepage/Dindugal";
import Madurai from "../Placepage/Madurai";
import Namakkal from "../Placepage/Namakal";
import Ooty from "../Placepage/Ooty";
import Salem from "../Placepage/Salem";
import Theni from "../Placepage/Theni";
import PrivateRoute from "../componants/PrivateRoute"; // ✅ Import

function App() {
  return (
    <Router>
      <div className="flex bg-[#0c1220] h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-scroll">
          <Topbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Explore-ai" element={<ChatApp />} />
            <Route path="/Chennai" element={<Chennai />} />
            <Route path="/Coimbatore" element={<Coimbatore />} />
            <Route path="/Dindugal" element={<Dindigul />} />
            <Route path="/Madurai" element={<Madurai />} />
            <Route path="/Namakal" element={<Namakkal />} />
            <Route path="/Ooty" element={<Ooty />} />
            <Route path="/Salem" element={<Salem />} />
            <Route path="/Theni" element={<Theni />} />
            <Route path="/hotels" element={<HotelList />} />

            {/* Protected Routes */}
            <Route path="/Guides" element={<PrivateRoute><Guides /></PrivateRoute>} />
            <Route path="/GuideForm" element={<PrivateRoute><SimpleGuideForm /></PrivateRoute>} />
            <Route path="/guides/:id" element={<PrivateRoute><GuideProfile /></PrivateRoute>} />
            <Route path="/guides/:id/edit" element={<PrivateRoute><GuideEdit /></PrivateRoute>} />
            <Route path="/UserPickForm" element={<PrivateRoute><UserPickForm /></PrivateRoute>} />
            <Route path="/UserPick" element={<PrivateRoute><UserPicks /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/Favourite" element={<PrivateRoute><Favourite /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
