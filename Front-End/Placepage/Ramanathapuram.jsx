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
function Ramanathapuram() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Ramanathapuram District—steeped in epic legends, coastal beauty, and architectural splendor—is a pilgrimage and heritage powerhouse. From the revered Ramanathaswamy Temple in Rameswaram to the haunting ghost town of Dhanushkodi, bustling palaces, unique ecosystems, and spiritual shrines—this district tells timeless tales.";

  const places = {
    temples: [
      {
        title: "Ramanathaswamy Temple",
        city: "Rameswaram",
        content:
          "Historic Jyotirlinga shrine with magnificent corridors, sacred wells and towering gopuram." 
        // :contentReference[oaicite:0]{index=0}
      },
      {
        title: "Adi Jagannatha Perumal Temple",
        city: "Thiruppullani",
        content:
          "One of the 108 Divya Desams—Vishnu temple glorified in Alvar hymns." 
        // :contentReference[oaicite:1]{index=1}
      },
      {
        title: "Adhi Ratneswarar Temple",
        city: "Thiruvadanai",
        content:
          "Ancient Shiva shrine praised in Thevaram, rich legend of goat-elephant transformation." 
        // :contentReference[oaicite:2]{index=2}
      },
      {
        title: "Uthirakosamangai Temple",
        city: "Uthirakosamangai",
        content:
          "Shiva shrine housing emerald Nataraja idol, rare spiritual architecture." 
        // :contentReference[oaicite:3]{index=3}
      }
    ],
    coastal_and_beaches: [
      { 
        title: "Dhanushkodi", 
        city: "Rameswaram tip", 
        content: "Ghost-town by storm ruins, serene and haunting beachscape." 
        // :contentReference[oaicite:4]{index=4}
      },
      {
        title: "Kurusadai Island",
        city: "Gulf of Mannar",
        content:
          "Marine biosphere island rich in coral reefs, migratory birds & biodiversity." 
        // :contentReference[oaicite:5]{index=5}
      },
      {
        title: "Palai Genetic Heritage Park",
        city: "near Kilakarai",
        content:
          "Dry-land ecological garden with dunes, oasis, children’s zone." 
        // :contentReference[oaicite:6]{index=6}
      }
    ],
    historical_and_palace: [
      {
        title: "Ramanathapuram Palace",
        city: "Ramanathapuram",
        content:
          "Royal Sethupathi palace, murals, durbar hall-museum, weapon collections." 
        // :contentReference[oaicite:7]{index=7}
      },
      {
        title: "Pamban Bridge",
        city: "Pamban / Rameswaram",
        content:
          "Century-old sea bridge, engineering marvel linking island to mainland."
        // :contentReference[oaicite:8]{index=8}
      }
    ],
    memorials_and_shrines: [
      {
        title: "Dr. APJ Abdul Kalam Memorial",
        city: "Rameswaram",
        content:
          "Tribute to India’s beloved scientist-president with exhibits & planetarium."
        // :contentReference[oaicite:9]{index=9}
      },
      {
        title: "Ervadi Dargah",
        city: "Ervadi",
        content:
          "Sufi shrine of Syed Ibrahim Shahid; site of the annual Santhanakoodu festival." 
        // :contentReference[oaicite:10]{index=10}
      },
      {
        title: "Devipattinam Navagraha Temple",
        city: "Devipattinam",
        content:
          "Unique sea-side Navagraha shrine submerged in water—mythical Rama’s offering." 
        // :contentReference[oaicite:11]{index=11}
      }
    ],
    wildlife_and_nature: [
      {
        title: "Sakkarakottai Bird Sanctuary",
        city: "Ramanathapuram district",
        content:
          "Ramsar-designated wetland with ~124 bird species and diverse wildlife." 
        // :contentReference[oaicite:12]{index=12}
      },
      {
        title: "Karangadu Mangrove Forest",
        city: "Ramanathapuram coast",
        content:
          "Coastal mangrove ecosystem rich in marine fauna, vital for conservation." 
        // :contentReference[oaicite:13]{index=13}
      }
    ],
    hidden_gems: [
      {
        title: "Villoondi Theertham",
        city: "Rameswaram",
        content:
          "Sea-shore freshwater spring, one of Rameswaram’s sacred 64 theerthams." 
        // :contentReference[oaicite:14]{index=14}
      },
      {
        title: "Jada Theertham",
        city: "Near Dhanushkodi",
        content:
          "Offbeat temple and twin theerthams where Rama bathed—quiet, peacock-populated." 
        // :contentReference[oaicite:15]{index=15}
      },
      {
        title: "Valinokkam Village & Dargah",
        city: "Valinokkam",
        content:
          "Salt-making peninsula, serene beaches & Peer Muhammad Dargah." 
        // :contentReference[oaicite:16]{index=16}
      }
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
          Top Attractions in Ramanathapuram
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

export default Ramanathapuram;
