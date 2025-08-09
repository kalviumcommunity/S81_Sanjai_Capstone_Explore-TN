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
function Coimbatore() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Madurai, one of the oldest cities in India, is a cultural and historical hub of Tamil Nadu. Known as the 'Temple City,' it is famous for the majestic Meenakshi Amman Temple, ancient monuments, and vibrant street markets. The city is also home to architectural marvels, traditional festivals, and significant religious sites, making it a must-visit destination.";

  const places = {
    Temples: [
      { title: "Meenakshi Amman Temple", content: "A world-renowned Dravidian-style temple.", image: "/images/meenakshi.jpg" },
      { title: "Thiruparankundram Murugan Temple", content: "One of the six abodes of Lord Murugan.", image: "/images/thiruparankundram.jpg" },
      { title: "Kallazhagar Temple", content: "Dedicated to Lord Vishnu, located in Alagar Hills.", image: "/images/kallazhagar.jpg" },
      { title: "Pazhamudircholai Murugan Temple", content: "A Murugan temple set amidst lush forests.", image: "/images/pazhamudircholai.jpg" },
      { title: "Narasingam Yoga Narasimha Perumal Temple", content: "An ancient cave temple dedicated to Lord Narasimha.", image: "/images/narasingam.jpg" },
      { title: "Sri Mavoothu Velapar Temple", content: "A temple dedicated to Lord Murugan, surrounded by hills.", image: "/images/mavoothu.jpg" },
      
    ],
    Historical: [
      { title: "Thirumalai Nayakkar Mahal", content: "A majestic 17th-century palace.", image: "/images/nayakkar.jpg" },
      { title: "Gandhi Memorial Museum", content: "A museum dedicated to Mahatma Gandhi.", image: "/images/gandhimuseum.jpg" },
      { title: "Vandiyur Mariamman Teppakulam", content: "A large temple tank known for its float festival.", image: "/images/teppakulam.jpg" },
      { title: "Keeladi Excavation Site", content: "A Sangam-era archaeological site.", image: "/images/keeladi.jpg" },
      { title: "Yanamalai Jain Caves", content: "Ancient Jain rock carvings and temples.", image: "/images/yanamalai.jpg" }
    ],
    Nature: [
      { title: "Kutladampatti Falls", content: "A scenic seasonal waterfall near Madurai.", image: "/images/kutladampatti.jpg" },
      { title: "Samanar Hills", content: "Ancient Jain caves and rock carvings.", image: "/images/samanar.jpg" },
      { title: "Suruli Falls", content: "A picturesque waterfall surrounded by forests.", image: "/images/suruli.jpg" },
      { title: "Vaigai Dam", content: "A massive dam offering picturesque views and gardens.", image: "/images/vaigai.jpg" }
    ],
    Entertainment: [
      { title: "Athisayam Theme Park", content: "A water and amusement park in Madurai.", image: "/images/athisayam.jpg" },
      { title: "MGR Racecourse Stadium", content: "A sports stadium for various events.", image: "/images/racecourse.jpg" },
      { title: "Madurai Mall", content: "A shopping mall with entertainment and dining options.", image: "/images/madurai_mall.jpg" },
      { title: "Rajaji Park", content: "A recreational park with greenery and play areas.", image: "/images/rajaji.jpg" }
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
          Top Attractions in Madurai
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

export default Coimbatore;
