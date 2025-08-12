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
function  Thanjavur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Thanjavur, often called the Rice Bowl of Tamil Nadu, is a cultural jewel steeped in Chola dynasty heritage. Renowned for its UNESCO-listed Brihadeeswarar Temple, exquisite bronze sculptures, and traditional Tanjore paintings, the district is a living museum of South Indian art and architecture. With fertile fields, classical Carnatic music, and vibrant festivals, Thanjavur offers a timeless journey into Tamil Nadu’s royal past and artistic soul.";

  const places = {
  "temples": [
    { "title": "Brihadeeswarar Temple", "city": "Thanjavur", "content": "UNESCO World Heritage Site built by Raja Raja Chola I with stunning Chola architecture." },
    { "title": "Gangaikonda Cholapuram Temple", "city": "Gangaikonda Cholapuram", "content": "Magnificent temple built by Rajendra Chola I, known for grand sculptures." },
    { "title": "Airavatesvara Temple", "city": "Darasuram", "content": "Famous for its intricate carvings and chariot-shaped mandapam." },
    { "title": "Sarangapani Temple", "city": "Kumbakonam", "content": "One of the Divya Desams dedicated to Lord Vishnu." },
    { "title": "Kumbeswarar Temple", "city": "Kumbakonam", "content": "Major Shiva temple and focal point of the Mahamaham festival." },
    { "title": "Swamimalai Murugan Temple", "city": "Swamimalai", "content": "One of the six abodes of Lord Muruga." },
    { "title": "Oppiliappan Temple", "city": "Thirunageswaram", "content": "Famous Vishnu temple where salt is never used in offerings." },
    { "title": "Ramaswamy Temple", "city": "Kumbakonam", "content": "Known for its Ramayana frescoes and detailed pillars." },
    { "title": "Chakkarapani Temple", "city": "Kumbakonam", "content": "Dedicated to Sudarshana Chakra form of Vishnu." },
    { "title": "Thirunageswaram Naganathaswamy Temple", "city": "Thirunageswaram", "content": "Raahu kala milk abhishekam turning blue is a miracle here." },
    { "title": "Patteeswaram Durgai Amman Temple", "city": "Patteeswaram", "content": "Goddess Durgai shrine famous for blessings of courage." },
    { "title": "Thingalur Chandran Temple", "city": "Thingalur", "content": "Navagraha temple dedicated to Moon God." },
    { "title": "Alangudi Guru Temple", "city": "Alangudi", "content": "Navagraha temple for Guru (Jupiter)." },
    { "title": "Thiruvaiyaru Panchanadeeswarar Temple", "city": "Thiruvaiyaru", "content": "Shiva temple famous for its annual music festival." },
    { "title": "Vedaranyeswarar Temple", "city": "Vedaranyam", "content": "Historic temple associated with Lord Rama’s worship." }
  ],
  "historic_sites": [
    { "title": "Thanjavur Maratha Palace", "city": "Thanjavur", "content": "Historic royal palace with art gallery and library." },
    { "title": "Saraswathi Mahal Library", "city": "Thanjavur", "content": "Ancient library housing rare manuscripts and palm-leaf texts." },
    { "title": "Art Gallery, Thanjavur", "city": "Thanjavur", "content": "Exhibits Chola bronze idols and Tanjore paintings." },
    { "title": "Manora Fort", "city": "Sethubhavachatram", "content": "Hexagonal fort tower built by Maratha ruler Serfoji II." },
    { "title": "Rajagopalaswamy Palace Ruins", "city": "Mannargudi", "content": "Remains of a grand Chola-period palace." },
    { "title": "Darasuram Heritage Streets", "city": "Darasuram", "content": "Ancient streets preserving temple-town culture." },
    { "title": "Kumbakonam Heritage Homes", "city": "Kumbakonam", "content": "Traditional Agraharam houses showcasing heritage architecture." },
    { "title": "Vennar Bridge", "city": "Thanjavur", "content": "Historic bridge built across the Vennar river." }
  ],
  "natural_spots": [
    { "title": "Vaduvur Bird Sanctuary", "city": "Vaduvur", "content": "Winter haven for migratory birds like pelicans and storks." },
    { "title": "Point Calimere Wildlife Sanctuary", "city": "Kodikkarai", "content": "Coastal sanctuary with wild horses, blackbucks, and flamingos." },
    { "title": "Muthupet Lagoon", "city": "Muthupet", "content": "Scenic mangrove forests perfect for boat rides." },
    { "title": "Grand Anicut (Kallanai)", "city": "Kallanai", "content": "Ancient dam built by Karikalan Chola still in use." },
    { "title": "Poompuhar Beach", "city": "Poompuhar", "content": "Historic seashore town with scenic sunrise views." },
    { "title": "Mannargudi Temple Tank", "city": "Mannargudi", "content": "Largest temple tank in Tamil Nadu." },
    { "title": "Sethubavachatram Coastline", "city": "Sethubavachatram", "content": "Quiet coastal stretch ideal for sunset walks." },
    { "title": "Agni Theertham", "city": "Kodikkarai", "content": "Sacred seashore spot for rituals." }
  ],
  "cultural_and_festivals": [
    { "title": "Thiruvaiyaru Thyagaraja Aradhana", "city": "Thiruvaiyaru", "content": "Annual Carnatic music festival honoring Saint Thyagaraja." },
    { "title": "Mahamaham Festival", "city": "Kumbakonam", "content": "Happens once every 12 years attracting millions of devotees." },
    { "title": "Navaratri at Brihadeeswarar Temple", "city": "Thanjavur", "content": "Nine nights of music, dance, and spiritual celebrations." },
    { "title": "Chariot Festival at Sarangapani Temple", "city": "Kumbakonam", "content": "Grand procession of the temple chariot." },
    { "title": "Swamimalai Panguni Uthiram", "city": "Swamimalai", "content": "Colorful festival dedicated to Lord Muruga." },
    { "title": "Patteeswaram Aadi Festival", "city": "Patteeswaram", "content": "Local goddess festival filled with cultural performances." },
    { "title": "Mannargudi Panguni Brahmotsavam", "city": "Mannargudi", "content": "Massive temple festival with folk dances and rituals." },
    { "title": "Kumbakonam Deepavali Celebrations", "city": "Kumbakonam", "content": "Known for grand temple lighting and sweets." }
  ],
  "scenic_nature": [
    { "title": "Kallanai River Viewpoint", "city": "Kallanai", "content": "Picturesque views of the ancient dam and flowing Cauvery." },
    { "title": "Muthupet Mangrove Boat Ride", "city": "Muthupet", "content": "Scenic ride through dense mangrove forest channels." },
    { "title": "Kodikkarai Lighthouse", "city": "Kodikkarai", "content": "Offers a panoramic view of the Bay of Bengal." },
    { "title": "Sethubavachatram Fishing Harbor", "city": "Sethubavachatram", "content": "Bustling fishing harbor with a rural charm." },
    { "title": "Vaduvur Lake", "city": "Vaduvur", "content": "Serene lake frequented by migratory birds." },
    { "title": "Mannargudi Green Fields", "city": "Mannargudi", "content": "Lush paddy landscapes showcasing Tamil Nadu’s agrarian beauty." },
    { "title": "Darasuram Village Scenery", "city": "Darasuram", "content": "Calm rural atmosphere with temple town charm." }
  ],
  "hidden_gems": [
    { "title": "Thanjavur Veena Workshop", "city": "Thanjavur", "content": "Traditional workshop where artisans craft the famous Thanjavur veena." },
    { "title": "Tanjore Painting Studios", "city": "Thanjavur", "content": "Experience making the famous gold-leaf paintings." },
    { "title": "Muthupet Hidden Beaches", "city": "Muthupet", "content": "Untouched coastal stretches away from crowds." },
    { "title": "Kodikkarai Salt Pans", "city": "Kodikkarai", "content": "Learn traditional salt-making processes." },
    { "title": "Kumbakonam Brassware Street", "city": "Kumbakonam", "content": "Street lined with traditional brassware artisans." },
    { "title": "Patteeswaram Village Pottery", "city": "Patteeswaram", "content": "See local potters at work using traditional methods." },
    { "title": "Darasuram Silk Weaving Units", "city": "Darasuram", "content": "Watch weavers create rich Kumbakonam silk sarees." },
    { "title": "Thiruvaiyaru River Ghats", "city": "Thiruvaiyaru", "content": "Serene ghats along the Cauvery River for meditation." }
  ]
}

  




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
          Top Attractions in  Thanjavur
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

export default  Thanjavur;
