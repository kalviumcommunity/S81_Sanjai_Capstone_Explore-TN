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
function Tiruchirappalli() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Tiruchirappalli, fondly called Trichy, sits on the banks of the River Cauvery and blends ancient heritage with modern vibrancy. Known for the iconic Rockfort Temple perched atop a massive rock, the city also boasts the grandeur of Sri Ranganathaswamy Temple at Srirangam — one of the largest temple complexes in the world. Trichy’s streets hum with academic energy from its renowned institutions, while its cultural festivals, bustling markets, and rich Dravidian architecture make it a living canvas of Tamil Nadu’s history and traditions.";

;

const places = {
  "temples": [
    { "title": "Sri Ranganathaswamy Temple", "city": "Srirangam", "content": "Largest functioning Hindu temple complex in the world, dedicated to Lord Vishnu." },
    { "title": "Ucchi Pillayar Temple", "city": "Rockfort", "content": "Famous Ganesh temple atop a massive rock with panoramic views of Trichy." },
    { "title": "Jambukeswarar Temple", "city": "Thiruvanaikaval", "content": "One of the Pancha Bhoota Sthalas representing water." },
    { "title": "Samayapuram Mariamman Temple", "city": "Samayapuram", "content": "Renowned temple dedicated to Goddess Mariamman attracting millions of devotees." },
    { "title": "Vayalur Murugan Temple", "city": "Vayalur", "content": "Serene Murugan shrine surrounded by lush greenery." },
    { "title": "Thiruvellarai Pundarikakshan Temple", "city": "Thiruvellarai", "content": "Ancient Vishnu temple with unique architecture predating Srirangam." },
    { "title": "Erumbeeswarar Temple", "city": "Thiruverumbur", "content": "Shiva temple located atop a small hill, offering scenic views." },
    { "title": "Viralimalai Murugan Temple", "city": "Viralimalai", "content": "Hilltop Murugan shrine known for peacocks and peaceful surroundings." },
    { "title": "Kudumiyanmalai Temple", "city": "Kudumiyanmalai", "content": "Famous for its rock-cut music inscriptions." },
    { "title": "Pachamalai Hills Temples", "city": "Pachamalai", "content": "Small temples scattered in the Pachamalai hills region." }
  ],
  "historic_sites": [
    { "title": "Rockfort", "city": "Trichy", "content": "Iconic fort complex with ancient temples carved into the rock." },
    { "title": "Kallanai Dam", "city": "Grand Anicut", "content": "2,000-year-old dam built by the Cholas, still in use." },
    { "title": "Puliancholai", "city": "Puliancholai", "content": "Historic forest foothills with Chola-era significance." },
    { "title": "Mukkombu", "city": "Upper Anaicut", "content": "19th-century dam and picnic spot." },
    { "title": "St. John's Church", "city": "Trichy", "content": "One of the oldest churches built during British rule." },
    { "title": "Nadirsha Dargah", "city": "Trichy", "content": "Historic Islamic shrine attracting pilgrims." },
    { "title": "Government Museum", "city": "Trichy", "content": "Museum showcasing Chola bronzes and local history." },
    { "title": "Viralimalai Sanctuary", "city": "Viralimalai", "content": "Historic habitat for peacocks and protected wildlife." }
  ],
  "natural_spots": [
    { "title": "Puliancholai Waterfalls", "city": "Puliancholai", "content": "Refreshing waterfalls in the Eastern Ghats foothills." },
    { "title": "Pachamalai Hills", "city": "Pachamalai", "content": "Green hills ideal for trekking and nature walks." },
    { "title": "Mukkombu Picnic Spot", "city": "Upper Anaicut", "content": "Leisure area by the Kaveri river." },
    { "title": "Kallanai River Banks", "city": "Grand Anicut", "content": "Scenic river banks perfect for sunset views." },
    { "title": "Kudamurutti River", "city": "Trichy outskirts", "content": "Calm river branch offering peaceful spots." }
  ],
  "cultural_and_festivals": [
    { "title": "Panguni Uthiram Festival", "city": "Srirangam", "content": "Grand celebration in honor of Lord Ranganatha." },
    { "title": "Samayapuram Chithirai Festival", "city": "Samayapuram", "content": "Massive annual festival attracting lakhs of devotees." },
    { "title": "Aadi Perukku", "city": "Kaveri Banks", "content": "Celebration of the river's life-giving power." },
    { "title": "Viralimalai Ther Thiruvizha", "city": "Viralimalai", "content": "Chariot festival with folk music and dance." },
    { "title": "Kudumiyanmalai Temple Festival", "city": "Kudumiyanmalai", "content": "Temple rituals and cultural programs." }
  ],
  "scenic_nature": [
    { "title": "Puliancholai Forest Trails", "city": "Puliancholai", "content": "Lush trails perfect for birdwatching." },
    { "title": "Pachamalai Sunrise Point", "city": "Pachamalai", "content": "Hilltop view of the sunrise over green valleys." },
    { "title": "Kallanai Dam Viewpoint", "city": "Grand Anicut", "content": "Picturesque views of the Kaveri river." },
    { "title": "Viralimalai Hill Views", "city": "Viralimalai", "content": "Panoramic countryside vistas." },
    { "title": "Kaveri River Island Spots", "city": "Srirangam", "content": "Small river islands for a peaceful escape." }
  ],
  "hidden_gems": [
    { "title": "Thirupainjeeli Temple", "city": "Thirupainjeeli", "content": "Lesser-known Vishnu temple with intricate carvings." },
    { "title": "Maruvathur Temple Ruins", "city": "Maruvathur", "content": "Ancient temple ruins hidden in the countryside." },
    { "title": "Thirunedungalam Temple", "city": "Thirunedungalam", "content": "Small temple with unique local traditions." },
    { "title": "Pachamalai Tribal Villages", "city": "Pachamalai", "content": "Experience traditional tribal culture and lifestyle." },
    { "title": "Viralimalai Peacock Sanctuary", "city": "Viralimalai", "content": "Hidden natural habitat for peacocks." },
    { "title": "Srirangam Cauvery Backwaters", "city": "Srirangam", "content": "Quiet spots ideal for photography and relaxation." },
    { "title": "Kudumiyanmalai Music Inscriptions", "city": "Kudumiyanmalai", "content": "Rare rock inscriptions with musical notes." }
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
          Top Attractions in Tiruchirappalli
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

export default Tiruchirappalli;
