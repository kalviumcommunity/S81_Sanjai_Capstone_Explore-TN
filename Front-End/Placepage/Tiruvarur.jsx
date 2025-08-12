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
function Tiruvarur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription = "Tiruvarur, a cultural gem of Tamil Nadu’s Cauvery Delta, is renowned for the grand Sri Thyagaraja Temple and its massive temple chariot, one of the largest in Asia. The district holds a special place in Carnatic music history as the birthplace of the musical trinity—Tyagaraja, Muthuswami Dikshitar, and Syama Sastri. Surrounded by fertile farmlands, serene lakes, and ancient temples, Tiruvarur blends spirituality, art, and natural beauty into a unique travel experience.";

const places = {
  "temples": [
    { title: "Sri Thyagaraja Temple", city: "Tiruvarur", content: "Famous Shiva temple with Asia’s largest temple chariot." },
    { title: "Kamalalayam Tank Temples", city: "Tiruvarur", content: "Temples surrounding the massive sacred tank." },
    { title: "Srivanchiyam Vanchinathaswamy Temple", city: "Srivanchiyam", content: "Historic temple with sacred tank." },
    { title: "Thiruveezhimizhalai Shiva Temple", city: "Thiruveezhimizhalai", content: "Renowned for Chola-era architecture." },
    { title: "Thiruvarur Periya Kovil Amman Shrine", city: "Tiruvarur", content: "Goddess Kamalambal’s shrine in the main temple." },
    { title: "Karuvalarcheri Temple", city: "Tiruvarur", content: "Small but spiritually significant temple." },
    { title: "Thirukkannamangai Neelamegha Perumal Temple", city: "Thirukkannamangai", content: "Divya Desam Vishnu temple." },
    { title: "Thirukkannapuram Sowriraja Perumal Temple", city: "Thirukkannapuram", content: "Famous for unique deity with a hair tuft." },
    { title: "Thirumancheri Udhvaganathar Temple", city: "Thirumancheri", content: "Popular for marriage blessings." },
    { title: "Thirunellikka Shiva Temple", city: "Thirunellikka", content: "Historic temple near lush fields." },
    { title: "Thirukkollikadu Muniswarar Temple", city: "Thirukkollikadu", content: "Rural temple with folk traditions." }
  ],
  "historic_sites": [
    { title: "Kamalalayam Tank", city: "Tiruvarur", content: "One of the largest temple tanks in India." },
    { title: "Muthuswami Dikshitar House", city: "Tiruvarur", content: "Birthplace of the Carnatic music composer." },
    { title: "Tyagaraja Birthplace", city: "Tiruvarur", content: "Home of the famous saint-composer." },
    { title: "Syama Sastri Memorial", city: "Tiruvarur", content: "Memorial for the great musician." },
    { title: "Ancient Chola Stone Inscriptions", city: "Tiruvarur", content: "Inscriptions in various temples." },
    { title: "Thiruveezhimizhalai Heritage Streets", city: "Thiruveezhimizhalai", content: "Old lanes with traditional houses." },
    { title: "Srivanchiyam Heritage Tank", city: "Srivanchiyam", content: "Sacred tank with historical connections." },
    { title: "Thirukkannamangai Chola Architecture", city: "Thirukkannamangai", content: "Ornate pillars and sculptures." }
  ],
  "natural_spots": [
    { title: "Vaduvur Bird Sanctuary", city: "Vaduvur", content: "Migratory bird haven with a large lake." },
    { title: "Muthupet Mangrove Forest", city: "Muthupet", content: "Dense mangrove ecosystem at the river mouth." },
    { title: "Udayamarthandapuram Bird Sanctuary", city: "Udayamarthandapuram", content: "Seasonal wetland attracting diverse birds." },
    { title: "Veeranam Lake Backwaters", city: "Near Tiruvarur", content: "Picturesque lake for picnics." },
    { title: "Kamalalayam Tank Walkway", city: "Tiruvarur", content: "Evening stroll spot around the sacred tank." },
    { title: "Poonthottam Fields", city: "Tiruvarur", content: "Endless green paddy fields." },
    { title: "Ammanpettai Lakeside", city: "Ammanpettai", content: "Small fishing lake." }
  ],
  "cultural_and_festivals": [
    { title: "Thiruvarur Car Festival", city: "Tiruvarur", content: "Asia’s largest temple chariot procession." },
    { title: "Kamalambal Navaratri", city: "Tiruvarur", content: "Nine-day festival for the goddess." },
    { title: "Margazhi Music Fest", city: "Tiruvarur", content: "Carnatic music concerts across temples." },
    { title: "Panguni Uthiram", city: "Tiruvarur", content: "Celebration of divine weddings." },
    { title: "Chariot Pulling in Srivanchiyam", city: "Srivanchiyam", content: "Annual temple chariot ritual." },
    { title: "Aadi Pooram", city: "Tiruvarur", content: "Festival for Goddess Andal." },
    { title: "Vaikunta Ekadasi", city: "Thirukkannamangai", content: "Vishnu temple rituals." }
  ],
  "scenic_nature": [
    { title: "Mangrove Boat Ride", city: "Muthupet", content: "Boat ride through dense mangroves." },
    { title: "Sunset Point", city: "Vaduvur Lake", content: "Beautiful evening views." },
    { title: "Birdwatching Tower", city: "Udayamarthandapuram", content: "Observation point for migratory birds." },
    { title: "Paddy Field Trails", city: "Tiruvarur", content: "Cycling paths through rural scenery." },
    { title: "Muthupet Backwaters", city: "Muthupet", content: "Tranquil estuary views." },
    { title: "Vaduvur Lake Islands", city: "Vaduvur", content: "Tiny green islands in the lake." }
  ],
  "hidden_gems": [
    { title: "Thirukkollikadu Hidden Shrine", city: "Thirukkollikadu", content: "Small rural temple rarely visited." },
    { title: "Vaduvur Lesser-known Birding Spot", city: "Vaduvur", content: "Quiet corner of the sanctuary." },
    { title: "Thiruveezhimizhalai Village Ponds", city: "Thiruveezhimizhalai", content: "Natural ponds amidst heritage houses." },
    { title: "Muthupet Fishermen’s Hamlet", city: "Muthupet", content: "Rustic fishing community by the mangroves." },
    { title: "Srivanchiyam Secret Steps", city: "Srivanchiyam", content: "Ancient stone steps hidden by overgrowth." },
    { title: "Poonthottam Canal Walk", city: "Poonthottam", content: "Quiet canal-side path." },
    { title: "Old Lighthouse Ruins", city: "Near Muthupet", content: "Ruins of an old coastal beacon." }
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
          Top Attractions in Tiruvarur
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

export default Tiruvarur;
