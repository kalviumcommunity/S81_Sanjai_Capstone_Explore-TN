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
function Mayiladuthurai() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Mayiladuthurai—‘The Peacock Town’ of Tamil Nadu—is steeped in ancient heritage, vibrant temple circuits, and coastal charm. It thrives on fertile Cauvery delta plains, weaving traditions of weaving, dry-fish trade, and classical pilgrimage through a rich cultural tapestry.";

  const places = {
    "temples": [
      { "title": "Mayuranathaswami Temple", "city": "Mayiladuthurai", "content": "Ancient Shiva temple tied to the town’s legend as ‘Peacock Town’." },
      { "title": "Parimala Ranganatha Perumal Temple", "city": "Mayiladuthurai", "content": "A revered Vishnu Divya Desam on Cauvery’s banks." },
      { "title": "Vaitheeswaran Koil", "city": "Vaitheeswaran Koil", "content": "Navagraha shrine dedicated to Mars, known for healing." },
      { "title": "Swetharanyeswarar Temple", "city": "Thiruvenkadu", "content": "Ancient Shiva Paadal Petra Sthalam and Budha Navagraha site." },
      { "title": "Mahalingeswarar Temple", "city": "Thiruvidaimaruthur", "content": "Elaborate temple with multiple sacred tanks and Dravidian architecture." },
      { "title": "Mahalakshmeeswarar Temple", "city": "Tirunindriyur", "content": "1,000–2,000-year-old Shiva temple praised in hymns by Nayanmars." },
      { "title": "Vazhuvur Veerateeswarar Temple", "city": "Vazhuvur", "content": "Chola-era temple, one of the eight Veeratanam shrines of Shiva." }
    ],
    "coastal_and_historic": [
      { "title": "Poompuhar (Kaveripoompattinam)", "city": "Poompuhar", "content": "Ancient port town of Chola empire, featured in Sangam literature." },
      { "title": "Poompuhar Beach", "city": "Poompuhar", "content": "Coastal stretch near Silapathikaram museum, serene and historic." },
      { "title": "Mangaimadam Beach", "city": "near Poompuhar", "content": "Quiet, offbeat beach for solitude and sunsets." },
      { "title": "Tharangambadi (Tranquebar)", "city": "Tharangambadi", "content": "Historic Danish Fort and colonial coastal town nearby." }
    ],
    "rituals_and_festivals": [
      { "title": "Thula Utsavam", "city": "Mayiladuthurai", "content": "Month-long Cauvery ritual analogous to the Kumbh, held in Aippasi." },
      { "title": "Aippasi Kadaimugam Festival", "city": "Mayiladuthurai", "content": "Grand chariot festivals and holy dips marking river confluence." }
    ],
    "cultural_economy": [
      { "title": "Koorainadu Sari Weaving", "city": "Mayiladuthurai", "content": "Traditional checked silk-cotton sarees unique to the region." },
      { "title": "Karuvattu Dry Fish Market", "city": "Mayiladuthurai", "content": "One of India’s oldest, vibrant hubs for dried seafood trade." }
    ],
    "archaeology_and_heritage": [
      { "title": "Neolithic Excavation Sites", "city": "Sembiyankandiyur area", "content": "Archaeological finds with Harappan-style Indus script artifacts." },
      { "title": "Kambar Mani Mandapam", "city": "Mayiladuthurai", "content": "Memorial honoring the Tamil poet Kambar, a local literary icon." },
      { "title": "Thillaiyadi Valliammai Memorial", "city": "Mayiladuthurai", "content": "Commemorates Gandhi companion Valliammai, symbol of valor." }
    ],
    "hidden_gems": [
      { "title": "Mangaimadam Beach", "city": "near Poompuhar", "content": "Secluded offroad beach—peaceful and rarely crowded." },
      { "title": "Vazhuvur Veerateeswarar Temple", "city": "Vazhuvur", "content": "Less-visited Veeratanam shrine with ancient legend." },
      { "title": "Tirunindriyur Temple", "city": "Tirunindriyur", "content": "Quiet, historic temple known for Nayanmar hymns." },
      { "title": "Sembiyankandiyur Excavation Area", "city": "Sembiyankandiyur region", "content": "Interest for history buffs in Indus-script relics." }
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
          Top Attractions in Mayiladuthurai
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

export default Mayiladuthurai;
