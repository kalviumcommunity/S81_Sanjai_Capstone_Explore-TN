import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md';
import BASE_URL from '../src/baseURL'; // ✅ imported base URL

// ✅ Card
const Card = ({ title, content, image, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
      <img
        src={image || 'https://via.placeholder.com/400'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{title}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
      </div>
      <button
        onClick={() => onToggleFavorite(title)}
        className="absolute top-4 right-4 text-3xl text-white"
      >
        {isFavorite ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />}
      </button>
    </div>
  );
};

// ✅ Section
const Section = ({ title, places, favorites, onToggleFavorite }) => {
  const gridCols = places.length % 3 === 0 || places.length === 5 ? 'md:grid-cols-3' : 'md:grid-cols-4';
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-100 border-l-4 border-blue-500 pl-4 mb-6 uppercase">{title}</h2>
      <div className={`grid grid-cols-1 ${gridCols} gap-8 p-4`}>
        {places.map((place, index) => (
          <Card
            key={index}
            title={place.title}
            content={place.content}
            image={place.image}
            isFavorite={favorites.includes(place.title)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

// ✅ Main
function Coimbatore() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Nilgiris district, nestled in the Western Ghats of Tamil Nadu, is renowned for its breathtaking hill stations, tea plantations, and rich biodiversity. Home to popular destinations like Ooty, Coonoor, and Kotagiri, the district offers cool climate, scenic views, and a perfect escape for nature enthusiasts and travelers.";
  ;

  const places = {
    lakes_and_water_bodies: [
      { "title": "Ooty Lake", "city": "Ooty", "content": "A scenic artificial lake ideal for boating and leisure walks." },
      { "title": "Pykara Lake", "city": "Pykara", "content": "A serene lake known for its beauty and boat rides." },
      { "title": "Avalanche Lake", "city": "Avalanche", "content": "A tranquil lake surrounded by lush forests and rare flora." },
      { "title": "Emerald Lake", "city": "Emerald", "content": "A beautiful lake famous for its emerald blue waters and tea plantations." },
      { "title": "Upper Bhavani Lake", "city": "Upper Bhavani", "content": "A hidden, pristine lake inside the Nilgiri Biosphere Reserve." },
      { "title": "Kamaraj Sagar Dam", "city": "Ooty", "content": "A quiet picnic spot with panoramic views and fishing activities." },
      { "title": "Mukurthi Lake", "city": "Mukurthi", "content": "A stunning high-altitude lake nestled inside a national park." },
      { "title": "Parsons Valley Reservoir", "city": "Parsons Valley", "content": "A protected reservoir offering breathtaking valley views." },
      { "title": "Bellikal Lake", "city": "Bellikal", "content": "A hidden gem near Ooty ideal for solitude and nature lovers." },
      { "title": "Glenmorgan Dam", "city": "Glenmorgan", "content": "An old dam with a ropeway and scenic tea gardens around." },
      { "title": "Pykara Falls", "city": "Pykara", "content": "A beautiful waterfall located near Pykara Lake, surrounded by forests." },
      { "title": "Catherine Falls", "city": "Kotagiri", "content": "A stunning double-cascaded waterfall with a lovely trek route." },
      { "title": "Kalhatti Falls", "city": "Kalhatti", "content": "A mesmerizing waterfall located on the slopes of Kalhatti Ghats." },
      { "title": "Law's Falls", "city": "Coonoor", "content": "A small yet scenic waterfall set amidst a dense forest." },
      { "title": "Katary Falls", "city": "Coonoor", "content": "One of the highest falls in the Nilgiris, supplying hydroelectric power." },
      { "title": "Bear Shola Falls", "city": "Kodaikanal", "content": "A seasonal waterfall inside a reserved forest, named after bears that used to visit the spot." }
    ],

    parks_and_gardens: [
      { "title": "Government Botanical Garden", "city": "Ooty", "content": "A sprawling garden home to rare plant species and lush lawns." },
      { "title": "Rose Garden", "city": "Ooty", "content": "A colorful garden featuring thousands of varieties of roses." },
      { "title": "Sims Park", "city": "Coonoor", "content": "A botanical garden hosting diverse plant species and annual flower shows." },
      { "title": "Thread Garden", "city": "Ooty", "content": "An artistic garden featuring plants and flowers made entirely of thread." },
      { "title": "Fernhill Palace Gardens", "city": "Ooty", "content": "Royal gardens of the historic Fernhill Palace." },
      { "title": "Children’s Park", "city": "Ooty", "content": "A lively park designed for kids with rides and play areas." },
      { "title": "Nilgiri Biosphere Nature Park", "city": "Anaikatti", "content": "A conservation park exhibiting the diverse flora of the Nilgiris." },
      { "title": "Law’s Falls Garden Area", "city": "Coonoor", "content": "Picturesque gardens around the beautiful Law’s Falls." },
      { "title": "Arboretum Tree Garden", "city": "Ooty", "content": "A quiet tree park offering an educational nature experience." },
      { "title": "Karnataka Siri Horticulture Garden", "city": "Ooty", "content": "A scenic garden managed by Karnataka Horticulture Department featuring beautiful landscapes and mini boating." },
      { "title": "Lake Park", "city": "Ooty", "content": "An entertainment park with gardens and games near Ooty Lake." },
      { "title": "Deer Park", "city": "Ooty", "content": "A small wildlife park near Ooty Lake with deer and open green spaces." },
      { "title": "Government Park", "city": "Gudalur", "content": "A serene garden and public park located in Gudalur town." }
    ]
    ,

    viewpoints: [
      { "title": "Doddabetta Peak", "city": "Ooty", "content": "The highest peak in the Nilgiris offering panoramic views." },
      { "title": "Dolphin’s Nose", "city": "Coonoor", "content": "A unique rock formation viewpoint with stunning scenery." },
      { "title": "Needle Rock Viewpoint", "city": "Gudalur", "content": "A mesmerizing 360-degree view of the surrounding valleys." },
      { "title": "Ketti Valley View", "city": "Ooty", "content": "One of the largest valleys in India, offering breathtaking sights." },
      { "title": "Lamb’s Rock", "city": "Coonoor", "content": "A cliff viewpoint perfect for photography and trekking." },
      { "title": "Shooting Point", "city": "Ooty", "content": "A picturesque meadow popular among filmmakers and tourists." },
      { "title": "Lady Canning’s Seat", "city": "Coonoor", "content": "A viewpoint named after Lady Canning offering scenic views." },      
      { "title": "Tiger Hill", "city": "Ooty", "content": "A peaceful hilltop spot ideal for sunrise views away from the crowds." },
      { "title": "Kodanad View Point", "city": "Kotagiri", "content": "Spectacular view of the Moyar river valley and the surrounding hills." },
      { "title": "Highfield Tea Factory View", "city": "Coonoor", "content": "Enjoy scenic tea estate views along with tea factory experiences." },
      { "title": "Glenmorgan Viewpoint", "city": "Ooty", "content": "Offers scenic beauty of valleys and tea estates; known for its old ropeway." },
      { "title": "Kalhatty Waterfalls View", "city": "Ooty-Gudalur Road", "content": "View of cascading waterfalls amid a dense valley." },
      { "title": "Rangaswamy Peak and Pillar", "city": "Kotagiri", "content": "A sacred and adventurous trekking spot with breathtaking views." },
      { "title": "Pykara Viewpoint", "city": "Pykara", "content": "View of waterfalls and Pykara Lake amidst forested surroundings." },
      { "title": "Parsons Valley View", "city": "Ooty", "content": "A remote valley view spot ideal for solitude and photography." },
      { "title": "Wenlock Downs", "city": "Ooty", "content": "Expansive grassland perfect for horse riding and film shooting." },
      { "title": "Emerald Lake View", "city": "Avalanche (Ooty)", "content": "A beautiful, quiet lake surrounded by tea gardens and hills." },
      { "title": "Avalanche Lake View", "city": "Avalanche (Ooty)", "content": "Serene lake offering mesmerizing views and trout fishing opportunities." }
    ],
    

    waterfalls: [
      { "title": "Catherine Falls", "city": "Coonoor", "content": "A double cascading waterfall amidst lush greenery." },
      { "title": "Pykara Falls", "city": "Pykara", "content": "Beautiful falls fed by the Pykara River." },
      { "title": "Kalhatty Waterfalls", "city": "Kalhatty", "content": "A breathtaking waterfall en route to Ooty from Mysore." },
      { "title": "Law’s Falls", "city": "Coonoor", "content": "A small but scenic waterfall surrounded by forested slopes." }
    ],

    museums: [
      { "title": "Government Museum", "city": "Ooty", "content": "A museum showcasing tribal artifacts and regional history." },
      { "title": "Wax World", "city": "Ooty", "content": "A wax museum featuring life-size statues of famous personalities." },
      { "title": "Tea Museum and Factory", "city": "Ooty", "content": "A museum and factory dedicated to tea history and production." },
      { "title": "Honey & Bee Museum", "city": "Ooty", "content": "A unique museum focused on bees and beekeeping." },
      { "title": "Tribal Museum", "city": "Ooty", "content": "An ethnographic museum preserving tribal culture." }
    ],

    temples: [
      { "title": "Elk Hill Murugan Temple", "city": "Ooty", "content": "A beautiful hilltop temple dedicated to Lord Murugan." },
      { "title": "Annamalai Temple", "city": "Coonoor", "content": "A serene temple nestled among tea gardens." },
      { "title": "Toda Temples", "city": "Ooty", "content": "Ancient temples belonging to the indigenous Toda tribes." }
    ],

    churches: [
      { "title": "St. Stephen’s Church", "city": "Ooty", "content": "One of the oldest churches in the Nilgiris with gothic architecture." },
      { "title": "Holy Trinity Church", "city": "Ooty", "content": "A historic Anglican church with colonial charm." }
    ],

    adventure_and_activities: [
      { "title": "Nilgiri Mountain Railway", "city": "Ooty", "content": "A heritage toy train ride offering stunning mountain views." },
      { "title": "Boating at Ooty Lake", "city": "Ooty", "content": "Enjoy paddle boating and row boating at the scenic Ooty Lake." },
      { "title": "Horse Riding at Ooty Racecourse", "city": "Ooty", "content": "Horse riding experiences for adventure lovers." },
      { "title": "Trekking at Doddabetta", "city": "Ooty", "content": "Trekking trails to the highest peak in the Nilgiris." }
    ],

    shopping_and_markets: [
      { "title": "Tibetan Market", "city": "Ooty", "content": "A bustling market for handicrafts, woolens, and souvenirs." },
      { "title": "Upper Bazaar", "city": "Ooty", "content": "A lively marketplace selling local produce and crafts." },
      { "title": "Charing Cross", "city": "Ooty", "content": "A popular shopping area with a range of stores and eateries." }
    ],

    historical_sites: [
      { "title": "Stone House", "city": "Ooty", "content": "The first British bungalow built in Ooty, now a historic monument." },
      { "title": "Raj Bhavan", "city": "Ooty", "content": "The official summer residence of the Governor of Tamil Nadu." },
      { "title": "Fernhill Palace", "city": "Ooty", "content": "A historic palace now operating as a luxury hotel." }
    ],
      ForestandNatureParks: [
      { "title": "Pine Forest", "city": "Ooty", "content": "A mesmerizing forest of tall pine trees, popular among filmmakers.", "image": "/images/pine_forest.jpg" },
      { "title": "Nilgiri Biosphere Nature Park", "city": "Anaikatti", "content": "A conservation park exhibiting the diverse flora of the Nilgiris.", "image": "/images/nilgiri_biosphere_park.jpg" },
      { "title": "Arboretum Tree Garden", "city": "Ooty", "content": "A quiet tree park offering an educational nature experience.", "image": "/images/arboretum_tree_garden.jpg" }
    ],
  
      AdventureOtherActivities: [

      { "title": "Ooty Golf Course", "city": "Ooty", "content": "A sprawling 18-hole golf course surrounded by mountains.", "image": "/images/ooty_golf_course.jpg" },
      { "title": "Tea Estates of Ooty and Coonoor", "city": "Ooty-Coonoor", "content": "Endless lush tea plantations perfect for walks and photography.", "image": "/images/tea_estates.jpg" }
    ],
  
  trekking_routes: [
      { "title": "Doddabetta Peak Trek", "city": "Ooty", "content": "A short and easy trek to the highest peak in the Nilgiris." },
      { "title": "Kotagiri to Kodanad Trek", "city": "Kotagiri", "content": "A scenic trail offering panoramic views of tea estates and valleys." },
      { "title": "Parsons Valley Trek", "city": "Ooty", "content": "A moderately challenging trek through lush forests and valleys." },
      { "title": "Mukurthi National Park Trek", "city": "Mukurthi", "content": "A guided trek through a protected biosphere rich in flora and fauna." },
      { "title": "Glenmorgan Trek", "city": "Glenmorgan", "content": "An offbeat trek through tea estates and dense forests." },
      { "title": "Avalanche to Emerald Trek", "city": "Avalanche", "content": "A peaceful trek connecting two pristine lakes with rich biodiversity." },
      { "title": "Catherine Falls Trek", "city": "Coonoor", "content": "A nature trail leading to the stunning twin falls." },
      { "title": "Kodanad Viewpoint Trek", "city": "Kodanad", "content": "A short hike leading to breathtaking valley and river views." },
      { "title": "Toda Tribal Village Trek", "city": "Ooty", "content": "A cultural trek exploring the lifestyle of the indigenous Toda tribes." },
      { "title": "Hidden Valley Trek", "city": "Coonoor", "content": "An adventurous trek through misty forests and meadows." }
    ],

  };
  
  




  useEffect(() => {
    if (token) {
      axios.get(`${BASE_URL}/User/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [token]);

  const handleToggleFavorite = async (title) => {
  if (!token) {
    alert("Please login to save favorites.");
    return;
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/User/favorites`,
      { name: title }, // ✅ must match backend
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFavorites(res.data);
  } catch (err) {
    console.error(err);
  }
};





  return (
    <div className="p-8 min-h-screen">
      <div className="bg-gray-950 text-gray-300 p-10 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 uppercase mb-4">
          Top Attractions in Nilgiri
        </h1>
        <p className="text-lg font-light leading-relaxed">{cityDescription}</p>
      </div>
      <div className="mt-12">
        {Object.entries(places).map(([category, items], index) => (
          <Section
            key={index}
            title={category}
            places={items}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Coimbatore;
