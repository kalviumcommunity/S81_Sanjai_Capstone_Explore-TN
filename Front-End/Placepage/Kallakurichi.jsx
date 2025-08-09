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
function Kallakurichi() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription =
  "Kallakurichi district, carved out of Villupuram in 2019, offers a serene rural charm characterized by misty hill ranges, cascading waterfalls, peaceful reservoirs, historic cave shrines, ancient temples, and inviting lakes—set amidst agricultural greenery and tribal heritage.";

const places = {
  "hill_and_water_falls": [
    { "title": "Megam Falls", "city": "Kalvarayan Hills", "content": "Dramatic seasonal waterfall at foothills—great for trekking and nature views." },
    { "title": "Periyar Falls", "city": "Kalvarayan Hills", "content": "Monsoon-fed cascade in the Eastern Ghats—fresh, scenic and tranquil." },
    { "title": "Sirakulur Falls", "city": "Kalvarayan Hills", "content": "Less-visited waterfall in the hill range, ideal for peaceful visits." },
    { "title": "Valley View Point", "city": "Kalvarayan Hills", "content": "Panoramic lookout over misty valleys and tribal settlements." },
    { "title": "Thiyagadurgam Hills", "city": "Thiyagadurgam", "content": "Hillock with historic Jain caves, idols and ancient fort." }
  ],
  "dams_and_reservoirs": [
    { "title": "Gomukhi Dam / Reservoir", "city": "Kalvarayan Hills", "content": "Large man-made lake feeding 47 villages, scenic among forests." },
    { "title": "Manimuktha Dam", "city": "Agarakottalam", "content": "Small river dam on Manimuktha River—calm spot for visits." },
    { "title": "Kariyakovil Boat House", "city": "Kallakurichi area", "content": "Boating facility near dam—ideal picnic and leisure spot." },
    { "title": "Kallakurichi Lake", "city": "Kallakurichi town", "content": "Town lake with boating and relaxing ambiance." },
    { "title": "Chakravarthi Lake", "city": "near Kallakurichi", "content": "Quiet waterbody for boating, picnics and seasonal birds." }
  ],
  "temples_and_religious_sites": [
    { "title": "Veerateeswarar Temple", "city": "Thirukovilur", "content": "10th-century Shiva shrine (Paadal Petra Sthalam) with Dravidian features." },
    { "title": "Ulagalantha Perumal Temple", "city": "Thirukovilur", "content": "Divya Desam Vishnu shrine with 52 m rajagopuram and huge Trivikrama idol." },
    { "title": "Adhi Thiruvarangam Ranganathaswamy Temple", "city": "Adhi Thiruvarangam", "content": "Reclining Vishnu temple—108 Abhimana Kshethram." },
    { "title": "Sri Arthanareeswarar Temple", "city": "Rishivandiyam", "content": "Unique half-male-female form of Shiva-Parvati." },
    { "title": "Sri Chidambareswarar Temple", "city": "Kattu Edayar", "content": "Local Shiva shrine with cultural importance." },
    { "title": "Sri Arthanatheeswarar Temple", "city": "Elavanasurkottai (Pidagam)", "content": "Another unique half-gender Shiva form temple." },
    { "title": "Aanjaneyar Temple", "city": "Ravathanallur", "content": "Hanuman shrine valued by local devotees." },
    { "title": "Sri Ulagalantha Perumal (another)", "city": "Thirukkoilur", "content": "Alternative Vishnu temple mentioned under Tamil Nadu tourism." },
    { "title": "Sri Selva Vinayagar Temple", "city": "Sankarapuram", "content": "Ganesha shrine with intricate Dravidian scheme." },
    { "title": "Arulmigu Srimathi Meenakshi Amman Temple", "city": "Kallakurichi town", "content": "Temple dedicated to Goddess Meenakshi with annual Thirukalyanam." },
    { "title": "Veerachozhan Temple", "city": "Kallakurichi district", "content": "Historic Shiva shrine with Dravidian architecture." }
  ],
  "historical_and_cave_sites": [
    { "title": "Thirunarungondai Jaina Caves", "city": "Thirunarungondai", "content": "8-9th century Jain cave and temple cluster with bronze icons." },
    { "title": "Kabilar Kundru", "city": "Thirukovilur", "content": "Rock over river where saint Kabilar is believed to be buried." },
    { "title": "Thiyagadurgam Fort Remnant", "city": "Thiyagadurgam", "content": "Small hill fort associated with ancient Jain presence." }
  ],
  "scenic_and_rural_spots": [
    { "title": "Sugarcane Fields / Sugarcane City", "city": "around Kallakurichi", "content": "Vast cultivated fields—experience fresh juice and rural pace." },
    { "title": "Paddy Fields & Agricultural Tours", "city": "Kallakurichi rural", "content": "Guided tours of traditional farming and fresh harvest." },
    { "title": "Kachirayapalayam Sugar Factory Viewpoint", "city": "Kachirayapalayam", "content": "Vistas of industrial-agricultural zone and rural life." },
    { "title": "Veerachozhan Riverbank", "city": "Kallakurichi region", "content": "Peaceful river edge—great for photography and birdwatching." },
    { "title": "Sathanur Lake", "city": "Kallakurichi district", "content": "Calm lakeside spot surrounded by fields and birdlife." },
    { "title": "Forests & Lakes at Putthirampattu", "city": "Putthirampattu area", "content": "Natural rural wetlands, woods and water bodies for calm walks." }
  ],
  "religious_and_christian_sites": [
    { "title": "Melnaariyappanoor Church", "city": "Melnaariyappanoor", "content": "100-year-old St. Anthony shrine with annual June feast." },
    { "title": "Our Lady of Rosary Church", "city": "Kallakurichi town", "content": "Roman Catholic parish built early 20th century by MEP priests." }
  ],
  "markets_and_local_culture": [
    { "title": "Kallakurichi Local Markets", "city": "Kallakurichi", "content": "Bustling markets selling produce, handicrafts and textiles." },
    { "title": "Kallakurichi Food Markets", "city": "Kallakurichi", "content": "Street food hotspots with dosas, idlis, pani puri and more." },
    { "title": "Gandhi Road Street Food", "city": "Kallakurichi", "content": "Vibrant street stalls offering regional snacks and treats." },
    { "title": "Cultural Programs & Theatres", "city": "Kallakurichi", "content": "Local cinemas and occasional folk performances." }
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
          Top Attractions in Kallakurichi
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

export default Kallakurichi;
