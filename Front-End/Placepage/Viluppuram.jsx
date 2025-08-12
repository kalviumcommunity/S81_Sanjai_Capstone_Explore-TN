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
function Viluppuram() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

const cityDescription = "Viluppuram, the largest district in Tamil Nadu, blends history, spirituality, and natural beauty. Famous for the imposing Gingee Fort, the 'Troy of the East,' the district also features serene beaches, ancient temples, and the rural charm of Tamil heartland life. Stretching from coastal sands to hill landscapes, Viluppuram is a place where heritage meets scenic tranquility.";

const places = {
  "temples": [
    { title: "Veeratteswarar Temple", city: "Panruti", content: "Ancient temple dedicated to Lord Shiva." },
    { title: "Melmalayanur Angala Parameswari Temple", city: "Melmalayanur", content: "Popular temple known for fire walking rituals." },
    { title: "Thiruvennainallur Sri Viratteswarar Temple", city: "Thiruvennainallur", content: "Historic temple associated with Tamil Saivite saints." },
    { title: "Mandagapattu Cave Temple", city: "Mandagapattu", content: "Pallava-era rock-cut temple, one of the earliest in Tamil Nadu." },
    { title: "Sri Varadaraja Perumal Temple", city: "Viluppuram", content: "Vishnu temple with Dravidian architecture." },
    { title: "Periya Mariamman Temple", city: "Villupuram", content: "Important local shrine with annual festivals." },
    { title: "Thiruvennainallur Perumal Temple", city: "Thiruvennainallur", content: "Sacred site for Vishnu devotees." },
    { title: "Panruti Kamatchi Amman Temple", city: "Panruti", content: "Small yet revered Amman temple." },
    { title: "Kalrayan Hills Murugan Temple", city: "Kalrayan Hills", content: "Hilltop shrine with scenic views." },
    { title: "Sri Venkatesa Perumal Temple", city: "Tindivanam", content: "Temple known for Vaishnavite traditions." }
  ],
  "historic_sites": [
    { title: "Gingee Fort", city: "Gingee", content: "Massive hill fort complex known as the 'Troy of the East'." },
    { title: "Kalyana Mahal", city: "Gingee", content: "Historic palace inside Gingee Fort." },
    { title: "Ranganathar Temple Fort Complex", city: "Gingee", content: "Fortified temple structure." },
    { title: "Krishnagiri Fort", city: "Gingee", content: "One of the three hill forts in Gingee." },
    { title: "Rajagiri Fort", city: "Gingee", content: "Central fort hill with citadel remains." },
    { title: "Sad-at-Ullah Khan Mosque", city: "Gingee", content: "Historic mosque from the Nawab period." },
    { title: "Mandagapattu Inscriptions", city: "Mandagapattu", content: "Stone inscriptions of the Pallava dynasty." },
    { title: "Senji Rajagiri Palace Ruins", city: "Gingee", content: "Remains of royal structures inside the fort." }
  ],
  "natural_spots": [
    { title: "Kalrayan Hills", city: "Kalrayan", content: "Lush hills with trekking and waterfalls." },
    { title: "Thiruvakkarai Fossil Park", city: "Thiruvakkarai", content: "Unique fossilized tree park." },
    { title: "Mailam Hills", city: "Mailam", content: "Hill with scenic temple and views." },
    { title: "Sathanur Dam", city: "Near Tiruvannamalai", content: "Large dam with gardens and boating." },
    { title: "Melmalayanur Hill", city: "Melmalayanur", content: "Hilly terrain around the temple." },
    { title: "Pachaiamman Falls", city: "Kalrayan Hills", content: "Seasonal waterfalls." },
    { title: "Thirukoilur Hills", city: "Thirukoilur", content: "Hills near ancient temples." },
    { title: "Siruvathur Lake", city: "Siruvathur", content: "Quiet lake for picnics." }
  ],
  "cultural_and_festivals": [
    { title: "Melmalayanur Panguni Festival", city: "Melmalayanur", content: "Grand Amman temple festival." },
    { title: "Mailam Panguni Uthiram", city: "Mailam", content: "Annual temple chariot procession." },
    { title: "Thiruvennainallur Temple Car Festival", city: "Thiruvennainallur", content: "Historic chariot festival." },
    { title: "Kalrayan Hills Tribal Festival", city: "Kalrayan Hills", content: "Cultural fair showcasing tribal traditions." },
    { title: "Deepavali Street Markets", city: "Villupuram", content: "Lively festive markets." },
    { title: "Tamil New Year Celebrations", city: "Villupuram", content: "Traditional events across temples." }
  ],
  "scenic_nature": [
    { title: "Kalrayan Hills Viewpoint", city: "Kalrayan", content: "Panoramic views from hilltop points." },
    { title: "Pachaiamman Waterfalls", city: "Kalrayan Hills", content: "Refreshing natural falls." },
    { title: "Mailam Hill Viewpoint", city: "Mailam", content: "Sunrise and sunset views." },
    { title: "Thirukoilur Riverbank", city: "Thirukoilur", content: "Peaceful riverfront spot." },
    { title: "Siruvathur Sunset Point", city: "Siruvathur", content: "Evening scenic beauty." },
    { title: "Kalrayan Nature Trails", city: "Kalrayan", content: "Trekking routes amidst forests." }
  ],
  "hidden_gems": [
    { title: "Fossil Wood Park Trails", city: "Thiruvakkarai", content: "Walk among prehistoric fossils." },
    { title: "Secret Streams of Kalrayan", city: "Kalrayan Hills", content: "Hidden water bodies in the forest." },
    { title: "Abandoned British Bungalows", city: "Kalrayan Hills", content: "Colonial relics in the hills." },
    { title: "Undiscovered Fort Walls", city: "Gingee", content: "Less-visited sections of the fort." },
    { title: "Village Pottery Workshops", city: "Villupuram", content: "Traditional craft-making spots." },
    { title: "Ancient Jain Beds", city: "Mailam Hills", content: "Historic rock-cut Jain relics." },
    { title: "Unmarked Cave Temples", city: "Thirukoilur", content: "Small caves with carvings." },
    { title: "Siruvathur Hidden Lake", city: "Siruvathur", content: "A peaceful water body tucked away in greenery." }
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
          Top Attractions in Viluppuram
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

export default Viluppuram;
