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
  const gridCols =
    places.length % 3 === 0 || places.length === 5
      ? 'md:grid-cols-3'
      : 'md:grid-cols-4';
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-100 border-l-4 border-blue-500 pl-4 mb-6 uppercase">
        {title.replace(/_/g, ' ')}
      </h2>
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
function Pudukkottai() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  const cityDescription =
    "Pudukkottai district offers a tapestry of Tamil Nadu’s rich heritage—from rock-cut cave temples and ancient forts to architectural marvels, historical palaces, and sacred sites. Explore art, archaeology, and rural landscapes for a journey through time.";

  const places = {
    historical_sites: [
      {
        title: "Thirumayam Fort",
        city: "Thirumayam",
        content: "17th-century ring fort with temples and commanding views."
      },
      {
        title: "Kundrandar Cave Temple",
        city: "Pudukkottai district",
        content: "Ancient rock-cut cave temple under ASI restoration efforts."
      },
      {
        title: "Narthamalai Temples",
        city: "Narthamalai",
        content: "Circular Vijayalaya Choleeswaram & Mariamman temple on hillock."
      },
      {
        title: "Kodumbalur Muvar Koil",
        city: "Kodumbalur",
        content: "Sangam-era site with early Dravidian sculptures."
      }
    ],
    rock_cut_and_cave_temples: [
      {
        title: "Sittanavasal Cave",
        city: "Sittanavasal",
        content: "2nd-century Jain rock-cut monastery with 7th-century frescoes."
      },
      {
        title: "Brahadambal Temple (Thirukokarnam)",
        city: "Thirukokarnam",
        content:
          "Pallava-era rock-cut Shiva temple with guardian goddess Brihadambal."
      },
      {
        title: "Kundrandar Temple",
        city: "Pudukkottai district",
        content: "Rock-cut cave shrine recently funded for conservation."
      }
    ],
    museums_and_palaces: [
      {
        title: "Pudukkottai Government Museum",
        city: "Thirugokarnam",
        content:
          "Tamil Nadu’s second-largest museum with geology, epigraphy & cultural collections."
      }
    ],
    temples: [
      {
        title: "Avudaiyarkoil (Athmanathar Temple)",
        city: "Avudaiyarkoil",
        content:
          "Unique Shiva shrine sans Nandi; granite roof, monistic worship."
      },
      {
        title: "Santhanathaswamy Temple",
        city: "Pudukkottai",
        content:
          "Kulottunga Chola era Shiva temple with inscriptions and festivals."
      },
      {
        title: "Viralimalai Murugan Temple",
        city: "Viralimalai",
        content:
          "Hill-top Subramanya shrine with peacock sanctuary nearby."
      }
    ],
    mystical_and_pilgrimage: [
      {
        title: "Kattubava Mosque",
        city: "Kathvapallivasal",
        content:
          "17th-century Indo-Islamic Sufi shrine; revered pilgrimage site."
      }
    ],
    cultural_and_festivals: [
      {
        title: "Local Thiruvizha (Temple Festivals)",
        city: "Pudukkottai town",
        content:
          "Colorful temple carnivals with chariot pulls and folk celebrations."
      },
      {
        title: "Manjuvirattu (Bull Chase) during Pongal",
        city: "Pudukkottai rural areas",
        content:
          "Traditional bull-taming event, vibrant rural spectacle."
      }
    ],
    scenic_nature: [
      {
        title: "Viralimalai Sanctuary & Hill",
        city: "Viralimalai",
        content:
          "Peafowl-inhabited hill sanctuary offering nature walks."
      }
    ],
    hidden_gems: [
      {
        title: "Malaiyadipatti Cave Temples",
        city: "Malaiyadipatti",
        content:
          "Less-visited hill temples with Pallava carvings and frescoes."
      },
      {
        title: "Kudumiyanmalai Inscriptions & Temple",
        city: "Kudumiyanmalai",
        content:
          "Hillside complex with music-related inscriptions and thousand-pillared halls."
      },
      {
        title: "Kunnandar Cave Temple",
        city: "Thirukundrakudi",
        content:
          "Vijayanagar-style granite cave temple in peaceful village setting."
      },
      {
        title: "Kodiyakkarai Beach",
        city: "Pudukkottai coast",
        content:
          "Underrated coastal stretch offering tranquil sunset views."
      }
    ]
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/User/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => console.error(err));
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
        { name: title },
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
          Top Attractions in Pudukkottai
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

export default Pudukkottai;
