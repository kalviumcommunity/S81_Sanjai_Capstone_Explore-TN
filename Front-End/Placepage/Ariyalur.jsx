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
function Ariyalur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription =
  "Ariyalur district in Tamil Nadu is known for its Chola-era temples, fossil heritage, and biodiverse wetlands — blending history, spirituality, and nature.";

const places = {
  "heritage_temples": [
    {
      "title": "Gangaikonda Cholapuram Temple",
      "city": "Gangaikonda Cholapuram (Jayankondam)",
      "content": "UNESCO-recognised Chola-era Shiva temple built by Rajendra Chola I, famed for its refined Dravidian architecture." },
    {
      "title": "Thirumazhapadi Vaidyanathaswami Temple",
      "city": "Thirumazhapadi",
      "content": "Paadal Petra Sthalam Shiva temple, famous for the Nandi Kalyanam festival and the largest metallic statue of Thiruvalluvar in Tamil Nadu." },
    {
      "title": "Ganga Jadadisvarar Temple",
      "city": "Govindaputtur",
      "content": "Chola-period Shiva temple praised in Devaram hymns, built by Uttama Chola in 980 AD." },
    {
      "title": "Kodandaramaswamy Temple",
      "city": "Ariyalur",
      "content": "17th-century Vishnu temple with shrine to Rama–Sita–Lakshmana, built by a Palubettaraiyar chieftain." },
    {
      "title": "Kaliyuga Varadaraja Perumal Temple",
      "city": "Kallankurichi",
      "content": "Unique pillar-deity Vishnu temple; worshipped pillar 'Kambamperumal' believed to be over 8,000 years old." },
    {
      "title": "Kamarasavalli Soundaresvarar Temple",
      "city": "Kamarasavalli",
      "content": "Chola-era Shiva temple (c. 962 AD) with inscriptions from Chola, Pandya, and Hoysala periods and exquisite bronze sculptures." }
  ],
  "pilgrimage_sites": [
    {
      "title": "Adaikkala Madha Shrine (Elakurichi)",
      "city": "Elakurichi",
      "content": "18th-century Roman Catholic shrine founded by missionary Veeramamunivar (Constantine Beschi); known for its sacred pond (Madha Kulam) and annual December feast." }
  ],
  "natural_and_wildlife": [
    {
      "title": "Karaivetti Bird Sanctuary",
      "city": "Vettakudi / Karaivetti",
      "content": "Ramsar-listed freshwater sanctuary; one of Tamil Nadu’s largest bird tanks, hosting ~200 species including Bar-Headed Geese." }
  ],
  "fossil_and_geology": [
    {
      "title": "Ariyalur Fossil Museum",
      "city": "Ariyalur",
      "content": "Museum showcasing marine fossils—ammonites, bivalves, gastropods, shark teeth—dating to the Cretaceous." },
    {
      "title": "Kudimiyamalai",
      "city": "near Ariyalur",
      "content": "Hill site with rock-cut temples and caves, also rich in ammonite fossils." },
    {
      "title": "Sendurai Periya Malai",
      "city": "Sendurai",
      "content": "Scenic hill offering panoramic views and Cretaceous fossil deposits." },
    {
      "title": "Keezhapaluvur Fossil Museum",
      "city": "Keezhapaluvur",
      "content": "Local museum displaying artifacts and fossils discovered nearby." }
  ],
  "scenic_and_water_structures": [
    {
      "title": "Cholagangam Tank (Ponneri)",
      "city": "near Gangaikonda Cholapuram",
      "content": "1,000-year-old tank built by Rajendra Chola I; being redeveloped into a heritage tourism destination with walking tracks and parks." },
    {
      "title": "Anaikkarai (Naikkarai) Dam",
      "city": "Anaikkarai area",
      "content": "Historic dam and bridge across the Kollidam river, built in the colonial era using stones from Gangaikonda Cholapuram." },
    {
      "title": "Pelandhurai Dam",
      "city": "Pelandhurai area",
      "content": "Scenic irrigation structure across the Vellar or Kolli River — popular local spot." }
  ],
  "other_cultural_spots": [
    {
      "title": "Buddha & Jain sculptures",
      "city": "Vikkiramangalam",
      "content": "Chola-period Jain and Buddhist sculptures in Vikkiramangalam village." },
    {
      "title": "Aalanthuraiyar Temple",
      "city": "Keezhapaluvur",
      "content": "Ancient Shiva temple with local historical significance." },
    {
      "title": "Irattaikovils (Twin Temples)",
      "city": "Keezhaiyur",
      "content": "Two adjacent temples known locally as the twin temples." },
    {
      "title": "Meenakshi Sundareswarar Temple",
      "city": "Melapaluvur",
      "content": "Local Shiva temple with regional significance in Melapaluvur." },
    {
      "title": "Periyanayaki Amman Temple",
      "city": "Devikapuram",
      "content": "Historic Amman temple of regional importance." }
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
          Top Attractions in Ariyalur
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

export default Ariyalur;
