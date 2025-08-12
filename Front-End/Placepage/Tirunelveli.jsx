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
function Tirunelveli() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Tirunelveli, one of Tamil Nadu’s oldest cities, is steeped in history, spirituality, and natural beauty. Famous for its Nellaiappar Temple, sprawling paddy fields, and the sweet Tirunelveli halwa, the city sits near the lush Western Ghats and is a gateway to waterfalls, dams, and wildlife sanctuaries. Known as the 'Halwa City,' it’s a blend of vibrant traditions, scenic landscapes, and warm hospitality that reflects the soul of southern Tamil Nadu.";

const places = {
  "temples": [
    { title: "Nellaiappar Temple", city: "Tirunelveli", content: "Ancient temple dedicated to Lord Shiva with massive gopurams and musical pillars." },
    { title: "Kanthimathi Amman Temple", city: "Tirunelveli", content: "Famous goddess temple adjacent to Nellaiappar Temple." },
    { title: "Sri Vaithya Lingam Swamy Temple", city: "Alangulam", content: "Known for healing powers and medicinal plants." },
    { title: "Sri Varadharaja Perumal Temple", city: "Palayamkottai", content: "Historic Vishnu temple with exquisite architecture." },
    { title: "Sri Rajagopalaswamy Temple", city: "Manur", content: "Temple dedicated to Lord Krishna with detailed sculptures." },
    { title: "Thirukkurungudi Temple", city: "Thirukkurungudi", content: "One of the 108 Divya Desams with beautiful Dravidian style." },
    { title: "Sri Sankaranarayana Swamy Temple", city: "Sankaran Kovil", content: "Famous for uniting Lord Shiva and Lord Vishnu in one idol." },
    { title: "Sri Krishnapuram Venkatachalapathy Temple", city: "Krishnapuram", content: "Known for intricate stone carvings and sculptures." },
    { title: "Sri Ramaswamy Temple", city: "Kallidaikurichi", content: "Temple dedicated to Lord Rama with heritage value." },
    { title: "Azhwar Thirunagari Temple", city: "Azhwar Thirunagari", content: "Birthplace of saint Nammalvar, an important Vaishnavite shrine." }
  ],
  "historic_sites": [
    { title: "Kattabomman Memorial Fort", city: "Panchalankurichi", content: "Memorial to freedom fighter Veerapandiya Kattabomman." },
    { title: "Cheranmahadevi Old Fort", city: "Cheranmahadevi", content: "Ruins of an ancient fort with historical significance." },
    { title: "Courtallam Palace", city: "Courtallam", content: "Historic summer palace of Travancore kings." },
    { title: "Korkai Archaeological Site", city: "Korkai", content: "Ancient port city remains dating back to the Pandya period." },
    { title: "Manjolai Tea Estate Bungalow", city: "Manjolai", content: "Colonial-era estate building in scenic hills." },
    { title: "Sankarankovil Fort Ruins", city: "Sankarankovil", content: "Remains of a strategic fortification in the region." }
  ],
  "natural_spots": [
    { title: "Courtallam Waterfalls", city: "Courtallam", content: "Popular waterfall known as the 'Spa of South India'." },
    { title: "Agasthiyar Falls", city: "Papanasam", content: "Sacred waterfall located near Papanasam Dam." },
    { title: "Manimuthar Dam & Falls", city: "Manimuthar", content: "Dam surrounded by forests with a serene waterfall." },
    { title: "Kadayam Village Mango Orchards", city: "Kadayam", content: "Lush mango farms famous for delicious varieties." },
    { title: "Papanasam Dam", city: "Papanasam", content: "Scenic dam amidst Western Ghats greenery." },
    { title: "Manjolai Hills", city: "Manjolai", content: "Cool hill station with tea plantations." },
    { title: "Kalakad Mundanthurai Tiger Reserve", city: "KMTR", content: "Biodiversity hotspot with trekking trails." },
    { title: "Shenbaga Devi Falls", city: "Courtallam", content: "Waterfall set in a forested region, accessible by trek." },
    { title: "Thalaiyanai Falls", city: "Manimuthar", content: "Hidden waterfall with pristine water." },
    { title: "Aintharuvi (Five Falls)", city: "Courtallam", content: "Five cascades of water in one location." }
  ],
  "cultural_and_festivals": [
    { title: "Courtallam Season Festival", city: "Courtallam", content: "Tourism festival with cultural programs near waterfalls." },
    { title: "Kanthimathi Amman Temple Car Festival", city: "Tirunelveli", content: "Annual chariot festival with huge participation." },
    { title: "Sankarankovil Aadi Thapasu Festival", city: "Sankarankovil", content: "Devotees gather to witness spiritual rituals." },
    { title: "Avani Avittam at Azhwar Thirunagari", city: "Azhwar Thirunagari", content: "Sacred thread changing ceremony with Vedic chants." },
    { title: "Pongal Celebration in Kadayam", city: "Kadayam", content: "Traditional harvest festival in rural backdrop." },
    { title: "Vasanthotsavam in Papanasam", city: "Papanasam", content: "Spring festival at temples with flower decorations." }
  ],
  "scenic_nature": [
    { title: "Kalakkad Hills", city: "Kalakad", content: "Green hills ideal for trekking and photography." },
    { title: "Tiger Falls", city: "Courtallam", content: "Small but scenic waterfall surrounded by greenery." },
    { title: "Upper Kodayar Reservoir", city: "Kodayar", content: "Hilltop dam with breathtaking views." },
    { title: "Servalar Dam", city: "Servalar", content: "Dam surrounded by forests and tea gardens." },
    { title: "Banatheertham Falls", city: "Papanasam", content: "Waterfall accessed by boat ride and trek." },
    { title: "Manjolai Viewpoint", city: "Manjolai", content: "Panoramic views of the tea estates and valleys." }
  ],
  "hidden_gems": [
    { title: "Vallanadu Blackbuck Sanctuary", city: "Vallanadu", content: "Protected area home to graceful blackbucks." },
    { title: "Kalakkad Bird Watching Point", city: "Kalakad", content: "Spot rare and migratory bird species." },
    { title: "Kadayam Handloom Village", city: "Kadayam", content: "Village famous for traditional weaving." },
    { title: "Keezhapavur Village Pottery", city: "Keezhapavur", content: "Pottery-making traditions passed down generations." },
    { title: "Manimuthar Forest Trek", city: "Manimuthar", content: "Guided treks into the reserve forest." },
    { title: "Papanasam Temple Tank", city: "Papanasam", content: "Historic temple tank with sacred water." },
    { title: "Cheranmahadevi Riverside Picnic Spot", city: "Cheranmahadevi", content: "Quiet riverbank ideal for relaxation." },
    { title: "Korkai Mangrove Forests", city: "Korkai", content: "Lesser-known mangrove ecosystem." },
    { title: "Sankarankovil Traditional Bull Racing", city: "Sankarankovil", content: "Village festival sport event." }
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
          Top Attractions in Tirunelveli
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

export default Tirunelveli;
