import React from "react";
import DestinationCard from "../componants/DestinationCard" // Corrected the import

import CalendarCard from "../componants/Calendar";

const Dashboard = () => {
  return (
    <div className="flex">
      
      <div className="w-[77%] ">
        <DestinationCard />
       
      </div>

      
      <div className="w-[23%] flex flex-col gap-6 sticky top-24">
        <CalendarCard/>
      </div>
    </div>
  );
};

export default Dashboard;
