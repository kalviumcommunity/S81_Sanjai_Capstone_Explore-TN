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
function Tiruppur() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Tiruppur, the 'Knitwear Capital of India', is a dynamic city in Tamil Nadu that blends industrial might with cultural charm. Famous for its textile exports and bustling markets, Tiruppur also holds centuries-old temples, scenic dams, lush countryside, and unique Kongu traditions. The city thrives on entrepreneurship, yet remains deeply rooted in heritage, making it a fascinating stop for business travelers and tourists alike.";

const places = {
  "temples": [
    { title: "Avinashi Lingeswarar Temple", city: "Avinashi", content: "Historic Shiva temple over 1,000 years old, linked to a famous legend." },
    { title: "Thirumuruganpoondi Temple", city: "Thirumuruganpoondi", content: "Dedicated to Lord Shiva, known for its connection to Tamil saints." },
    { title: "Kongu Tirupati Temple", city: "Kongu Tirupati", content: "Replica of the Tirupati Venkateswara Temple." },
    { title: "Muthuramman Temple", city: "Muthur", content: "Famous for local festivals and rituals." },
    { title: "Arulmigu Nachimuthu Mahalingam Temple", city: "Pollachi", content: "Popular temple with serene surroundings." },
    { title: "Velankanni Matha Church", city: "Tiruppur", content: "Peaceful church visited by people of all faiths." },
    { title: "Karivaradharaja Perumal Temple", city: "Palladam", content: "Vishnu temple with historic significance." },
    { title: "Chettipalayam Murugan Temple", city: "Chettipalayam", content: "Small hill temple with great views." },
    { title: "Arulmigu Mariamman Temple", city: "Udumalpet", content: "Dedicated to the goddess Mariamman, known for vibrant festivals." },
    { title: "Koduvai Sivan Temple", city: "Koduvai", content: "Heritage temple with Dravidian architecture." },
    { title: "Veerapandi Gowmari Amman Temple", city: "Veerapandi", content: "Popular among locals for blessings during harvest." },
    { title: "Karur Pasupatheswarar Temple", city: "Near Tiruppur", content: "Ancient temple with elaborate sculptures." },
    { title: "Ayyan Kovil", city: "Near Avinashi", content: "Small but historic shrine surrounded by greenery." }
  ],
  "historic_sites": [
    { title: "Noyyal River Heritage Banks", city: "Tiruppur", content: "Historic riverbanks that supported ancient settlements." },
    { title: "Kangeyam Fort Remains", city: "Kangeyam", content: "Ruins of a small fort from the Kongu region's history." },
    { title: "Perur Pateeswarar Temple", city: "Near Tiruppur", content: "Ancient temple with rich Chola-era architecture." },
    { title: "Udumalpet Heritage Streets", city: "Udumalpet", content: "Traditional houses with old-world charm." },
    { title: "Kundadam Old Market Area", city: "Kundadam", content: "Market with over a century of trading history." },
    { title: "Koduvai Weaving Houses", city: "Koduvai", content: "Historic textile homes showcasing Kongu craftsmanship." },
    { title: "Kangeyam Cattle Breeding Centers", city: "Kangeyam", content: "Linked to centuries-old farming traditions." },
    { title: "Avinashi Stepwell", city: "Avinashi", content: "Historic water storage system from Chola times." },
    { title: "Kaniyur Agraharam", city: "Kaniyur", content: "Brahmin settlement with heritage homes and temples." }
  ],
  "natural_spots": [
    { title: "Amaravathi Dam", city: "Near Tiruppur", content: "Picturesque dam with boating and a crocodile park." },
    { title: "Aliyar Dam", city: "Pollachi", content: "Scenic dam at the base of the Western Ghats." },
    { title: "Thirumoorthy Hills & Falls", city: "Udumalpet", content: "Hill temple with waterfalls and trekking options." },
    { title: "Koolipatti Murugan Temple Hills", city: "Koolipatti", content: "Temple atop a small hill with panoramic views." },
    { title: "Kundadam Lake", city: "Kundadam", content: "Peaceful lake for relaxation and fishing." },
    { title: "Valparai Tea Estates", city: "Valparai", content: "Endless rolling tea gardens with misty air." },
    { title: "Top Slip Wildlife Sanctuary", city: "Top Slip", content: "Part of Anamalai Tiger Reserve with safaris." },
    { title: "Monkey Falls", city: "Pollachi", content: "Natural waterfall along the Pollachi–Valparai road." },
    { title: "Chinnar Wildlife Sanctuary", city: "Near Udumalpet", content: "Sanctuary famous for rare grizzled giant squirrels." },
    { title: "Aaliyar Eco Park", city: "Aliyar", content: "Park with gardens, viewpoints, and boating." }
  ],
  "cultural_and_festivals": [
    { title: "Avinashi Car Festival", city: "Avinashi", content: "Grand chariot procession attracting thousands of devotees." },
    { title: "Kangeyam Cattle Fair", city: "Kangeyam", content: "Annual livestock fair showcasing Kangeyam bulls." },
    { title: "Pongal Festival", city: "Tiruppur", content: "Traditional harvest festival celebrated across the district." },
    { title: "Aadi Perukku", city: "Noyyal River Banks", content: "Celebration of river blessings." },
    { title: "Mariyamman Festival", city: "Udumalpet", content: "Colorful event with music, rituals, and stalls." },
    { title: "Textile Expo", city: "Tiruppur", content: "Annual fair showcasing garments and innovations." },
    { title: "Temple Car Festival", city: "Thirumuruganpoondi", content: "Procession of the temple chariot through the streets." },
    { title: "Vinayagar Chaturthi Celebrations", city: "Tiruppur", content: "City-wide celebrations with idols and immersion processions." }
  ],
  "scenic_nature": [
    { title: "Valparai Hills", city: "Near Pollachi", content: "Cool hill station with tea plantations and wildlife." },
    { title: "Anamalai Tiger Reserve", city: "Top Slip", content: "Biodiversity hotspot for safaris and treks." },
    { title: "Monkey Falls", city: "Pollachi", content: "Natural waterfall along the Pollachi–Valparai road." },
    { title: "Thirumoorthy Dam Viewpoint", city: "Udumalpet", content: "Panoramic views of the dam and hills." },
    { title: "Grass Hills", city: "Valparai", content: "Unique rolling grassy meadows." },
    { title: "Koolipatti Hill Sunrise Point", city: "Koolipatti", content: "Lesser-known sunrise viewpoint." },
    { title: "Aliyar Dam Viewpoint", city: "Aliyar", content: "Great spot for sunset photography." },
    { title: "Maruthamalai Foothills", city: "Near Tiruppur", content: "Green slopes ideal for evening walks." }
  ],
  "hidden_gems": [
    { title: "Senguttai Lake", city: "Tiruppur", content: "Quiet local spot for birdwatching." },
    { title: "Kadambur Handloom Village", city: "Kadambur", content: "Traditional weaving hub for authentic textiles." },
    { title: "Kangeyam Bull Farms", city: "Kangeyam", content: "Experience the heritage of Kangeyam bull rearing." },
    { title: "Vellakoil Weekly Market", city: "Vellakoil", content: "Local market selling everything from fabrics to cattle feed." },
    { title: "Veerapandi Riverside Picnic Spot", city: "Veerapandi", content: "Shaded riverside retreat for families." },
    { title: "Udumalpet Organic Farms", city: "Udumalpet", content: "Farm tours with fresh produce tasting." },
    { title: "Koduvai Handloom Units", city: "Koduvai", content: "Small workshops making handwoven fabrics." },
    { title: "Palladam Silk Saree Houses", city: "Palladam", content: "Stores famous for Kongu silk weaving." },
    { title: "Amaravathi Crocodile Park", city: "Near Amaravathi Dam", content: "Home to large mugger crocodiles." },
    { title: "Padiyur Sandalwood Handicrafts", city: "Padiyur", content: "Artisan village known for sandalwood carvings." }
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
          Top Attractions in Tiruppur
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

export default Tiruppur;
