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

  const places = {
    "Hill Stations & Scenic Spots": [
      {"title": "Valparai", "city": "Coimbatore", "content": "A beautiful hill station with tea plantations."},
      {"title": "Nallamudi Viewpoint", "city": "Coimbatore", "content": "A scenic viewpoint offering panoramic views of the surrounding hills."},
      {"title": "Loam’s Viewpoint", "city": "Coimbatore", "content": "A popular viewpoint known for its lush greenery and calm atmosphere."},
      {"title": "Doddabetta Peak", "city": "Ooty", "content": "The highest peak in the Nilgiris, offering a panoramic view."},
      {"title": "Kundah Reservoir & Dam", "city": "Coimbatore", "content": "A serene spot known for water activities and the picturesque view."},
      {"title": "Top Slip", "city": "Coimbatore", "content": "A popular destination in the Anamalai Hills, known for its forest views."},
      {"title": "Siruvani Hills", "city": "Coimbatore", "content": "A tranquil hill station famous for the Siruvani Waterfalls."},
      {"title": "Kovaipudur", "city": "Coimbatore", "content": "A scenic town located on the foothills of the Western Ghats."},
      {"title": "Anaimalai Hills", "city": "Coimbatore", "content": "A hill range famous for its wildlife and natural beauty."},
      {"title": "Velliangiri Hills", "city": "Coimbatore", "content": "A sacred hill range, known for the Velliangiri Andavar Temple."},
      {"title": "Isha Foundation", "city": "Coimbatore", "content": "A spiritual center founded by Sadhguru, offering yoga and meditation."},
      {"title": "Sundarai Hills", "city": "Coimbatore", "content": "A beautiful hill station offering a quiet retreat."},
      {"title": "Pattissa Hill", "city": "Coimbatore", "content": "A scenic hill offering panoramic views of Coimbatore."},
      {"title": "Kundah Lake", "city": "Coimbatore", "content": "A serene lake surrounded by hills, perfect for picnics and relaxation."}
    ],
    "Waterfalls": [
      {"title": "Siruvani Waterfalls", "city": "Coimbatore", "content": "A stunning waterfall located amidst the serene Siruvani Hills."},
      {"title": "Vaideki Falls", "city": "Coimbatore", "content": "A lesser-known but beautiful waterfall hidden within the dense forest."},
      {"title": "Kovai Kutralam (Siruvani)", "city": "Coimbatore", "content": "A picturesque waterfall located near the Siruvani River."},
      {"title": "Monkey Falls", "city": "Coimbatore", "content": "A beautiful waterfall located amidst dense forests, a popular trekking destination."},
      {"title": "Sengupathi Waterfalls", "city": "Coimbatore", "content": "A serene waterfall known for its scenic beauty and peaceful surroundings."},
      {"title": "Perumal Falls", "city": "Coimbatore", "content": "A waterfall located in the Anamalai Hills."},
      {"title": "Puliampatti Waterfalls", "city": "Coimbatore", "content": "A quiet waterfall, ideal for nature lovers and photographers."},
      {"title": "Kuthiraiyar Waterfalls", "city": "Coimbatore", "content": "A hidden gem among Coimbatore’s waterfalls."},
      {"title": "Aliyar Waterfalls", "city": "Coimbatore", "content": "A scenic waterfall surrounded by lush greenery."},
      {"title": "Mini Courtallam Waterfalls", "city": "Coimbatore", "content": "Famous for its medicinal properties and scenic beauty."},
      {"title": "Anamalai Waterfalls", "city": "Coimbatore", "content": "A serene waterfall located in the Anamalai Hills."},
      {"title": "Singanallur Waterfalls", "city": "Coimbatore", "content": "A small yet charming waterfall in Coimbatore."}
    ],
    "Religious & Spiritual Sites": [
      {"title": "Adiyogi Shiva Statue", "city": "Coimbatore", "content": "A 112-foot statue of Lord Shiva, located at the Isha Foundation."},
      {"title": "Marudhamalai Hill Temple", "city": "Coimbatore", "content": "A famous hill temple dedicated to Lord Murugan."},
      {"title": "Perur Pateeswarar Temple", "city": "Coimbatore", "content": "A historic temple dedicated to Lord Shiva."},
      {"title": "Eachanari Vinayagar Temple", "city": "Coimbatore", "content": "A popular temple dedicated to Lord Ganesha."},
      {"title": "Velliangiri Andavar Temple", "city": "Coimbatore", "content": "A sacred temple located atop the Velliangiri Hills."},
      {"title": "Isha Yoga Center", "city": "Coimbatore", "content": "A popular center for meditation and yoga, also home to the Adiyogi statue."},
      {"title": "Dhyanalinga Temple", "city": "Coimbatore", "content": "A spiritual meditation center, known for its serene environment."},
      {"title": "Sri Ranganathar Swamy Temple", "city": "Coimbatore", "content": "A famous temple dedicated to Lord Vishnu."},
      {"title": "Sree Ayyappa Temple, Peelamedu", "city": "Coimbatore", "content": "A well-known temple dedicated to Lord Ayyappa."},
      {"title": "Omkar Hill", "city": "Coimbatore", "content": "A spiritual hill offering panoramic views and tranquility."},
      {"title": "Annamalai Temple", "city": "Coimbatore", "content": "A revered temple situated amidst beautiful hills."},
      {"title": "Arulmigu Karuppusamy Temple, Sirumugai", "city": "Coimbatore", "content": "A famous temple dedicated to Karuppusamy."},
      {"title": "Sri Bhavani Amman Temple, Bhavani", "city": "Coimbatore", "content": "A famous temple dedicated to Goddess Bhavani."}
    ],
    "Museums & Historical Sites": [
      {"title": "GD Naidu Museum", "city": "Coimbatore", "content": "A museum showcasing the life and contributions of GD Naidu."},
      {"title": "Coimbatore Museum", "city": "Coimbatore", "content": "A museum featuring historical artifacts from Coimbatore’s past."},
      {"title": "VOC Park and Zoo", "city": "Coimbatore", "content": "A park and zoo dedicated to various species of animals."},
      {"title": "Coimbatore Clock Tower", "city": "Coimbatore", "content": "A historic clock tower located in the city center."},
      {"title": "The Heritage Centre and Aerospace Museum", "city": "Coimbatore", "content": "A museum showcasing the heritage of Coimbatore and aerospace technology."},
      {"title": "Kovai Kalanjiyam (Museum)", "city": "Coimbatore", "content": "A museum dedicated to the history and culture of Coimbatore."}
    ],
    "Nature Reserves & Wildlife": [
      {"title": "Indira Gandhi Wildlife Sanctuary", "city": "Coimbatore", "content": "A sanctuary rich in flora and fauna, part of the Western Ghats."},
      {"title": "Anamalai Tiger Reserve", "city": "Coimbatore", "content": "A wildlife reserve known for its tigers and biodiversity."},
      {"title": "Karamadai Range Forest", "city": "Coimbatore", "content": "A forest area rich in wildlife and a popular eco-tourism destination."},
      {"title": "Pilloor Dam", "city": "Coimbatore", "content": "A dam surrounded by lush forests, offering scenic views."},
      {"title": "Baralikkadu", "city": "Coimbatore", "content": "A nature reserve known for its wildlife and picturesque scenery."},
      {"title": "Sholayar Forest", "city": "Coimbatore", "content": "A forest known for its rich biodiversity and trekking opportunities."}
    ],
    "Adventure & Amusement Parks": [
      {"title": "Black Thunder Water Theme Park", "city": "Coimbatore", "content": "A famous water theme park offering a variety of water slides and activities."},
      {"title": "Kovai Kondattam Amusement Park", "city": "Coimbatore", "content": "An amusement park with a variety of rides and attractions."},
      {"title": "Ramu's Farm", "city": "Coimbatore", "content": "A farm offering recreational activities like boating and bird watching."},
      {"title": "Sungam Ranganathar Park", "city": "Coimbatore", "content": "A beautiful park ideal for family outings and nature walks."},
      {"title": "Kovai Great Lakes Adventure", "city": "Coimbatore", "content": "An adventure park offering outdoor activities like trekking and cycling."}
    ],
    "Camping & Trekking Spots": [
      {"title": "Isha Foundation Trek", "city": "Coimbatore", "content": "A trek offering spiritual and scenic experiences."},
      {"title": "Trekking in Anamalai Hills", "city": "Coimbatore", "content": "A trekking spot famous for its biodiversity and scenic trails."},
      {"title": "Sengalimalai Trekking Spot", "city": "Coimbatore", "content": "A peaceful trek amidst nature."},
      {"title": "Topslip Forest Trek", "city": "Coimbatore", "content": "A trek through the forested region of Topslip."},
      {"title": "Rangat Hills", "city": "Coimbatore", "content": "A beautiful trekking spot with breathtaking views."},
      {"title": "Nilgiri Hills Trek", "city": "Coimbatore", "content": "A trek through the serene Nilgiri Hills."},
      {"title": "Valliyur Hills Trek", "city": "Coimbatore", "content": "A beautiful trekking route in the hills."},
      {"title": "Kundah Hills Trek", "city": "Coimbatore", "content": "A trek offering scenic views of Coimbatore and surrounding hills."}
    ],
    "Resorts & Staycations": [
      {"title": "The Orchid Resort", "city": "Coimbatore", "content": "A luxury resort with various leisure and wellness options."},
      {"title": "The Farm Resort", "city": "Coimbatore", "content": "A farm resort offering a peaceful stay amidst nature."},
      {"title": "Coco Lagoon by Great Mount Resort", "city": "Coimbatore", "content": "A premium resort offering tranquil stays and wellness facilities."},
      {"title": "Le Meridien Coimbatore", "city": "Coimbatore", "content": "A luxury hotel offering world-class amenities and views."},
      {"title": "Kovaipudur Resort", "city": "Coimbatore", "content": "A scenic resort located in Kovaipudur, offering relaxing stays."},
      {"title": "Vivanta by Taj, Coimbatore", "city": "Coimbatore", "content": "A luxurious hotel offering premium stays and top-notch services."}
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
          Top Attractions in Coimbatore
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
