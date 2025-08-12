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
function Perambalur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Perambalur, nestled in Tamil Nadu’s fertile central plains, blends ancient temples, battlefield heritage, and rare geological treasures. From the mysterious fossilized trunks at Sathanur to hilltop forts and thriving rural culture, it promises a journey rich in history, faith, and nature.";

  const places = {
    "temples": [
      { "title": "Siruvachur Mathura Kaliamman Temple", "city": "Siruvachur", "content": "1,000-year-old powerful Amman temple tied to Kannagi legend." },
      { "title": "Ekambareswarar & Thandayudhapani Temple", "city": "Chettikulam", "content": "Twin shrine complex with Ekambareswarar & Muruga; rich in history." },
      { "title": "Sri Bala Dhandayuthapani Temple", "city": "Chettikulam", "content": "Hill-temple for Murugan holding sugarcane instead of vel." },
      { "title": "Melapuliyur (Vaidyanatha Swamy) Temple", "city": "Melapuliyur", "content": "Ancient Shiva shrine believed to have healing powers." },
      { "title": "Maariamman Temple", "city": "Perambalur town", "content": "Local Amman temple with vibrant annual festival." }
    ],
    "geological_sites": [
      { "title": "National Fossil Wood Park, Sathanur", "city": "Sathanur", "content": "120-million-year-old petrified tree trunk, a geo-heritage monument." }
    ],
    "historic_sites": [
      { "title": "Ranjankudi Fort", "city": "Ranjankudi", "content": "17th-century oblong fort with moat, passageways & ASI-protected." }
    ],
    "natural_spots": [
      { "title": "Visvakudi Reservoir (Visvakudi Dam)", "city": "Visvakudi", "content": "Scenic dam across Kallar Odai, nestled between hills." }
    ],
    "waterfalls_and_hills": [
      { "title": "Koraiyar Waterfalls", "city": "Perambalur district", "content": "Offbeat waterfall amidst rural terrain." },
      { "title": "Mayil Ootru Waterfalls", "city": "Perambalur district", "content": "Seasonal waterfall—ideal post-monsoon." },
      { "title": "Aanaikatti Waterfalls", "city": "Perambalur district", "content": "Hidden cascade in forested stretches." },
      { "title": "Bramma Rishi Hill", "city": "Perambalur district", "content": "Calm hill spot perfect for views and short treks." }
    ],
    "parks_and_recreation": [
      { "title": "Periyar Park", "city": "Perambalur town", "content": "Local park for leisure and family outings." }
    ],
    "rural_and_cultural": [
      { "title": "Kunnam Temple Cluster", "city": "Kunnam", "content": "Group of Chola-era temples with rich carvings." },
      { "title": "Vembavur Lake", "city": "Vembavur", "content": "Quiet lake ideal for birdwatching and peace." },
      { "title": "Thazhuvankurichi Village", "city": "Thazhuvankurichi", "content": "Rural charm, farmlands and traditional living." }
    ],
    "hidden_gems": [
      { "title": "Koraiyar Waterfalls", "city": "Perambalur district", "content": "Least-visited rural waterfall—serene and refreshing." },
      { "title": "Aathikkottai & Kottaiyur Village Landscapes", "city": "Perambalur surroundings", "content": "Quiet villages with green trails, ideal for solitude." },
      { "title": "Kilakuyil Navi (Honey-Village)", "city": "Perambalur district", "content": "Village known for honey production and rural hospitality." },
      { "title": "Azhiyur Countryside", "city": "Perambalur district", "content": "Peaceful farmland vistas for immersive rural walks." },
      { "title": "Thazhuvankurichi's Traditional Ponds", "city": "Thazhuvankurichi", "content": "Hidden serene ponds dotting quiet cultural lanes." }
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
          Top Attractions in Perambalur
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

export default Perambalur;
