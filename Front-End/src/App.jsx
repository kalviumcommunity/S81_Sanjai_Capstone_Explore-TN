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
import Theni from "../Placepage/Theni"; // Importing the new Theni component
function App() {
  return (
    <Router>
      <div className="flex bg-[#0c1220] h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-scroll">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
           
            <Route path="/Guides" element={<Guides />}/>
            <Route path="/Explore-ai" element={<ChatApp />}/>
            <Route path="/GuideForm" element={<SimpleGuideForm />}/>
            <Route  path="/guides/:id" element={<GuideProfile />}/>
            <Route path="/guides/:id/edit" element={<GuideEdit />} />
            <Route path="/UserPickForm" element={<UserPickForm />} />
            <Route path="/UserPick" element={<UserPicks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/Favourite" element={<Favourite />} />
            <Route path="/Chennai" element={<Chennai />} />
            <Route path="/Coimbatore" element={<Coimbatore />} />
            <Route path="/Dindugal" element={<Dindigul />} />
            <Route path="/Madurai" element={<Madurai />} />
            <Route path="/Namakal" element={<Namakkal />} />
            <Route path="/Ooty" element={<Ooty />} />
            <Route path="/Salem" element={<Salem />} />
            <Route path="/Theni" element={<Theni />} /> {/* Adding the new Theni route */}
            {/* Add more routes as needed */}
            


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
