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
function Tirupathur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Tirupathur, often called the 'Sandalwood Town', is a charming district nestled at the foothills of the Eastern Ghats. Known for its lush hills, rich forests, and historical temples, the city blends nature’s beauty with cultural heritage. With its proximity to Yelagiri Hills, ancient Jain sites, and tranquil lakes, Tirupathur offers a perfect mix of adventure, spirituality, and relaxation for travelers seeking an offbeat Tamil Nadu experience.";

const places = {
  "temples": [
    { title: "Vettagirieswarar Temple", city: "Tirupathur", content: "Ancient temple dedicated to Lord Shiva with a serene hilltop view." },
    { title: "Alangayam Perumal Temple", city: "Alangayam", content: "Famous Vishnu temple with traditional Dravidian architecture." },
    { title: "Kavalur Murugan Temple", city: "Kavalur", content: "Temple surrounded by lush greenery dedicated to Lord Muruga." },
    { title: "Thiruthani Murugan Temple", city: "Near Tirupathur", content: "One of the Arupadai Veedu temples of Lord Murugan." },
    { title: "Jain Temple at Elagiri Hills", city: "Yelagiri", content: "Historic Jain temple with intricate carvings and peaceful ambience." }
  ],
  "historic_sites": [
    { title: "Vaniyambadi Fort Ruins", city: "Vaniyambadi", content: "Remnants of an old fort reflecting medieval architecture." },
    { title: "Alangayam Watchtower", city: "Alangayam", content: "Historic structure offering panoramic views of surrounding hills." },
    { title: "Javadi Hills Rock Paintings", city: "Javadi Hills", content: "Ancient cave paintings dating back centuries." }
  ],
  "natural_spots": [
    { title: "Yelagiri Hills", city: "Yelagiri", content: "Hill station with pleasant climate, trekking, and adventure sports." },
    { title: "Punganur Lake", city: "Yelagiri", content: "Man-made lake with boating facilities and a walking track." },
    { title: "Jalagamparai Waterfalls", city: "Yelagiri", content: "Scenic waterfall accessible via a forest trek." },
    { title: "Alangayam Dam", city: "Alangayam", content: "Peaceful dam surrounded by forests, perfect for picnics." },
    { title: "Kavalur Observatory", city: "Kavalur", content: "Asia's largest telescope observatory for astronomy lovers." },
    { title: "Javadi Hills", city: "Javadi Hills", content: "Forest-clad hills great for trekking and bird watching." }
  ],
  "cultural_and_festivals": [
    { title: "Yelagiri Summer Festival", city: "Yelagiri", content: "Celebration of local arts, music, and flower shows." },
    { title: "Pongal Festival", city: "Tirupathur", content: "Traditional harvest festival with folk dances and feasts." },
    { title: "Aadi Pooram Festival", city: "Local Temples", content: "Religious festival with vibrant processions and rituals." }
  ],
  "scenic_nature": [
    { title: "Nilavoor Lake", city: "Yelagiri", content: "Quiet lake ideal for relaxation and nature photography." },
    { title: "Mangalam Village Fields", city: "Mangalam", content: "Lush paddy fields with scenic backdrops." },
    { title: "Parvathamalai Hills", city: "Near Tirupathur", content: "Sacred trekking spot with panoramic views." }
  ],
  "hidden_gems": [
    { title: "Kavalur Night Sky Viewpoint", city: "Kavalur", content: "Best spot for stargazing near the observatory." },
    { title: "Jalagamparai Trek Path", city: "Yelagiri", content: "Lesser-known trail to the waterfall." },
    { title: "Javadi Hills Camping Sites", city: "Javadi Hills", content: "Offbeat camping experience in the hills." },
    { title: "Ammanoor Village Pottery", city: "Ammanoor", content: "Traditional pottery-making village." }
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
          Top Attractions in Tirupathur
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

export default Tirupathur;
