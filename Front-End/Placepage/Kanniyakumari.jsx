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
function Kanniyakumari() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

 const cityDescription =
  "Kanniyakumari District, the southernmost point of mainland India, is where the Arabian Sea, Bay of Bengal, and Indian Ocean converge. It blends spiritual landmarks, colonial architecture, waterfalls, hill stations, wildlife sanctuaries, coastal forts, and the unmatched sunrise–sunset spectacle.";


 const places = {
  "major_landmarks": [
    { "title": "Vivekananda Rock Memorial", "city": "Kanniyakumari", "content": "Iconic monument on a rock island where Swami Vivekananda meditated in 1892." },
    { "title": "Thiruvalluvar Statue", "city": "Kanniyakumari", "content": "133-feet tall statue honoring Tamil poet-saint Thiruvalluvar." },
    { "title": "Kanyakumari Beach", "city": "Kanniyakumari", "content": "Tri-sea confluence point, famous for sunrise and sunset views." },
    { "title": "Our Lady of Ransom Church", "city": "Kanniyakumari", "content": "Neo-Gothic church dedicated to Mother Mary, facing the sea." },
    { "title": "Gandhi Memorial Mandapam", "city": "Kanniyakumari", "content": "Memorial built at the spot where Gandhi's ashes were kept before immersion." },
    { "title": "Suchindram Thanumalayan Temple", "city": "Suchindram", "content": "Unique temple dedicated to Brahma, Vishnu, and Shiva in one linga." },
    { "title": "Bhagavathy Amman Temple", "city": "Kanniyakumari", "content": "Ancient Shakti Peetha and presiding deity of the town." }
  ],
  "natural_and_wildlife_spots": [
    { "title": "Thirparappu Waterfalls", "city": "Kalkulam", "content": "Picturesque waterfall with a small Shiva temple nearby." },
    { "title": "Olakaruvi Waterfalls", "city": "Boothapandi", "content": "Two-tier waterfall amidst Western Ghats forest." },
    { "title": "Mathur Hanging Bridge", "city": "Aruvikkarai", "content": "One of the longest and highest aqueducts in Asia." },
    { "title": "Vattakottai Fort & Beach", "city": "Kanniyakumari", "content": "Seaside fort built by Travancore rulers; offers panoramic sea views." },
    { "title": "Muttom Beach", "city": "Muttom", "content": "Rocky shoreline with colonial lighthouse and sunset point." },
    { "title": "Chitharal Jain Monuments", "city": "Chitharal", "content": "Hilltop cave temple of Jain origin with panoramic valley views." },
    { "title": "Sanguthurai Beach", "city": "Kanniyakumari", "content": "Quiet beach with WWI memorial pillar." },
    { "title": "Sothavilai Beach", "city": "Kanniyakumari", "content": "Longest beach in Tamil Nadu, ideal for relaxation." },
    { "title": "Manakudy Bird Sanctuary", "city": "Manakudy", "content": "Wetland ecosystem attracting numerous migratory birds." },
    { "title": "Keeriparai Wildlife Sanctuary", "city": "Keeriparai", "content": "Evergreen forests with trekking trails and elephants." }
  ],
  "historic_and_cultural_sites": [
    { "title": "Padmanabhapuram Palace", "city": "Padmanabhapuram", "content": "Magnificent wooden palace of Travancore kings." },
    { "title": "Udayagiri Fort", "city": "Puliyoorkurichi", "content": "17th-century fort that served as a barracks for De Lannoy’s army." },
    { "title": "St. Xavier’s Church", "city": "Kottar", "content": "Historic church built by St. Francis Xavier." },
    { "title": "Vattakottai Fort", "city": "Kanniyakumari", "content": "Part of Travancore’s coastal defense system." },
    { "title": "Nagercoil Clock Tower", "city": "Nagercoil", "content": "British-era landmark at the town center." },
    { "title": "Kodhayar Dam", "city": "Upper Kodhayar", "content": "Scenic reservoir surrounded by forested hills." },
    { "title": "Pechiparai Dam", "city": "Pechiparai", "content": "Popular picnic spot amidst lush greenery." }
  ],
  "religious_sites": [
    { "title": "Mandaikadu Bhagavathi Amman Temple", "city": "Mandaikadu", "content": "Popular shrine for women devotees during annual festival." },
    { "title": "St. Francis Xavier’s Cathedral", "city": "Kottar", "content": "Cathedral built over the saint’s original chapel." },
    { "title": "Adikesava Perumal Temple", "city": "Thiruvattar", "content": "Ancient temple of reclining Vishnu, older than Padmanabhaswamy Temple." },
    { "title": "Sthanumalayan Temple", "city": "Suchindram", "content": "Noted for musical pillars and 22-foot Hanuman statue." },
    { "title": "Nagaraja Temple", "city": "Nagercoil", "content": "Snake deity temple with sand floor in sanctum." }
  ],
  "hill_stations_and_trekking": [
    { "title": "Muthukuzhivayal Hills", "city": "Boothapandi", "content": "Hiking spot with valley and sea views." },
    { "title": "Kuthiraimalai Viewpoint", "city": "Keeriparai", "content": "Offers breathtaking views of the Western Ghats." },
    { "title": "Kalikesam", "city": "Keeriparai", "content": "Forest area with river bathing spots." },
    { "title": "Upper Kodhayar", "city": "Kodhayar", "content": "Cool climate, tea plantations, and wildlife sightings." },
    { "title": "Marunthuvazh Malai", "city": "Kottaram", "content": "Sacred hill linked to Ramayana legend of Sanjeevani herb." }
  ],
  "offbeat_and_village_spots": [
    { "title": "Kovalam Beach (Kanniyakumari)", "city": "Kovalam", "content": "Quiet fishing village with serene beach." },
    { "title": "Eraniel Palace Ruins", "city": "Eraniel", "content": "Remnants of a Travancore-era royal palace." },
    { "title": "Therur Village", "city": "Therur", "content": "Traditional Tamil fishing village with cultural charm." },
    { "title": "Parakkai Lake", "city": "Parakkai", "content": "Birdwatching site with lotus-filled waters." },
    { "title": "Rajakkamangalam Estuary", "city": "Rajakkamangalam", "content": "Scenic backwater meeting the sea." }
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
          Top Attractions in Kanniyakumari
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

export default Kanniyakumari;
