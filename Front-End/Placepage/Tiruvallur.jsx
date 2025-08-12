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
function Tiruvallur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription = "Tiruvallur, located on the outskirts of Chennai in Tamil Nadu, blends rich heritage with modern growth. Known for the ancient Veeraraghava Perumal Temple and serene lakes, the district also offers scenic countryside, bustling markets, and thriving industries. It serves as a gateway between metropolitan Chennai and the cultural towns of northern Tamil Nadu, making it a hub for both business and pilgrimage.";

const places = {
  "temples": [
    { title: "Veeraraghava Perumal Temple", city: "Tiruvallur", content: "One of the 108 Divya Desams, dedicated to Lord Vishnu." },
    { title: "Poondi Madha Basilica", city: "Poondi", content: "Famous Catholic church attracting devotees from across South India." },
    { title: "Poonamallee Siva Temple", city: "Poonamallee", content: "Historic Shiva temple with intricate carvings." },
    { title: "Thiruvalangadu Vadaranyeswarar Temple", city: "Thiruvalangadu", content: "One of the 5 cosmic dance halls of Lord Shiva." },
    { title: "Thiruninravur Bhaktavatsala Perumal Temple", city: "Thiruninravur", content: "Ancient Vishnu temple with Dravidian architecture." },
    { title: "Nemili Bala Murugan Temple", city: "Nemili", content: "Dedicated to Lord Murugan, known for peaceful surroundings." },
    { title: "Tiruverkadu Devi Karumariamman Temple", city: "Tiruverkadu", content: "Popular temple for goddess worship." },
    { title: "Kailasanathar Temple", city: "Sriperumbudur", content: "Historic Shiva temple with Pallava architecture." },
    { title: "Othandeeswarar Temple", city: "Thirumazhisai", content: "Ancient temple mentioned in inscriptions." },
    { title: "Sri Subramaniya Swamy Temple", city: "Pattabiram", content: "Local Murugan temple with vibrant festivals." },
    { title: "Tirumala Raja Gopalaswamy Temple", city: "Uthukottai", content: "Unique temple with centuries of history." },
    { title: "Arulmigu Kamakshi Amman Temple", city: "Poonamallee", content: "Dedicated to Goddess Kamakshi." }
  ],
  "historic_sites": [
    { title: "Thiruvalangadu Copper Plates", city: "Thiruvalangadu", content: "Historic Chola inscriptions found here." },
    { title: "Sriperumbudur Rajagopuram", city: "Sriperumbudur", content: "Grand temple tower with intricate sculptures." },
    { title: "Thirumazhisai Old Town", city: "Thirumazhisai", content: "Heritage streets and ancient temples." },
    { title: "Periyar Eri Bund", city: "Tiruvallur", content: "Historic water storage structure." },
    { title: "Poonamallee Fort Remains", city: "Poonamallee", content: "Remnants of old fortifications from the Nayak era." },
    { title: "Thiruninravur Heritage Tank", city: "Thiruninravur", content: "Old temple tank linked to legends." },
    { title: "Sriperumbudur Rajiv Gandhi Memorial", city: "Sriperumbudur", content: "National memorial honoring India's late Prime Minister." },
    { title: "Uthukottai Palace Ruins", city: "Uthukottai", content: "Small ruins of regional rulers' palace." },
    { title: "Nemili Heritage Village", city: "Nemili", content: "Village with preserved old architecture." }
  ],
  "natural_spots": [
    { title: "Poondi Reservoir", city: "Poondi", content: "Massive reservoir supplying water to Chennai." },
    { title: "Puzhal Lake", city: "Puzhal", content: "Scenic freshwater lake popular for walks." },
    { title: "Thamaraipakkam Barrage", city: "Thamaraipakkam", content: "Engineering marvel with river views." },
    { title: "Chembarambakkam Lake", city: "Chembarambakkam", content: "Large lake with migratory birds." },
    { title: "Korattur Lake", city: "Korattur", content: "Peaceful lake with jogging paths." },
    { title: "Thirumullaivoyal Green Fields", city: "Thirumullaivoyal", content: "Countryside farmland landscapes." },
    { title: "Tiruttani Hills", city: "Tiruttani", content: "Hill temple surroundings with greenery." },
    { title: "Cooum Riverside Path", city: "Tiruvallur", content: "Quiet riverbank trail for evening walks." },
    { title: "Manavur Wetlands", city: "Manavur", content: "Lush wetland ecosystem for birdwatching." }
  ],
  "cultural_and_festivals": [
    { title: "Veeraraghava Perumal Temple Car Festival", city: "Tiruvallur", content: "Annual chariot procession drawing thousands." },
    { title: "Tiruttani Karthigai Festival", city: "Tiruttani", content: "Grand celebration in Murugan's temple." },
    { title: "Thiruvalangadu Aadi Festival", city: "Thiruvalangadu", content: "Month-long festivities with music and dance." },
    { title: "Nemili Panguni Uthiram", city: "Nemili", content: "Temple festival with traditional rituals." },
    { title: "Sriperumbudur Temple Brahmotsavam", city: "Sriperumbudur", content: "Colorful annual celebration." },
    { title: "Vinayagar Chaturthi Processions", city: "Poonamallee", content: "Street parades with decorated idols." },
    { title: "Deepavali Night Bazaar", city: "Tiruvallur", content: "Markets open late selling festive goods." },
    { title: "Poondi Madha Feast", city: "Poondi", content: "Christian feast drawing devotees of all faiths." }
  ],
  "scenic_nature": [
    { title: "Tiruttani Hills Viewpoint", city: "Tiruttani", content: "Panoramic views of surrounding plains." },
    { title: "Ponneri Countryside", city: "Ponneri", content: "Rural charm with paddy fields and ponds." },
    { title: "Chembarambakkam Lake Viewpoint", city: "Chembarambakkam", content: "Beautiful sunset point." },
    { title: "Poondi Dam Park", city: "Poondi", content: "Green park beside the reservoir." },
    { title: "Thamaraipakkam Canal Walk", city: "Thamaraipakkam", content: "Shaded pathway along irrigation canals." },
    { title: "Puzhal Lake Birdwatching Zone", city: "Puzhal", content: "Migratory bird spotting area." },
    { title: "Manavur Paddy Fields", city: "Manavur", content: "Scenic green fields during harvest season." },
    { title: "Sriperumbudur Lakefront", city: "Sriperumbudur", content: "Small lake with peaceful ambiance." }
  ],
  "hidden_gems": [
    { title: "Manavur Chola Temple Ruins", city: "Manavur", content: "Undiscovered heritage site from the Chola period." },
    { title: "Perambakkam Village Temples", city: "Perambakkam", content: "Cluster of old, lesser-known temples." },
    { title: "Velliyur Mango Orchards", city: "Velliyur", content: "Family-run farms open for seasonal visits." },
    { title: "Thiruvalangadu Dancing Hall", city: "Thiruvalangadu", content: "Historic site linked to Shiva's cosmic dance." },
    { title: "Nemili Natural Springs", city: "Nemili", content: "Small spring with pure drinking water." },
    { title: "Uthukottai Flower Fields", city: "Uthukottai", content: "Colorful flower farms in bloom." },
    { title: "Ponneri Fishing Villages", city: "Ponneri", content: "Rustic coastal settlements." },
    { title: "Thirumullaivoyal Heritage Homes", city: "Thirumullaivoyal", content: "Old Kongu-style homes with wooden pillars." },
    { title: "Thamaraipakkam Barrage Picnic Spot", city: "Thamaraipakkam", content: "Quiet riverside picnic place." }
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
          Top Attractions in Tiruvallur
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

export default Tiruvallur;
