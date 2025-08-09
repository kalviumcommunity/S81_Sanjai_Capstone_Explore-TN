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
function Dharmapuri() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
  "Dharmapuri district, nestled along the banks of the Kaveri River in western Tamil Nadu, offers a tapestry of natural beauty, sacred hill shrines, colonial relics, and spiritual heritage—spanning from dramatic waterfalls and forested hills to ancient temples and historic memorials.";

const places = {
  "waterfalls_and_riverscapes": [
    { "title": "Hogenakkal Falls", "city": "Hogenakkal", "content": "Spectacular waterfalls on the Kaveri, famous for coracle rides and smoky rock formations." },
    { "title": "Kaveri River Banks", "city": "Dharmapuri District", "content": "Serene riverside settings ideal for picnics, walks, and fishing." },
    { "title": "Rama Theertham", "city": "Theerthamalai", "content": "Natural spring waterfall created by Rama for worship—linked to local mythology." },
    { "title": "Hanuman Theertham", "city": "Near Theerthamalai", "content": "Sacred spring where sweet water flows even during dry seasons." },
    { "title": "Thoppayaru Dam", "city": "Thoppur", "content": "Scenic dam on local tributary, good for peaceful views." }
  ],
  "hill_and_forest_destinations": [
    { "title": "Theerthamalai Hill Temple", "city": "Harur Taluk", "content": "Ancient Shiva temple atop a hillock surrounded by five sacred springs." },
    { "title": "Melagiri Hills", "city": "Dharmapuri–Krishnagiri border", "content": "Forest-covered hills offering trekking and sightings of rare fauna." },
    { "title": "Vathalmalai Hills", "city": "Dharmapuri District", "content": "Undeveloped Eastern Ghats outcrop with tranquil hill views." },
    { "title": "Muthampatti Anjaneya Temple Surrounds", "city": "Muthampatti", "content": "Forest shrine area nestled in rural natural landscape." },
    { "title": "Morappur Lake & Surroundings", "city": "Morappur", "content": "Calm lake with birdwatching opportunities." }
  ],
  "ancient_temples_and_shrines": [
    { "title": "Mallikarjunar (Kottai) Temple", "city": "Dharmapuri", "content": "Chola-era temple with unique hanging pillars and goddess precedence lore." },
    { "title": "Kala Bairavar Temple", "city": "Dharmapuri Outskirts", "content": "Rare Bhairava temple with zodiac-linked shrine panels." },
    { "title": "Chenraya Perumal Temple", "city": "Adhiyamankottai", "content": "Hoysala & Vijayanagara-era Vishnu shrine with exquisite painted ceilings." },
    { "title": "Subramanya Siva Memorial", "city": "Papparapatti", "content": "Memorial to freedom fighter, marking his birthplace and legacy." },
    { "title": "Sri Anjaneya Temple", "city": "Muthampatti area", "content": "Forest-set Hanuman shrine, locally revered." }
  ],
  "historical_remnants_and_monuments": [
    { "title": "Adhiyaman Fort Ruins", "city": "Adhiyamankottai", "content": "Remnants of the oval fort belonging to ancient Adhiyaman rulers." },
    { "title": "Sir Thomas Munro Pillar", "city": "Dharmapuri", "content": "Colonial-era memorial marking Munro's tenure in the region." },
    { "title": "Dharmapuri Archaeological Museum", "city": "Dharmapuri", "content": "Museum showcasing regional heritage artifacts and fossils." },
    { "title": "Papparapatti Freedom Trails", "city": "Papparapatti", "content": "Sites commemorating Subramanya Siva’s activism and history." },
    { "title": "Megalithic Burial Sites", "city": "Mallachandram", "content": "Ancient megalithic structures reflecting early Tamil settlements." }
  ],
  "colonial_and_religious_buildings": [
    { "title": "Sacred Heart Cathedral", "city": "Dharmapuri", "content": "Jesuit-built cathedral serving as locale’s Roman Catholic seat." },
    { "title": "CSI Zion Church", "city": "Dharmapuri City", "content": "Historic Protestant church with community importance." },
    { "title": "Mount Carmel Church", "city": "B. Pallipatty", "content": "Known for its elaborate Grotto feast celebrated post-Easter." },
    { "title": "Sir Thomas Munro Residence Site", "city": "Dharmapuri", "content": "Historical location tied to his garden and house." },
    { "title": "Various Colonial-era Mission Sites", "city": "Dharmapuri Town", "content": "Sites indicating early missionary presence (Jesuits, etc.)." }
  ],
  "dams_and_man_made_lakes": [
    { "title": "Thoppayaru Dam", "city": "Thoppur", "content": "Local water reservoir and viewpoint for the surrounding area." },
    { "title": "Morappur Lake", "city": "Morappur", "content": "Quiet lake spot for leisurely visits." },
    { "title": "Krishnagiri Dam (nearby)", "city": "Krishnagiri region", "content": "Noted for its picnic environment and deer park." },
    { "title": "Nagavadhi Dam", "city": "Thoppur area", "content": "Minor irrigation structure in the district." },
    { "title": "Local Village Reservoirs", "city": "Rural Dharmapuri", "content": "Numerous small ponds and irrigation tanks with scenic rural charm." }
  ]
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
          Top Attractions in Dharmapuri
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

export default Dharmapuri;
