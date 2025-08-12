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
function Karur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Karur, an ancient district in Tamil Nadu and former capital of the Chera dynasty, blends rich heritage with modern textile industry. Known for its grand temples, serene riverbanks, archaeological treasures, and spiritual sanctuaries, Karur also offers hidden natural retreats in the Western Ghats foothills.";

  const places = {
    "temples": [
      { "title": "Pasupateeswarar Temple", "city": "Karur", "content": "Ancient Shiva temple with rich Chola inscriptions." },
      { "title": "Kalyana Venkataramana Swamy Temple", "city": "Thanthonimalai", "content": "Famed as 'South Tirupati', dedicated to Lord Vishnu." },
      { "title": "Mariamman Temple", "city": "Karur", "content": "Central temple known for the vibrant Kumbam festival." },
      { "title": "Vennaimalai Murugan Temple", "city": "Vennaimalai", "content": "Murugan temple atop a hill with scenic views." },
      { "title": "Thiruvithuvakodu Temple", "city": "Karur", "content": "Historic Vishnu temple with intricate sculptures." },
      { "title": "Agatheeswarar Temple", "city": "Thirumukkudalur", "content": "Ruined Chola-era Shiva temple at a river confluence." },
      { "title": "Shri Karuvur Mariamman Temple", "city": "Karur", "content": "Local Amman temple attracting devotees year-round." }
    ],
    "dams_and_lakes": [
      { "title": "Mayanur Barrage", "city": "Mayanur", "content": "Picturesque barrage across the Cauvery, ideal for picnics." },
      { "title": "Ponnaniyar Dam", "city": "Kadavoor Hills", "content": "Serene dam set against the Semmalai Hills." },
      { "title": "Vangal Barrage", "city": "Vangal", "content": "Calm riverside spot with views of the Cauvery." },
      { "title": "Pugazhimalai Dam", "city": "Pugazhimalai", "content": "Small dam surrounded by paddy fields." },
      { "title": "Panampatti Lake", "city": "Panampatti", "content": "Scenic lake with birdlife, perfect for quiet evenings." }
    ],
    "historical_sites": [
      { "title": "Karur Fort Ruins", "city": "Karur", "content": "Remnants of an ancient fort from Chera times." },
      { "title": "Rathnagiri Fort", "city": "Rathnagiri", "content": "Historic fort site with panoramic views." },
      { "title": "Noyyal River Archaeological Site", "city": "Near Karur", "content": "Location of Roman coins and ancient trade relics." },
      { "title": "Govt. Museum Archaeological Section", "city": "Karur", "content": "Displays excavated artifacts from Karur’s past." },
      { "title": "Pugalur Rock Inscriptions", "city": "Pugalur", "content": "Ancient Tamil-Brahmi inscriptions carved on rocks." }
    ],
    "natural_spots": [
      { "title": "Pugazhimalai Hill", "city": "Pugazhimalai", "content": "Hilltop temple and trekking spot." },
      { "title": "Kadavur Hills", "city": "Kadavur", "content": "Foothills offering scenic trails and fresh air." },
      { "title": "Vangal Riverside", "city": "Vangal", "content": "Peaceful riverbank for evening walks." },
      { "title": "Thanthonimalai Hill", "city": "Thanthonimalai", "content": "Small hill with a temple and panoramic views." },
      { "title": "Sengal Malai", "city": "Sengal Malai", "content": "Popular for nature walks and panoramic views." }
    ],
    "museums": [
      { "title": "Government Museum, Karur", "city": "Karur", "content": "Showcases archaeology, geology, and anthropology." },
      { "title": "Heritage Textile Museum", "city": "Karur", "content": "Exhibits the evolution of Karur’s textile heritage." },
      { "title": "Handloom Heritage Display", "city": "Karur", "content": "Small collection on local weaving traditions." },
      { "title": "Local Archaeological Mini Museum", "city": "Pugalur", "content": "Small museum near inscription site." },
      { "title": "Temple Artifacts Display", "city": "Karur", "content": "Collection of bronze idols and stone sculptures." }
    ],
    "parks_and_gardens": [
      { "title": "Mayanur Barrage Park", "city": "Mayanur", "content": "Well-maintained park beside the Cauvery." },
      { "title": "Karur Municipal Park", "city": "Karur", "content": "Green space in the heart of the city." },
      { "title": "Thanthonimalai Park", "city": "Thanthonimalai", "content": "Family-friendly park near the temple." },
      { "title": "Vangal Riverside Garden", "city": "Vangal", "content": "Small garden with river views." },
      { "title": "Children’s Park Karur", "city": "Karur", "content": "Play area for kids and leisure space for families." }
    ],
    "viewpoints": [
      { "title": "Pugazhimalai Viewpoint", "city": "Pugazhimalai", "content": "Offers expansive views of fields and rivers." },
      { "title": "Kadavur Hill Viewpoint", "city": "Kadavur", "content": "Viewpoint over valleys and distant hills." },
      { "title": "Mayanur Cauvery View", "city": "Mayanur", "content": "Scenic view of the river from the barrage." },
      { "title": "Vennaimalai Hilltop View", "city": "Vennaimalai", "content": "Sweeping view of Karur from temple steps." },
      { "title": "Sengal Malai Peak View", "city": "Sengal Malai", "content": "A panoramic lookout point in nature." }
    ],
    "other_spots": [
      { "title": "Karur Textile Showrooms", "city": "Karur", "content": "Famous for bed linens, towels, and home textiles." },
      { "title": "Weekly Shandy Market", "city": "Karur", "content": "Traditional open-air market selling fresh produce." },
      { "title": "Pugalur Sugar Factory Tour", "city": "Pugalur", "content": "Educational tour of sugar manufacturing." },
      { "title": "Handloom Weaving Villages", "city": "Karur Rural", "content": "Visit weaver homes to see the process firsthand." },
      { "title": "Cauvery Bank Walk", "city": "Karur", "content": "Evening stroll along the riverside." }
    ],
    "hidden_gems": [
      { "title": "Vangal Hidden Ghat", "city": "Vangal", "content": "Quiet river bathing spot known only to locals." },
      { "title": "Ponnaniyar Dam Backwaters", "city": "Kadavoor Hills", "content": "Isolated backwater stretch perfect for solitude." },
      { "title": "Sengal Malai Sunrise Point", "city": "Sengal Malai", "content": "Less crowded sunrise location with breathtaking colors." },
      { "title": "Rural Temple Trails", "city": "Karur Villages", "content": "Cluster of small heritage temples off the main roads." },
      { "title": "Thanthonimalai Hill Forest Patch", "city": "Thanthonimalai", "content": "Mini forest area ideal for bird watching." }
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
          Top Attractions in Karur
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

export default Karur;
