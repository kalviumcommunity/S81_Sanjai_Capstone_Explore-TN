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
function Cuddalore() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
  "Cuddalore District on Tamil Nadu’s Coromandel coast offers a varied palette of attractions—from sacred temples and mangrove wilderness to colonial forts, serene beaches, fossil museums, and powerful spiritual centers—inviting travellers to delve into its rich cultural and natural heritage.";


  const places = {
  "sacred_temple_sites": [
    { "title": "Thillai Nataraja Temple", "city": "Chidambaram", "content": "Ancient Chola shrine to Shiva as Cosmic Dancer, with five iconic Sabhas." },
    { "title": "Thillai Kali Temple", "city": "Chidambaram", "content": "Durga shrine in Chidambaram town, complementary to Nataraja Temple." },
    { "title": "Padaleeswarar Temple", "city": "Thirupathiripuliyur (Cuddalore)", "content": "Pallava-Chola Shiva temple where saint Appar embraced Shaivism." },
    { "title": "Devanathaswamy Temple", "city": "Thiruvanthipuram", "content": "Divya Desam Vaishnavite temple famed for its hill shrine and sacred springs." },
    { "title": "Veeratteswarar Temple", "city": "Thiruvadhigai (Panrutti)", "content": "Shiva temple noted for its sculpted 108 dance postures on the walls." },
    { "title": "Bhu Varaha Swamy Temple", "city": "Srimushnam", "content": "Self-manifested Varaha shrine with chariot-style mandapam." }
  ],
  "mangroves_water_bodies": [
    { "title": "Pichavaram Mangrove Forest", "city": "Pichavaram", "content": "World’s second-largest mangrove ecosystem offering kayaking and birding." },
    { "title": "Veeranam Lake", "city": "Kattumannarkoil", "content": "Chola-era reservoir that now supplies Chennai and attracts birdwatchers." },
    { "title": "Samiyarpettai Beach", "city": "Samiyarpettai", "content": "Tranquil coastal village with peaceful beach vibes." },
    { "title": "Silver Beach", "city": "Cuddalore (Devanampattinam)", "content": "One of Asia’s longest beaches, calm, historic, and family-friendly." },
    { "title": "Devanampattinam Beach", "city": "Devanampattinam", "content": "Untouched, serene stretch—perfect for solitude and quiet walks." }
  ],
  "colonial_and_historic_forts": [
    { "title": "Fort St. David", "city": "Cuddalore", "content": "Ruined 18th-century British fort overlooking the sea and Gadilam River." },
    { "title": "Cuddalore Port", "city": "Cuddalore", "content": "Historic anchorage at the confluence of Uppanar and Paravanar rivers." },
    { "title": "Portonovo Lighthouse", "city": "Parangipettai", "content": "1980s lighthouse and NAVTEX station aiding coastal navigation." },
    { "title": "Cuddalore Municipal Park", "city": "Cuddalore", "content": "Green urban park for family strolls and relaxation." },
    { "title": "Cuddalore Government Museum", "city": "Cuddalore", "content": "Showcases fossils, tribal artifacts, sculptures and local natural history." }
  ],
  "spiritual_and_pilgrimage_sites": [
    { "title": "Sathyagnana Sabha", "city": "Vadalur", "content": "Octagonal spiritual hall by Saint Ramalinga Adigal, revealing divine light on Thai Poosam." },
    { "title": "Neyveli Lignite Mines", "city": "Neyveli", "content": "Industrial landmark showing lignite mining and power-plant region." },
    { "title": "Sri Raghavendra Swami’s Birthplace", "city": "Bhuvanagiri", "content": "Birthplace of the prominent Hindu saint and philosopher." },
    { "title": "Melakadambur Amirthakadeswarar Temple", "city": "Melakadambur", "content": "Historic Shiva temple known for its ornate carvings." },
    { "title": "Nellikuppam", "city": "Nellikuppam", "content": "Small industrial town, culturally noteworthy for local mills." }
  ],
  "fossil_and_geology_sites": [
    { "title": "Tiruvakarai Fossil Wood Park", "city": "Tiruvakarai", "content": "Geological park with 20-million-year-old petrified tree trunks and temple." },
    { "title": "Cuddalore Government Museum (Fossils)", "city": "Cuddalore", "content": "Displays ammonite and wood fossils from the region." },
    { "title": "Marine Biology Centre", "city": "Parangipettai", "content": "Research centre for marine sciences tied to Annamalai University." },
    { "title": "Kattumannarkoil Surrounds", "city": "Kattumannarkoil", "content": "Rural area near the Veeranam Lake reservoir with bird habitat." },
    { "title": "Villages near Pulangudi", "city": "Cuddalore Taluk", "content": "Small settlements with local natural heritage and shrines." }
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
          Top Attractions in Cuddalore
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

export default Cuddalore;
