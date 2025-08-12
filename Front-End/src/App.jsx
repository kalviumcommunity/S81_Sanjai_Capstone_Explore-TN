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
import Ariyalur from "../Placepage/Ariyalur";
import Chengalpattu from "../Placepage/Chengalpattu";
import Dharmapuri from "../Placepage/Dharmapuri";
import Erode from "../Placepage/Erode";
import Kallakurichi from "../Placepage/Kallakurichi";
import Kanchipuram from "../Placepage/Kanchipuram";
import Kanniyakumari from "../Placepage/Kanniyakumari";
import Karur from "../Placepage/Karur";
import Krishnagiri from "../Placepage/Krishnagiri";
import Mayiladuthurai from "../Placepage/Mayiladuthurai";
import Nagapattinam from "../Placepage/Nagapattinam";
import Perambalur from "../Placepage/Perambalur";
import Pudukkottai from "../Placepage/Pudukkottai";
import Ramanathapuram from "../Placepage/Ramanathapuram";
import Sivagangai from "../Placepage/Sivagangai";
import Tenkasi from "../Placepage/Tenkasi";
import Thanjavur from "../Placepage/Thanjavur";
import Thoothukudi from "../Placepage/Thoothukudi";
import Tiruchirappalli from "../Placepage/Tiruchirappalli";
import Tirunelveli from "../Placepage/Tirunelveli";
import Tirupathur from "../Placepage/Tirupathur";
import Tiruppur from "../Placepage/Tiruppur"
import Tiruvallur from "../Placepage/Tiruvallur";
import Tiruvannamalai from "../Placepage/Tiruvannamalai";
import Tiruvarur from "../Placepage/Tiruvarur";
import Vellore from "../Placepage/Vellore";
import Viluppuram from "../Placepage/Viluppuram";
import Virudhunagar from "../Placepage/Virudhunagar";
import Card from "../pages/NotFound";
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
            <Route path="/Ariyalur" element={<Ariyalur />} />
            <Route path="/Chengalpattu" element={<Chengalpattu />} />
            <Route path="/Dharmapuri" element={<Dharmapuri />} />
            <Route path="/Erode" element={<Erode />} />
            <Route path="/Kallakurichi" element={<Kallakurichi />} />
            <Route path="/Kanchipuram" element={<Kanchipuram />} />
            <Route path="/Kanniyakumari" element={<Kanniyakumari />} /> {/* ✅ Add Kanyakumari route */}
            <Route path="/Karur" element={<Karur />} /> 
            <Route path="/Krishnagiri" element={<Krishnagiri/>} /> 
            <Route path="/Mayiladuthurai" element={<Mayiladuthurai/>} /> 
            <Route path="/Nagapattinam" element={<Nagapattinam/>} />
            <Route path="/Perambalur" element={<Perambalur/>} /> 
            <Route path="/Pudukkottai" element={<Pudukkottai/>} />
            <Route path="/Ramanathapuram" element={<Ramanathapuram/>} />
            <Route path="/Sivagangai" element={<Sivagangai/>} />
            <Route path="/Tenkasi" element={<Tenkasi/>} />
            <Route path="/Thanjavur" element={<Thanjavur/>} />
            <Route path="/Thoothukudi" element={<Thoothukudi/>} />
            <Route path="/Tiruchirappalli" element={<Tiruchirappalli/>} />
            <Route path="/Tirunelveli" element={<Tirunelveli/>} />
            <Route path="/Tirupathur" element={<Tirupathur/>} />
            <Route path="/Tiruppur" element={<Tiruppur/>} />
            <Route path="/Tiruvallur" element={<Tiruvallur/>} />
            <Route path="/Tiruvannamalai" element={<Tiruvannamalai/>} />
            <Route path="/Tiruvarur" element={<Tiruvarur/>} />
            <Route path="/Vellore" element={<Vellore/>} />
            <Route path="/Viluppuram" element={<Viluppuram/>} />
            <Route path="/Virudhunagar" element={<Virudhunagar/>} />


            {/* Protected Routes */}
            <Route path="/Guides" element={<PrivateRoute><Guides /></PrivateRoute>} />
            <Route path="/GuideForm" element={<PrivateRoute><SimpleGuideForm /></PrivateRoute>} />
            <Route path="/guides/:id" element={<PrivateRoute><GuideProfile /></PrivateRoute>} />
            <Route path="/guides/:id/edit" element={<PrivateRoute><GuideEdit /></PrivateRoute>} />
            <Route path="/UserPickForm" element={<PrivateRoute><UserPickForm /></PrivateRoute>} />
            <Route path="/UserPick" element={<PrivateRoute><UserPicks /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/Favourite" element={<PrivateRoute><Favourite /></PrivateRoute>} />
            <Route path="*" element={<Card />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
