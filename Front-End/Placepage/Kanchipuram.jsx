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
function Kanchipuram() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription =
  "Kanchipuram District—renowned as the Land of Thousand Temples—is a vibrant tapestry of Pallava and Chola heritage, sacred divya desams, ancient cave shrines, vibrant weaving centers, coastal forts, and serene bird sanctuaries, offering a rich blend of spirituality, art, culture, and nature.";

  const places = {
  "major_temple_sites": [
    { "title": "Ekambareswarar Temple", "city": "Kanchipuram", "content": "Pancha Bhoota Sthalam Shiva temple with ancient mango tree over 3,500 years old." },
    { "title": "Kailasanathar Temple", "city": "Kanchipuram", "content": "Earliest surviving Pallava temple, full of intricate carvings and mural art." },
    { "title": "Kamakshi Amman Temple", "city": "Kanchipuram", "content": "One of the 51 Shakti Peethas, major shrine of Parvati (Kamakshi)." },
    { "title": "Varadaraja Perumal Temple", "city": "Kanchipuram", "content": "Ancient Vishnu temple built by Cholas with rich sculptures." },
    { "title": "Ulagalantha Perumal Temple", "city": "Kanchipuram", "content": "Divya Desam where Lord Vishnu is worshipped in Vamana–Trivikrama form." },
    { "title": "Vaikunta (Vaikunda) Perumal Temple", "city": "Kanchipuram", "content": "Pallava-era Divya Desam with standing, sitting & reclining Vishnu idols." },
    { "title": "Pandava Tutar Perumal Temple", "city": "Kanchipuram", "content": "Divya Desam dedicated to Krishna and Rukmini; one of the oldest." },
    { "title": "Chitragupta Temple", "city": "Kanchipuram", "content": "Rare shrine dedicated to Chitragupta (Yama’s assistant)." }
  ],
  "paadal_petra_and_saiva_temples": [
    { "title": "Anekadhangavadeswarar Temple", "city": "Kanchipuram", "content": "Paadal Petra Sthalam Shiva shrine revered in Tevaram." },
    { "title": "Ona Kantheeswarar Temple", "city": "Kanchipuram", "content": "Paadal Petra Sthalam built by asuras Onan and Kanthan." },
    { "title": "Kachabeswarar Temple", "city": "Kanchipuram", "content": "Shiva shrine with central pond, Paadal Petra Sthalam." },
    { "title": "Ekambaranathar Temple", "city": "Kanchipuram", "content": "Listed above; also one of the five Shiva elements (rock/earth)." },
    { "title": "Subramaniya Swami Temple", "city": "Kanchipuram", "content": "Murugan temple with elegant Dravidian architecture." }
  ],
  "heritage_museums_and_culture": [
    { "title": "Kanchi Kudil (Heritage Home)", "city": "Kanchipuram", "content": "Heritage house museum showcasing traditional lifestyles." },
    { "title": "Silk Weaving Villages", "city": "Kanchipuram District", "content": "Live weaving of iconic Kanchipuram sarees by artisans." },
    { "title": "Kanchi Kamakoti Peetam (Math)", "city": "Kanchipuram", "content": "Monastic institution founded by Adi Shankara—spiritual and cultural hub." },
    { "title": "Tiru Parameswara Vinnagaram (Vaikunta Perumal Temple)", "city": "Kanchipuram", "content": "Second-oldest temple in the city, Pallava-era Divya Desam." }
  ],
  "natural_and_wildlife_spots": [
    { "title": "Vedanthangal Bird Sanctuary", "city": "Madurantakam", "content": "India’s oldest bird sanctuary hosting over 30,000 migratory birds." },
    { "title": "Madurantakam Lake", "city": "Madurantakam", "content": "Second-largest man-made lake in South India; great for birding & boating." }
  ],
  "nearby_attractions": [
    { "title": "Arignar Anna Zoological Park (Vandalur Zoo)", "city": "Vandalur", "content": "One of South India’s largest zoos." },
    { "title": "Alamparai Fort", "city": "Kanchipuram District coast", "content": "Ruined colonial-era coastal fort with sea views." },
    { "title": "Crocodile Bank", "city": "near Mahabalipuram", "content": "Reptile conservation centre with crocodiles, snakes, turtles." }
  ],
  "archaeological_and_megalithic_sites": [
    { "title": "Megalithic Sites Cluster", "city": "Various (Erumaiyur, Sirukalathur etc.)", "content": "Over 100 prehistoric burial sites across the district." }
  ],
  "historic_local_sites": [
    { "title": "Sriperumbudur – Rajiv Gandhi Memorial", "city": "Sriperumbudur", "content": "Birthplace of Ramanujar and memorial of PM Rajiv Gandhi." },
    { "title": "Thiruthani Murugan Temple", "city": "Thiruthani", "content": "One of the six abodes of Murugan, perched atop a hill." }
  ],
  "cultural_walks_and_markets": [
    { "title": "Local Markets & Silk Bazaars", "city": "Kanchipuram", "content": "Bustling markets for silk sarees, handicrafts and street food." }
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
          Top Attractions in Kanchipuram
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

export default Kanchipuram;
