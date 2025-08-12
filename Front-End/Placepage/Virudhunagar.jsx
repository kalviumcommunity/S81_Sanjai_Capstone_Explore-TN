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
function Virudhunagar() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

const cityDescription = "Virudhunagar, located in the southern part of Tamil Nadu, is a vibrant district known for its rich cultural heritage, thriving industries, and deep-rooted traditions. It is famous for its match factories, fireworks production, and cotton spinning mills. The region boasts a blend of historic temples, scenic nature spots, and lively festivals. With towns like Sivakasi, Srivilliputhur, and Rajapalayam, Virudhunagar offers visitors a mix of spiritual experiences, historical exploration, and natural beauty, making it a unique destination in southern Tamil Nadu.";

const places = {
  "temples": [
    { title: "Srivilliputhur Andal Temple", city: "Srivilliputhur", content: "Famous for its towering gopuram and association with the saint Andal." },
    { title: "Narasimha Swamy Temple", city: "Naranapuram", content: "Dedicated to Lord Narasimha, with unique architecture and carvings." },
    { title: "Vembakottai Murugan Temple", city: "Vembakottai", content: "Hilltop temple offering panoramic views of the surroundings." },
    { title: "Muthu Karuppasamy Temple", city: "Sattur", content: "Popular among locals for vibrant festivals and rural traditions." },
    { title: "Madavar Vilagam Venkatachalapathy Temple", city: "Srivilliputhur", content: "Historic Vishnu temple with intricate stone carvings." },
    { title: "Kasi Viswanathar Temple", city: "Rajapalayam", content: "Prominent Shiva temple with spiritual significance." },
    { title: "Periya Mariamman Temple", city: "Virudhunagar", content: "Center of major annual temple festival attracting thousands." },
    { title: "Meenakshi Amman Temple", city: "Sivakasi", content: "Local goddess temple with traditional architecture." },
    { title: "Thiruthangal Ninra Narayana Perumal Temple", city: "Thiruthangal", content: "One of the 108 Divya Desams with remarkable Dravidian style." },
    { title: "Pechi Amman Temple", city: "Aruppukottai", content: "Village deity temple known for its rural charm." }
  ],
  "historic_sites": [
    { title: "Sivakasi Old Fort", city: "Sivakasi", content: "Ruins of a small fort linked to the region's medieval history." },
    { title: "Virudhunagar Clock Tower", city: "Virudhunagar", content: "Colonial-era clock tower symbolizing the town's heritage." },
    { title: "Rajapalayam Palace", city: "Rajapalayam", content: "Old palace reflecting royal history and architecture." },
    { title: "Srivilliputhur Palace Ruins", city: "Srivilliputhur", content: "Remnants of ancient palace structures." },
    { title: "Kariapatti Market Heritage Street", city: "Kariapatti", content: "Historic bazaar street with colonial influences." },
    { title: "Aruppukottai Old Trading Houses", city: "Aruppukottai", content: "Historic cotton trading houses from the British era." }
  ],
  "natural_spots": [
    { title: "Ayyanar Falls", city: "Rajapalayam", content: "Scenic waterfall popular for picnics and treks." },
    { title: "Shenbagathoppu", city: "Rajapalayam", content: "Biodiversity hotspot with rare flora and fauna." },
    { title: "Sathuragiri Hills", city: "Srivilliputhur", content: "Sacred hill range for trekking and spiritual visits." },
    { title: "Thalavaipuram Lake", city: "Virudhunagar", content: "Peaceful lake ideal for birdwatching." },
    { title: "Vembakottai Reservoir", city: "Vembakottai", content: "Reservoir surrounded by greenery." },
    { title: "Kullursandai Reservoir", city: "Rajapalayam", content: "Scenic water body offering serene views." },
    { title: "Maharajapuram Hills", city: "Maharajapuram", content: "Undisturbed nature spot for photography." },
    { title: "Amathur Village Streams", city: "Amathur", content: "Tranquil water streams amidst rural landscapes." }
  ],
  "cultural_and_festivals": [
    { title: "Sivakasi Kandasamy Temple Chariot Festival", city: "Sivakasi", content: "Grand chariot procession attracting thousands of devotees." },
    { title: "Srivilliputhur Andal Festival", city: "Srivilliputhur", content: "Celebration honoring Andal with rituals and cultural events." },
    { title: "Aruppukottai Mariamman Festival", city: "Aruppukottai", content: "Popular local festival with vibrant celebrations." },
    { title: "Rajapalayam Pongal Celebrations", city: "Rajapalayam", content: "Traditional harvest festival in rural settings." },
    { title: "Virudhunagar Periya Mariamman Festival", city: "Virudhunagar", content: "Major festival with music, dance, and rituals." },
    { title: "Deepavali in Sivakasi", city: "Sivakasi", content: "Known for fireworks displays and celebrations." }
  ],
  "scenic_nature": [
    { title: "Srivilliputhur Grizzled Squirrel Sanctuary", city: "Srivilliputhur", content: "Wildlife sanctuary home to the endangered grizzled giant squirrel." },
    { title: "Western Ghats Viewpoints", city: "Rajapalayam", content: "Panoramic views of lush green mountains." },
    { title: "Chathuragiri Forest Trails", city: "Srivilliputhur", content: "Hiking trails through dense forests." },
    { title: "Pechi Amman Hills", city: "Aruppukottai", content: "Hills with scenic surroundings and temple." },
    { title: "Kottai Hills", city: "Sattur", content: "Secluded hill spot perfect for nature walks." },
    { title: "Sengulam Lake", city: "Rajapalayam", content: "Serene lake with boating facilities." }
  ],
  "hidden_gems": [
    { title: "Koomapatti Village Pottery", city: "Koomapatti", content: "Traditional pottery-making village." },
    { title: "Virudhunagar Fireworks Tour", city: "Sivakasi", content: "Guided tours of fireworks manufacturing units." },
    { title: "Aruppukottai Cotton Mills Visit", city: "Aruppukottai", content: "Insight into the cotton spinning industry." },
    { title: "Rajapalayam Handloom Weaving", city: "Rajapalayam", content: "Famous for traditional handloom products." },
    { title: "Srivilliputhur Traditional Sweet Shops", city: "Srivilliputhur", content: "Known for authentic Tamil sweets." },
    { title: "Sattur Kara Sevu Market", city: "Sattur", content: "Famous for the spicy snack Kara Sevu." },
    { title: "Kariapatti Village Bull Racing", city: "Kariapatti", content: "Traditional sport during local festivals." },
    { title: "Pudupatti Folk Dance Nights", city: "Pudupatti", content: "Cultural evenings with traditional performances." }
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
          Top Attractions in Virudhunagar 
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

export default Virudhunagar ;
