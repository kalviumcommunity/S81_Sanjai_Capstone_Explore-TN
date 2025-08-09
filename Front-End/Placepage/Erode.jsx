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
function Erode() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
  "Erode District, known for its turmeric and textiles, is a vibrant blend of riverside confluences, magnificent dams, sacred hill shrines, historic temples, wildlife havens, and rich cultural museums—offering a richly diverse experience for explorers.";


  const places = {
  "rivers_and_confluences": [
    { "title": "Bhavani Kuduthurai (Sangameshwarar Temple)", "city": "Bhavani", "content": "Confluence of the Cauvery, Bhavani and Amutha rivers—South’s Thriveni Sangamam." },
    { "title": "Kodumudi Magudeswarar Temple", "city": "Kodumudi", "content": "Temple with shrines for Brahma, Vishnu and Shiva on Cauvery’s bank." },
    { "title": "Bhavani Sangameshwarar Temple", "city": "Bhavani", "content": "Sacred temple at river confluence, site of Chithirai Car festival." },
    { "title": "Cauvery Riverbanks around Erode", "city": "Erode district", "content": "Scenic riverside spots ideal for peaceful day trips." },
    { "title": "Kodumanal Archaeological Site", "city": "Kodumanal", "content": "Ancient trade city with Roman-era beads and early steel technology." }
  ],
  "dams_and_reservoirs": [
    { "title": "Bhavanisagar Dam", "city": "Bhavanisagar", "content": "One of India’s largest earthen dams with parks and boating." },
    { "title": "Kodiveri Dam", "city": "near Gobichettipalayam", "content": "Scenic check dam with boating and natural surroundings." },
    { "title": "Kalingarayan Dam", "city": "Erode district", "content": "Historic irrigation structure with lush surroundings." },
    { "title": "Orathupalayam Dam", "city": "Orathupalayam", "content": "Popular local dam ideal for evening visits." },
    { "title": "Perumpallam Reservoir", "city": "Perumpallam", "content": "Quiet water body for peaceful getaways." }
  ],
  "bird_and_wildlife_spots": [
    { "title": "Vellode Bird Sanctuary", "city": "Vellode", "content": "Ramsar-listed wetland hosting thousands of migratory birds." },
    { "title": "Sathyamangalam Tiger Reserve", "city": "Sathyamangalam", "content": "Tiger habitat with jungles, safaris, elephants and leopards." },
    { "title": "Karadiyur Viewpoint", "city": "Karadiyur", "content": "Hill lookout with panoramic views of forest and Mettur Dam valley." },
    { "title": "Hasanur Wildlife Limits", "city": "Hasanur area", "content": "Fringe forest areas within Sathyamangalam ecosystem." },
    { "title": "Dhimbam Hills", "city": "Dhimbam", "content": "Hill zone offering scenic trekking opportunities." }
  ],
  "hill_and_murugan_temples": [
    { "title": "Thindal Murugan Temple", "city": "Thindal, Erode", "content": "Hilltop Lord Murugan temple with golden chariot and views." },
    { "title": "Chennimalai Murugan Temple", "city": "Chennimalai", "content": "Ancient temple atop a hill with 1320 steps and sculptures." },
    { "title": "Thavalagiri Murugan Temple", "city": "Thavalagiri", "content": "Hill Murugan temple known locally for spiritual ambiance." },
    { "title": "Sivanmalai Temple", "city": "Sivanmalai", "content": "Murugan hill shrine near Kangeyam celebrated by locals." },
    { "title": "Vattamalai Hill Shrines", "city": "Erode region", "content": "Smaller Murugan shrines nestled in green hillock settings." }
  ],
  "major_temples": [
    { "title": "Arudra Kabaliswarar Temple", "city": "Erode City", "content": "Shiva temple with sun-ray phenomenon and festive aura." },
    { "title": "Periya Mariamman Temple", "city": "Erode City", "content": "1,200-year-old Kongu Chola temple devoted to Goddess Mariamman." },
    { "title": "Pariyur Kondathu Kaliyamman Temple", "city": "Pariyur", "content": "Popular local shrine of the fierce Amman form." },
    { "title": "Parshwanath Jain Temple", "city": "Erode City", "content": "Historic Jain temple adding religious diversity." },
    { "title": "Arudra Kabaleeswarar Temple", "city": "Erode", "content": "Shiva worship site known for architectural serenity." }
  ],
  "cultural_and_religious_landmarks": [
    { "title": "CSI Brough Memorial Church", "city": "Erode", "content": "Colonial-era Indo-Saracenic church with elegant architecture." },
    { "title": "Government Museum, Erode", "city": "Erode", "content": "Museum of archaeology, manuscripts, geology, zoology, regional art." },
    { "title": "VOC Park", "city": "Erode", "content": "Public park and cultural gathering space." },
    { "title": "Periyar Anna Memorial", "city": "Erode", "content": "Commemorative space honoring the social reformer." },
    { "title": "Silk Weaving Houses", "city": "Erode", "content": "Live demonstration of weaving with textile purchases." }
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
          Top Attractions in Erode
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

export default Erode;
