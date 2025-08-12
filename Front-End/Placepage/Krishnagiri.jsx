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
function Krishnagiri() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  const cityDescription = "Krishnagiri, known as the Mango Capital of India, is a picturesque district in Tamil Nadu celebrated for its lush mango orchards, scenic hill ranges, and rich historical heritage. Nestled amid the Eastern Ghats, it offers a blend of nature, adventure, and culture with serene lakes, ancient temples, and trekking spots. The district is dotted with historic forts, vibrant markets, and tranquil waterfalls, making it a delightful destination for nature lovers and history enthusiasts alike."; // text shortened

  const places = {
    "hill_stations": [
      { "title": "Rayakottah Hills", "city": "Rayakottai", "content": "Picturesque hills surrounding a historic fort." },
      { "title": "Krishnagiri Hills", "city": "Krishnagiri", "content": "Scenic viewpoint over the town and dam." },
      { "title": "Shoolagiri Hills", "city": "Shoolagiri", "content": "Green hills popular for short hikes." },
      { "title": "Bargur Hills", "city": "Bargur", "content": "Hill range with natural trekking routes." },
      { "title": "Kattinayanapalli Hills", "city": "Kattinayanapalli", "content": "Quiet hills with rural charm." },
      { "title": "Perandapalli Hill Trails", "city": "Perandapalli", "content": "Ideal for early morning treks." }
    ],
    "waterfalls": [
      { "title": "Thali Falls", "city": "Thally", "content": "Seasonal waterfall in a tranquil setting." },
      { "title": "KRP Dam Spillway Falls", "city": "Krishnagiri", "content": "Water cascading during dam overflow." },
      { "title": "Pochampalli Small Falls", "city": "Pochampalli", "content": "Hidden falls within rocky terrain." },
      { "title": "Shoolagiri Rain Falls", "city": "Shoolagiri", "content": "Short-lived waterfall after monsoon showers." },
      { "title": "Bargur Hillstream Falls", "city": "Bargur", "content": "Small stream turning into falls in rains." }
    ],
    "dams_and_lakes": [
      { "title": "Krishnagiri Reservoir Project (KRP Dam)", "city": "Krishnagiri", "content": "Major dam with a scenic park." },
      { "title": "Shoolagiri Lake", "city": "Shoolagiri", "content": "Popular for roadside views and relaxation." },
      { "title": "Kelavarapalli Dam", "city": "Hosur", "content": "Peaceful dam surrounded by greenery." },
      { "title": "Soolagiri Check Dam", "city": "Shoolagiri", "content": "Small dam perfect for picnics." },
      { "title": "Perandapalli Lake", "city": "Perandapalli", "content": "Calm lake near village outskirts." },
      { "title": "Barur Lake", "city": "Barur", "content": "Serene spot for evening walks." }
    ],
    "temples": [
      { "title": "Sri Parshwa Padmavathi Jain Temple", "city": "Krishnagiri", "content": "Famous Jain temple with intricate carvings." },
      { "title": "Kattuveera Anjaneyar Temple", "city": "Krishnagiri", "content": "Ancient Hanuman temple." },
      { "title": "Sri Varadaraja Perumal Temple", "city": "Krishnagiri", "content": "Popular Vishnu temple." },
      { "title": "Sri Arulmigu Maragathambigai Chandra Choodeswarar Temple", "city": "Hosur", "content": "Historic Shiva temple on a hill." },
      { "title": "Sri Kailasanathar Temple", "city": "Bargur", "content": "Sacred Shiva temple with a serene atmosphere." },
      { "title": "Sri Lakshmi Narasimha Swamy Temple", "city": "Pochampalli", "content": "Temple dedicated to Lord Narasimha." },
      { "title": "Sri Venkateswara Temple", "city": "Hosur", "content": "Well-known Balaji temple." },
      { "title": "Sri Venugopalaswamy Temple", "city": "Rayakottai", "content": "Temple amidst the hills." }
    ],
    "viewpoints": [
      { "title": "Krishnagiri Dam Viewpoint", "city": "Krishnagiri", "content": "Scenic view over the reservoir." },
      { "title": "Rayakottai Fort Top", "city": "Rayakottai", "content": "360° view from the fort ruins." },
      { "title": "Bargur Hilltop View", "city": "Bargur", "content": "Overlooks valleys and farms." },
      { "title": "Hosur Hill Viewpoint", "city": "Hosur", "content": "Sunrise and sunset views over Hosur town." },
      { "title": "Perandapalli Hill Viewpoint", "city": "Perandapalli", "content": "Rural landscapes and greenery." }
    ],
    "parks_and_gardens": [
      { "title": "Krishnagiri Government Park", "city": "Krishnagiri", "content": "Well-maintained park near the dam." },
      { "title": "Children’s Park Hosur", "city": "Hosur", "content": "Family-friendly park in the city." },
      { "title": "Shoolagiri Lake Park", "city": "Shoolagiri", "content": "Park with seating and lake views." },
      { "title": "Hosur Eco Park", "city": "Hosur", "content": "Nature park with walking trails." },
      { "title": "Kelavarapalli Dam Park", "city": "Hosur", "content": "Green park next to the dam." }
    ],
    "historical_sites": [
      { "title": "Rayakottai Fort", "city": "Rayakottai", "content": "Historic fort with British era significance." },
      { "title": "Krishnagiri Fort", "city": "Krishnagiri", "content": "Ancient fort with strategic hilltop location." },
      { "title": "Bargur Ancient Stone Structures", "city": "Bargur", "content": "Ruins of old settlements." },
      { "title": "Shoolagiri Old Watchtower", "city": "Shoolagiri", "content": "Colonial-era lookout point." },
      { "title": "Pochampalli Heritage Temples", "city": "Pochampalli", "content": "Cluster of temples with Dravidian architecture." }
    ],
    "other_spots": [
      { "title": "Krishnagiri Mango Farms", "city": "Krishnagiri", "content": "Famous mango orchards." },
      { "title": "Hosur Rose Garden", "city": "Hosur", "content": "Beautiful rose varieties on display." },
      { "title": "Shoolagiri Highway Eateries", "city": "Shoolagiri", "content": "Popular food joints along the highway." },
      { "title": "Perandapalli Countryside", "city": "Perandapalli", "content": "Scenic rural farmlands." },
      { "title": "Bargur Forest Trails", "city": "Bargur", "content": "Nature walks through forests." },
      { "title": "Kelavarapalli Birdwatching Spot", "city": "Hosur", "content": "Birdwatching near the dam." }
    ],
    "hidden_gems": [
      { "title": "Mallachandram Village Temples", "city": "Mallachandram", "content": "Cluster of small, beautiful temples." },
      { "title": "Thally Forest Tracks", "city": "Thally", "content": "Secluded trekking routes." },
      { "title": "Rayakottai Secret Cave", "city": "Rayakottai", "content": "Hidden cave within the fort area." },
      { "title": "Kattinayanapalli Village Lake", "city": "Kattinayanapalli", "content": "Quiet lake away from the crowds." },
      { "title": "Bargur Mango Estate Trails", "city": "Bargur", "content": "Walk through private mango estates." }
    ]
  };;

  




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
          Top Attractions in Krishnagiri
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

export default Krishnagiri;
