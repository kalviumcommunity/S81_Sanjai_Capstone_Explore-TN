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
function Tenkasi() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Tenkasi, nestled at the foothills of the Western Ghats, is a treasure trove of natural beauty, spiritual heritage, and vibrant culture. Famous for its cascading waterfalls, ancient temples, and lush green hills, this district offers a perfect blend of serene landscapes and rich traditions. From the therapeutic Courtallam Falls to historic forts and lively festivals, Tenkasi invites travelers to experience the heart of Tamil Nadu’s wilderness and history in full bloom.";

  const places = {
  "temples": [
    { "title": "Courtallam Main Falls Temple", "city": "Courtallam", "content": "Ancient temple near the famous Courtallam waterfalls, dedicated to Lord Shiva." },
    { "title": "Shri Vettuvaan Temple", "city": "Tenkasi", "content": "Historic temple dedicated to Lord Shiva, known for its architecture and local festivals." },
    { "title": "Kasi Viswanathar Temple", "city": "Tenkasi", "content": "Ancient temple inspired by the famous Kashi temple, devoted to Lord Shiva." },
    { "title": "Chitra Sabhai Temple", "city": "Tenkasi", "content": "Part of the famous Sivasubramaniya temple complex with beautiful frescoes and sculptures." },
    { "title": "Pandya Kingdom Temples", "city": "Various", "content": "Several ancient temples built during the Pandya era, showcasing rich Tamil architecture." },
    { "title": "Mukkudal Murugan Temple", "city": "Mukkudal", "content": "Popular hilltop temple dedicated to Lord Murugan with panoramic views." },
    { "title": "Papanasam Kasi Viswanathar Temple", "city": "Papanasam", "content": "Sacred temple near the Papanasam hills, known for its spiritual ambiance." },
    { "title": "Ayyanar Temple", "city": "Tenkasi", "content": "Folk deity temple with traditional rural festivals." },
    { "title": "Ambalappuzha Amman Temple", "city": "Ambalappuzha", "content": "Famous for its vibrant annual Amman festival." },
    { "title": "Sivagiri Temple", "city": "Sivagiri", "content": "Ancient temple known for unique rituals and architecture." },
    { "title": "Kadavoor Sivan Temple", "city": "Kadavoor", "content": "Historic Shiva temple nestled in a serene setting." },
    { "title": "Kundal Kumaran Temple", "city": "Kundal", "content": "Ancient temple famous for its legends and festivals." },
    { "title": "Puliankurichi Mariamman Temple", "city": "Puliankurichi", "content": "Known for its grand Mariamman festival attracting devotees from afar." },
    { "title": "Thirumalapuram Murugan Temple", "city": "Thirumalapuram", "content": "Hill shrine dedicated to Lord Murugan with scenic surroundings." },
    { "title": "Keezhapavoor Mariamman Temple", "city": "Keezhapavoor", "content": "Traditional Amman temple with colorful yearly celebrations." }
  ],
  "waterfalls_and_nature": [
    { "title": "Courtallam Waterfalls", "city": "Courtallam", "content": "Known as the 'Spa of South India,' these waterfalls are famed for their therapeutic properties and scenic beauty." },
    { "title": "Manimuthar Waterfalls", "city": "Tenkasi", "content": "A breathtaking waterfall located amidst dense forests, ideal for nature lovers." },
    { "title": "Agasthiyar Falls", "city": "Tenkasi", "content": "Serene waterfall named after the sage Agasthiyar, located in a tranquil forest setting." },
    { "title": "Thenaruvi Falls", "city": "Tenkasi", "content": "A hidden gem waterfall that’s less crowded and perfect for a peaceful visit." },
    { "title": "Kaigal Falls", "city": "Tenkasi", "content": "A lesser-known waterfall, popular among local trekkers." },
    { "title": "Papanasam Hills", "city": "Papanasam", "content": "Sacred hills with multiple trekking trails and nature spots." },
    { "title": "Mukkadal Hills", "city": "Mukkadal", "content": "Hilly terrain ideal for trekking and panoramic views." },
    { "title": "Chittar River Valley", "city": "Tenkasi", "content": "Beautiful river valley with lush greenery and picnic spots." },
    { "title": "Kundru Hills", "city": "Tenkasi", "content": "Peaceful hill area with scenic vistas and fresh air." },
    { "title": "Kundaru Lake", "city": "Tenkasi", "content": "Tranquil lake attracting migratory birds and locals." },
    { "title": "Courtallam Butterfly Park", "city": "Courtallam", "content": "A sanctuary for butterflies with well-maintained trails." },
    { "title": "Agasthiyar Tiger Reserve", "city": "Tenkasi", "content": "Protected forest area rich in wildlife and biodiversity." },
    { "title": "Kollakadu Forest", "city": "Tenkasi", "content": "Dense forest popular with trekkers and nature enthusiasts." },
    { "title": "Vandiperiyar Wetlands", "city": "Nearby", "content": "Wetlands supporting diverse bird species, ideal for birdwatching." }
  ],
  "historic_sites": [
    { "title": "Tenkasi Fort", "city": "Tenkasi", "content": "A majestic fort built by the Nayaks in the 17th century, standing as a symbol of the region’s heritage." },
    { "title": "Sivasubramaniya Swamy Temple", "city": "Tenkasi", "content": "Ancient temple complex known for its artistic architecture and spiritual significance." },
    { "title": "Pandyan Palace Ruins", "city": "Tenkasi outskirts", "content": "Remnants of a grand palace from the Pandya dynasty offering historical insights." },
    { "title": "Kalakad Fort", "city": "Kalakad", "content": "Ruins of a medieval fort with strategic views of the Western Ghats." },
    { "title": "Kundru Rock Fort", "city": "Tenkasi", "content": "Ancient rock fortification with panoramic views of the surrounding area." },
    { "title": "Azhagar Hills Ancient Pathways", "city": "Tenkasi", "content": "Historic trails once used for trade and pilgrimages." },
    { "title": "Vettuvan Koil Rock-Cut Temple", "city": "Tenkasi", "content": "Historic rock-cut temple known for its intricate carvings." }
  ],
  "cultural_and_festivals": [
    { "title": "Courtallam Festival", "city": "Courtallam", "content": "Annual festival celebrating the waterfalls and local traditions with vibrant cultural programs." },
    { "title": "Tenkasi Temple Festival", "city": "Tenkasi", "content": "Colorful religious events with processions, music, and dance dedicated to local deities." },
    { "title": "Agasthiyar Muni Festival", "city": "Tenkasi", "content": "Spiritual festival honoring sage Agasthiyar with traditional rituals." },
    { "title": "Maruthanad Festival", "city": "Tenkasi", "content": "A vibrant local festival celebrating folk culture and traditions." },
    { "title": "Murugan Kavadi Festival", "city": "Various", "content": "Devotees carry Kavadi in a colorful procession honoring Lord Murugan." }
  ],
  "scenic_nature": [
    { "title": "Western Ghats Views", "city": "Tenkasi", "content": "Rolling hills and lush landscapes offering trekking and panoramic views." },
    { "title": "Manimuthar Dam and Reservoir", "city": "Tenkasi", "content": "Scenic dam surrounded by forests, ideal for picnics and birdwatching." },
    { "title": "Thirumalapuram Viewpoint", "city": "Thirumalapuram", "content": "Hilltop viewpoint offering stunning sunrise and sunset vistas." },
    { "title": "Kalakkad Wildlife Sanctuary", "city": "Kalakkad", "content": "Protected forest area home to diverse flora and fauna." },
    { "title": "Vettaikaranpatti Hills", "city": "Vettaikaranpatti", "content": "Hilly region with trails and scenic outlooks." },
    { "title": "Sivagiri Hills", "city": "Sivagiri", "content": "Peaceful hills popular among trekkers and pilgrims." }
  ],
  "hidden_gems": [
    { "title": "Vandiperiyar Tea Gardens", "city": "Nearby", "content": "Lush tea plantations offering peaceful walks and scenic beauty." },
    { "title": "Kundru Waterfalls", "city": "Tenkasi", "content": "Secluded waterfall off the beaten path." },
    { "title": "Puliankurichi Village", "city": "Tenkasi", "content": "Traditional village known for handloom weaving and folk arts." },
    { "title": "Manimuthar Butterfly Trails", "city": "Tenkasi", "content": "Nature trails famous for diverse butterfly species." },
    { "title": "Thirumalapuram Sacred Grove", "city": "Thirumalapuram", "content": "Ancient sacred grove preserving rare flora." },
    { "title": "Kadavoor Rural Museum", "city": "Kadavoor", "content": "Small museum showcasing rural artifacts and traditions." },
    { "title": "Ayyanar Folk Dance Village", "city": "Tenkasi outskirts", "content": "Village known for preserving traditional folk dances." },
    { "title": "Courtallam Spice Gardens", "city": "Courtallam", "content": "Local spice farms with tours and authentic flavors." },
    { "title": "Kalakad Tribal Village", "city": "Kalakad", "content": "Cultural village preserving tribal heritage and crafts." },
    { "title": "Papanasam Natural Springs", "city": "Papanasam", "content": "Natural springs known for their purity and healing qualities." }
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
          Top Attractions in Tenkasi
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

export default Tenkasi;
