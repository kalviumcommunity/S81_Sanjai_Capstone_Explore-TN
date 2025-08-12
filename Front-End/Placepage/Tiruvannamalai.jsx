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
function Tiruvannamalai() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription = "Tiruvannamalai, nestled at the base of the sacred Annamalai Hills in Tamil Nadu, is famous for the massive Annamalaiyar Temple and its spiritual significance in Shaivism. The town’s yearly Karthigai Deepam festival draws devotees from across the globe, while its surrounding landscapes offer tranquil retreats, trekking trails, and ashrams that attract spiritual seekers. With a mix of heritage, culture, and natural beauty, Tiruvannamalai is a place of both devotion and discovery.";

const places = {
  "temples": [
    { title: "Annamalaiyar Temple", city: "Tiruvannamalai", content: "One of the largest temples in India dedicated to Lord Shiva." },
    { title: "Virupaksha Cave", city: "Tiruvannamalai", content: "Sacred cave where Saint Ramana Maharshi meditated." },
    { title: "Skandashram", city: "Tiruvannamalai", content: "Historic ashram built by Ramana Maharshi’s devotees." },
    { title: "Arunachaleswarar Temple Gopuram", city: "Tiruvannamalai", content: "Massive temple towers offering breathtaking views." },
    { title: "Yogi Ramsuratkumar Ashram", city: "Tiruvannamalai", content: "Peaceful ashram honoring the saint Yogi Ramsuratkumar." },
    { title: "Sri Seshadri Swamigal Ashram", city: "Tiruvannamalai", content: "Ashram dedicated to the mystic saint Seshadri Swamigal." },
    { title: "Adiannamalai Temple", city: "Tiruvannamalai", content: "Temple at the base of the Annamalai hills." },
    { title: "Pachaiamman Temple", city: "Tiruvannamalai", content: "Temple linked to goddess Pachaiamman with natural spring nearby." },
    { title: "Renukambal Amman Temple", city: "Padavedu", content: "Popular temple in a scenic village setting." },
    { title: "Sri Raghunathaswamy Temple", city: "Devikapuram", content: "Vishnu temple known for unique architecture." },
    { title: "Kailasanathar Temple", city: "Thingalur", content: "Historic temple with intricate stone work." },
    { title: "Periyanayagi Amman Temple", city: "Tiruvannamalai", content: "Small shrine near the main temple." }
  ],
  "historic_sites": [
    { title: "Arunachala Hill", city: "Tiruvannamalai", content: "Sacred hill considered a manifestation of Lord Shiva." },
    { title: "Ramana Ashram Old Hall", city: "Tiruvannamalai", content: "Historic meditation hall." },
    { title: "Gingee Fort", city: "Gingee", content: "Massive fort complex with hilltop citadels." },
    { title: "Rajagiri Fort", city: "Gingee", content: "One of the three hills of the Gingee Fort complex." },
    { title: "Krishnagiri Fort", city: "Gingee", content: "Hill fort offering scenic views of the countryside." },
    { title: "Padavedu Heritage Village", city: "Padavedu", content: "Village with numerous ancient temples." },
    { title: "Desur Chola Ruins", city: "Desur", content: "Ruins from the Chola dynasty period." },
    { title: "Senji Kottai Walls", city: "Gingee", content: "Massive walls surrounding the fort." },
    { title: "Chengam Heritage Streets", city: "Chengam", content: "Old streets lined with heritage houses." }
  ],
  "natural_spots": [
    { title: "Sathanur Dam", city: "Sathanur", content: "Scenic dam with a park and crocodile farm." },
    { title: "Arunachala Girivalam Path", city: "Tiruvannamalai", content: "14 km path for sacred circumambulation." },
    { title: "Parvathamalai Trek", city: "Kadavur", content: "Challenging trek to a hilltop temple." },
    { title: "Jamunamarathur Hills", city: "Jawadhu Hills", content: "Hill station with tribal villages." },
    { title: "Beema Falls", city: "Jawadhu Hills", content: "Waterfall within the forest." },
    { title: "Komutteri Lake", city: "Jawadhu Hills", content: "Tranquil lake surrounded by greenery." },
    { title: "Amirthi Zoological Park", city: "Amirthi", content: "Small zoo and picnic spot." },
    { title: "Gingee Fort Hill View", city: "Gingee", content: "Viewpoint offering panoramic sights." },
    { title: "Sathanur Dam Park", city: "Sathanur", content: "Green picnic spot beside the dam." }
  ],
  "cultural_and_festivals": [
    { title: "Karthigai Deepam Festival", city: "Tiruvannamalai", content: "Major festival lighting a huge flame atop the hill." },
    { title: "Girivalam Full Moon Nights", city: "Tiruvannamalai", content: "Thousands walk the hill path every full moon." },
    { title: "Gingee Fort Cultural Fest", city: "Gingee", content: "Event celebrating fort heritage." },
    { title: "Padavedu Temple Car Festival", city: "Padavedu", content: "Annual procession of deities." },
    { title: "Pongal Harvest Celebrations", city: "Rural Tiruvannamalai", content: "Traditional Tamil harvest festival." },
    { title: "Arudra Darisanam", city: "Tiruvannamalai", content: "Temple rituals for Lord Shiva." },
    { title: "Deepavali Bazaar", city: "Tiruvannamalai", content: "Markets filled with festive goods." },
    { title: "Maha Shivaratri Night", city: "Tiruvannamalai", content: "Night-long prayers and cultural programs." }
  ],
  "scenic_nature": [
    { title: "Arunachala Sunset Viewpoint", city: "Tiruvannamalai", content: "Best spot for sunset over the sacred hill." },
    { title: "Jawadhu Hills Viewpoint", city: "Jamunamarathur", content: "Breathtaking valley views." },
    { title: "Beema Falls Forest Trail", city: "Jawadhu Hills", content: "Nature trail leading to waterfalls." },
    { title: "Sathanur Dam Backwaters", city: "Sathanur", content: "Scenic backwater region." },
    { title: "Komutteri Lake Birdwatching", city: "Jawadhu Hills", content: "Migratory bird habitat." },
    { title: "Parvathamalai Sunrise Point", city: "Kadavur", content: "Dramatic sunrise view." },
    { title: "Jamunamarathur Pine Forests", city: "Jawadhu Hills", content: "Cool, shaded pine groves." },
    { title: "Tiruvannamalai Countryside", city: "Tiruvannamalai", content: "Paddy fields and palm-lined paths." }
  ],
  "hidden_gems": [
    { title: "Ramanashram Meditation Hall", city: "Tiruvannamalai", content: "Quiet meditation space often overlooked by tourists." },
    { title: "Chathuragiri Temple Cave", city: "Tiruvannamalai", content: "Small cave temple hidden in the hills." },
    { title: "Padavedu Hidden Waterfall", city: "Padavedu", content: "Secluded waterfall near the temple." },
    { title: "Thingalur Heritage Well", city: "Thingalur", content: "Ancient stepwell still in use." },
    { title: "Desur Lakefront", city: "Desur", content: "Serene village lake." },
    { title: "Gingee Secret Tunnel", city: "Gingee", content: "Ancient passage within the fort." },
    { title: "Jamunamarathur Tribal Markets", city: "Jawadhu Hills", content: "Weekly markets selling forest produce." },
    { title: "Adiannamalai Old Shrine", city: "Tiruvannamalai", content: "Tiny shrine away from the main temple." },
    { title: "Arunachala Forest Temple Ruins", city: "Tiruvannamalai", content: "Overgrown ruins deep in the forest." }
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
          Top Attractions in Tiruvannamalai
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

export default Tiruvannamalai;
