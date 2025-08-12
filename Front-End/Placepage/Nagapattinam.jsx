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
  const gridCols =
    places.length % 3 === 0 || places.length === 5
      ? 'md:grid-cols-3'
      : 'md:grid-cols-4';
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-100 border-l-4 border-blue-500 pl-4 mb-6 uppercase">
        {title}
      </h2>
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

// ✅ Main Component
function Nagapattinam() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  const cityDescription =
    "Nagapattinam, a coastal gem of Tamil Nadu, marries centuries of maritime legacy, sacred shrines, and vibrant ecology. From the revered Velankanni Basilica and Nagoor Dargah to the migratory birds at Point Calimere, the district blends spirituality, heritage, and nature in one unforgettable tapestry.";

  const places = {
    temples: [
      { title: "Kayarohanaswami Temple", city: "Nagapattinam", content: "6th-century Shiva temple, a Saptha Vidanga shrine with unique dance legend." },
      { title: "Soundararajaperumal Temple", city: "Nagapattinam", content: "108 Divya Desam Vishnu temple glorified in early Tamil canon." },
      { title: "Brahmapureeswarar Temple", city: "Thirukkuvalai", content: "Paadal Petra Sthalam with Chola and Nayak inscriptions." },
      { title: "Uthrapathiswaraswamy Temple", city: "Tiruchengattankudi", content: "Shiva temple famed for human-headed Ganesha icon." },
      { title: "Vaitheeswaran Temple", city: "Vaitheeswaran Koil", content: "Navagraha shrine dedicated to Mars, revered for healing powers." },
      { title: "Amritaghateswarar Temple", city: "Thirukkadaiyur", content: "Large Shiva complex with multiple sacred tanks and hymns." }
    ],
    shrines_and_churches: [
      { title: "Velankanni Basilica", city: "Velankanni", content: "Pilgrimage church known as the 'Lourdes of the East'." },
      { title: "Nagore Dargah", city: "Nagore", content: "Sufi shrine drawing devotees of multiple faiths; site of Kanduri." }
    ],
    beaches_and_coastal: [
      { title: "Nagapattinam Beach", city: "Nagapattinam", content: "Peaceful coastline ideal for sunset strolls." },
      { title: "Poompuhar Beach", city: "Poompuhar", content: "Historic Chola port ruins along a scenic coastline." },
      { title: "Tranquebar (Danish Fort & Beach)", city: "Tharangambadi", content: "Colonial heritage with Danish fort and seaside views." }
    ],
    wildlife_and_nature: [
      { title: "Point Calimere Wildlife & Bird Sanctuary", city: "Kodikkarai", content: "Ramsar site with flamingos, deer, mangroves & dunes." }
    ],
    other_spots: [
      { title: "Government Museum, Nagapattinam", city: "Nagapattinam", content: "Showcases regional archaeology and cultural artifacts." },
      { title: "Poompuhar Art Gallery", city: "Poompuhar", content: "Museum highlighting Sangam-era maritime heritage." }
    ],
    hidden_gems: [
      { title: "Poompuhar Port Ruins", city: "Poompuhar", content: "Archaeological coastal ruins off the usual tourist path." },
      { title: "Mangrove Walks near Point Calimere", city: "Kodikkarai", content: "Tranquil mangrove trails for birders and nature lovers." }
    ]
  };

  // ✅ Fetch Favorites
  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/User/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [token]);

  // ✅ Toggle Favorite
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
          Top Attractions in Nagapattinam
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

export default Nagapattinam;
