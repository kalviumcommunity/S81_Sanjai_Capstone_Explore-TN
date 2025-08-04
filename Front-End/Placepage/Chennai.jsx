import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md';

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
function Chennai() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription = "Chennai, the capital city of Tamil Nadu, is a vibrant blend of rich cultural heritage, historic landmarks, and modern attractions. Known for its pristine beaches, ancient temples, colonial-era architecture, and bustling shopping districts, Chennai offers something for every traveler. From the serene Marina Beach to the majestic Kapaleeshwarar Temple, the city embodies tradition and progress in perfect harmony. Whether you explore the artistic exhibits at the Government Museum or enjoy the thrilling rides at VGP Universal Kingdom, Chennai promises an unforgettable experience.";

  const places = {
    Beaches: [
      { title: "Marina Beach, Chennai", content: "One of the longest beaches in the world.", image: "https://media.gettyimages.com/id/624091590/photo/marina-beach-chennai-city.jpg?s=612x612&w=0&k=20&c=E5J4odZa-ZHIt9QCk_iZKQS57p67fvb2VuOAaxQgWEo=" },
      { title: "Elliot’s Beach, Chennai", content: "A calm beach known for its peaceful atmosphere.", image: "https://chennaitourism.travel/images/places-to-visit/headers/edward-elliot-s-beach-chennai-tourism-entry-fee-timings-holidays-reviews-header.jpg" },
      { title: "Breezy Beach, Chennai", content: "A small yet beautiful beach in Chennai.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/c6/d9/4d/thiruvanmiyur-sea-beach.jpg?w=800&h=-1&s=1" },
      { title: "Thiruvanmiyur Beach, Chennai", content: "A less crowded and serene beach.", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thiruvanmiyur-beach-1656504132_f41b6605537f2931f14e.webp" }
    ],
    Historical: [
      { title: "Fort St. George, Chennai", content: "One of the oldest British forts in India.", image: "https://tse2.mm.bing.net/th?id=OIP.0kzUrmsyVSKh8BrbNnqZBwHaDW&pid=Api&P=0&h=180" },
      { title: "Santhome Basilica, Chennai", content: "A neo-Gothic church built over St. Thomas' tomb.", image: "https://tse2.mm.bing.net/th?id=OIP.3ff1cvjOKpD1FOdxUcBupAHaE0&pid=Api&P=0&h=180" },
      { title: "Kapaleeshwarar Temple, Chennai", content: "A famous temple dedicated to Lord Shiva.", image: "/images/kapaleeshwarar.jpg" },
      { title: "Valluvar Kottam, Chennai", content: "A monument dedicated to Tamil poet Thiruvalluvar.", image: "/images/valluvar.jpg" },
      { title: "Parthasarathy Temple, Chennai", content: "An ancient temple dedicated to Lord Krishna.", image: "/images/parthasarathy.jpg" }
    ],
    Museums: [
      { title: "Government Museum, Chennai", content: "A vast collection of archaeological exhibits.", image: "/images/govtmuseum.jpg" },
      { title: "Vivekananda House, Chennai", content: "Where Swami Vivekananda stayed during his visit.", image: "/images/vivekananda.jpg" },
      { title: "DakshinaChitra, Chennai", content: "A cultural heritage museum.", image: "/images/dakshinachitra.jpg" },
      { title: "Periyar Science and Technology Centre, Chennai", content: "An educational science museum.", image: "/images/periyar.jpg" }
    ],
    Nature: [
      { title: "Guindy National Park, Chennai", content: "A protected green space with diverse fauna.", image: "/images/guindy.jpg" },
      { title: "Madras Crocodile Bank, Chennai", content: "A reptile conservation center.", image: "/images/crocodile.jpg" },
      { title: "Theosophical Society, Chennai", content: "A peaceful green retreat in the city.", image: "/images/theosophical.jpg" },
      { title: "Adyar Eco Park, Chennai", content: "A lush green ecological park for nature lovers.", image: "/images/adyar.jpg" }
    ],
    Entertainment: [
      { title: "MGR Film City, Chennai", content: "A studio complex showcasing Tamil cinema.", image: "/images/mgrfilm.jpg" },
      { title: "VGP Marine Kingdom, Chennai", content: "An immersive aquarium experience.", image: "/images/vgpmarine.jpg" },
      { title: "Birla Planetarium, Chennai", content: "An interactive space science museum.", image: "/images/birla.jpg" },
      { title: "VGP Universal Kingdom, Chennai", content: "An amusement park with thrilling rides.", image: "/images/vgpkingdom.jpg" },
      { title: "Queensland, Chennai", content: "A popular theme park in Chennai.", image: "/images/queensland.jpg" }
    ]
  };

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:8000/User/favorites", {
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
      "http://localhost:8000/User/favorites",
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
          Top Attractions in Chennai
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

export default Chennai;
