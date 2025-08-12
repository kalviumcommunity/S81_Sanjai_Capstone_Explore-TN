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
function Vellore() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

const cityDescription = "Vellore, the 'Fort City' of Tamil Nadu, is famed for its magnificent Vellore Fort, the dazzling golden Sripuram Temple, and its blend of Tamil and Deccan heritage. Nestled among hills and lakes, the city combines historical grandeur with modern excellence, being home to renowned institutions like CMC Hospital and VIT University. From sacred shrines to serene hill escapes, Vellore is a destination where history, spirituality, and nature meet.";

const places = {
  "temples": [
    { title: "Sripuram Golden Temple", city: "Vellore", content: "A golden-clad temple dedicated to Goddess Lakshmi Narayani." },
    { title: "Jalakandeswarar Temple", city: "Vellore Fort", content: "Historic temple inside the Vellore Fort." },
    { title: "Ratnagiri Murugan Temple", city: "Vellore", content: "Hilltop temple with panoramic views." },
    { title: "Virinjipuram Margabandeeswarar Temple", city: "Virinjipuram", content: "Chola-era temple with intricate carvings." },
    { title: "Mahadeva Malai Temple", city: "Vellore", content: "Small temple atop a scenic hill." },
    { title: "Sri Sunkurama Perumal Temple", city: "Vellore", content: "Vishnu temple with a rich history." },
    { title: "Sripuram Narayani Peedam", city: "Vellore", content: "Spiritual center connected to the Golden Temple." },
    { title: "Athiyur Kaliamman Temple", city: "Athiyur", content: "Village temple with vibrant festivals." },
    { title: "Eswaran Temple", city: "Vellore", content: "Simple yet peaceful shrine." },
    { title: "Palamathi Hills Temple", city: "Palamathi", content: "Small hill shrine with serene views." }
  ],
  "historic_sites": [
    { title: "Vellore Fort", city: "Vellore", content: "Massive 16th-century fort with granite walls." },
    { title: "Delhi Gate", city: "Vellore", content: "Historic gateway of the fort." },
    { title: "Government Museum Vellore", city: "Vellore", content: "Artifacts from Chola to Vijayanagara periods." },
    { title: "Tipu Mahal", city: "Vellore", content: "Palace associated with Tipu Sultan." },
    { title: "Hyder Mahal", city: "Vellore", content: "Historic building inside the fort." },
    { title: "Balamathi Fort Ruins", city: "Balamathi Hills", content: "Old fort remains on a hill." },
    { title: "Virinjipuram Chola Inscriptions", city: "Virinjipuram", content: "Ancient Tamil and Grantha scripts." },
    { title: "Kavalur Observatory Old Structures", city: "Kavalur", content: "Historic science facility remnants." }
  ],
  "natural_spots": [
    { title: "Amirthi Zoological Park", city: "Amirthi", content: "Mini zoo and nature trails." },
    { title: "Palamathi Hills", city: "Vellore", content: "Scenic hills with a quiet atmosphere." },
    { title: "Punganoor Lake", city: "Yelagiri", content: "Boating and picnic spot in the hills." },
    { title: "Javadi Hills", city: "Vellore", content: "Forested hills with waterfalls." },
    { title: "Periyar Park", city: "Vellore", content: "Urban park with greenery and play areas." },
    { title: "Anaicut Dam", city: "Vellore", content: "Dam and reservoir with picnic spots." },
    { title: "Palar River Banks", city: "Vellore", content: "Scenic riverside walks." },
    { title: "Balamathi Forest Area", city: "Balamathi", content: "Lush green forested stretch." }
  ],
  "cultural_and_festivals": [
    { title: "Sripuram Temple Festivals", city: "Vellore", content: "Grand celebrations in the golden temple." },
    { title: "Virinjipuram Temple Car Festival", city: "Virinjipuram", content: "Annual chariot procession." },
    { title: "Panguni Uthiram at Ratnagiri", city: "Vellore", content: "Murugan temple festival." },
    { title: "Navaratri at Sripuram", city: "Vellore", content: "Nine-day devotional celebrations." },
    { title: "Deepavali Street Markets", city: "Vellore", content: "Festive shopping buzz." },
    { title: "Tamil New Year Celebrations", city: "Vellore", content: "Cultural performances and rituals." }
  ],
  "scenic_nature": [
    { title: "Yelagiri Hills", city: "Vellore", content: "Cool hill station with trekking and boating." },
    { title: "Nilavoor Lake", city: "Yelagiri", content: "Quiet lake with birdlife." },
    { title: "Swamimalai Hills Trek", city: "Yelagiri", content: "Moderate trek with breathtaking views." },
    { title: "Javadi Hills Waterfalls", city: "Vellore", content: "Seasonal waterfalls in the hills." },
    { title: "Palamathi Viewpoint", city: "Palamathi", content: "Panoramic view of Vellore city." },
    { title: "Balamathi Sunset Point", city: "Balamathi", content: "Evening views over the plains." }
  ],
  "hidden_gems": [
    { title: "Kavalur Observatory", city: "Kavalur", content: "Astronomical research center with stargazing." },
    { title: "Nilavoor Tribal Hamlet", city: "Yelagiri", content: "Small tribal settlement in the hills." },
    { title: "Athiyur Village Walks", city: "Athiyur", content: "Rural charm with temple visits." },
    { title: "Unmarked Hill Trails", city: "Javadi Hills", content: "Quiet treks off the tourist path." },
    { title: "Secret Streams of Amirthi", city: "Amirthi", content: "Hidden water spots near the park." },
    { title: "Old British Bungalows", city: "Vellore", content: "Colonial-era houses in quiet lanes." },
    { title: "Abandoned Railway Tunnel", city: "Near Yelagiri", content: "Historic tunnel no longer in use." }
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
          Top Attractions in Vellore
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

export default Vellore;
