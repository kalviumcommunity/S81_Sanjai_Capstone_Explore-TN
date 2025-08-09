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

  const cityDescription = "Nilgiris district, nestled in the Western Ghats of Tamil Nadu, is renowned for its breathtaking hill stations, tea plantations, and rich biodiversity. Home to popular destinations like Ooty, Coonoor, and Kotagiri, the district offers cool climate, scenic views, and a perfect escape for nature enthusiasts and travelers.";
  ;

  const places = {
    "Temples & Religious Sites": [
      {
        "title": "Namakkal Anjaneyar Temple",
        "content": "Features an 18-ft tall Hanuman statue.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/11/Namakkal_Anjaneyar_Temple.jpg",
        "city": "Namakkal"
      },
      {
        "title": "Narasimhaswamy Temple",
        "content": "Rock-cut temple dedicated to Lord Narasimha.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Narasimhaswamy_temple_namakkal.jpg",
        "city": "Namakkal"
      },
      {
        "title": "Sri Ranganatha Perumal Temple",
        "content": "6th-century temple dedicated to Lord Vishnu.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Ranganatha_Perumal_Temple_Rasipuram.jpg",
        "city": "Rasipuram"
      },
      {
        "title": "Thathagiri Murugan Temple",
        "content": "Situated on a small hill near Muthugapatty.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/17/MuruganTempleTN.jpg",
        "city": "Muthugapatty"
      },
      {
        "title": "Swami Venkatajalapathi Temple, Naina Malai",
        "content": "Located atop Naina Malai hill.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/76/NainaMalaiTemple.jpg",
        "city": "Naina Malai"
      },
      {
        "title": "Akkammal Koil",
        "content": "Small ancient temple with local significance.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Temple_generic.jpg",
        "city": "Senthamangalam"
      },
      {
        "title": "Kandasamy Temple",
        "content": "Popular Murugan temple on a small hill.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Kandasamy_Temple.jpg",
        "city": "Paramathi"
      }
    ],
  
    "Hill Stations & Nature": [
      {
        "title": "Kolli Hills",
        "content": "Known for its natural beauty and pleasant climate.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Kolli_Hills_Tamil_Nadu.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Agaya Gangai Waterfalls",
        "content": "Majestic waterfall ideal for trekking and photography.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Agaya_Gangai_Falls.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Seekuparai View Point",
        "content": "Scenic viewpoint overlooking valleys and hills.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Seekuparai_Viewpoint.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Mini Falls",
        "content": "Small waterfall ideal for families.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Kolli_Hills_Mini_Falls.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Semmedu View Point",
        "content": "Top spot for a wide panoramic view of the region.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/Kolli_Viewpoint.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Botanical Garden - Kolli Hills",
        "content": "Maintained by Forest Department with medicinal plants.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Botanical_Garden.jpg",
        "city": "Kolli Hills"
      }
    ],
  
    "Waterfalls & Dams": [
      {
        "title": "Puliancholai",
        "content": "Serene riverbed and small falls near the border of Namakkal and Trichy.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Puliancholai.jpg",
        "city": "Puliancholai"
      },
      {
        "title": "Nallathangal Dam",
        "content": "Picnic spot with good views and calm surroundings.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Nallathangal_Dam.jpg",
        "city": "Namakkal"
      },
      {
        "title": "Kavayadi Waterfalls",
        "content": "Seasonal waterfall accessible after short trek.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/Waterfall_generic.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Kodikombu Waterfalls",
        "content": "Lesser-known peaceful waterfall surrounded by greenery.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/Waterfall_generic.jpg",
        "city": "Kolli Hills"
      }
    ],
  
    "Heritage & Forts": [
      {
        "title": "Namakkal Fort",
        "content": "Historic fort built during the reign of Thirumalai Nayak in the 17th century.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Namakkal_fort.jpg",
        "city": "Namakkal"
      },
      {
        "title": "Rasipuram Fort Ruins",
        "content": "Remains of an ancient fort in Rasipuram town.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Rasipuram_Fort.jpg",
        "city": "Rasipuram"
      },
      {
        "title": "Pudukkottai Fort Wall (Remains)",
        "content": "Part of ancient regional defenses.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Fort_wall.jpg",
        "city": "Pudukkottai area"
      }
    ],
  
    "Spiritual & Ashrams": [
      {
        "title": "Swami Ramalinga Vallalar Mandram",
        "content": "A spiritual center based on the teachings of Vallalar.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/b/b7/VallalarMandram.jpg",
        "city": "Rasipuram"
      },
      {
        "title": "Yoga Ashram near Elachipalayam",
        "content": "Calm retreat for meditation and yoga practices.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/88/YogaAshram.jpg",
        "city": "Elachipalayam"
      }
    ],
  
    "Local Attractions & Cultural Spots": [
      {
        "title": "Rasipuram Textile Market",
        "content": "Famous for traditional handloom dhotis and sarees.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Rasipuram_handloom.jpg",
        "city": "Rasipuram"
      },
      {
        "title": "Namagiri Art Stone Sculptures",
        "content": "Renowned for temple sculptures & export-quality stone art.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Namagiri_Sculptures.jpg",
        "city": "Namakkal"
      },
      {
        "title": "Namakkal Town Park",
        "content": "Local recreation and cultural activities.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/6/66/Public_Park.jpg",
        "city": "Namakkal"
      }
    ],
  
    "Adventure, Trekking & Activities": [
      {
        "title": "Kolli Hills Hairpin Bends",
        "content": "Biking and scenic drives with 70 bends.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/3/30/Kolli_Malai_Hairpin_Bends.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Agaya Gangai Trekking Path",
        "content": "1,200+ steps down and up!",
        "image": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Agaya_Gangai_Trek.jpg",
        "city": "Kolli Hills"
      },
      {
        "title": "Off-Road Jeep Safari",
        "content": "Organized tours deep into Kolli forest zones.",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/JeepSafari.jpg",
        "city": "Kolli Hills"
      }
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
