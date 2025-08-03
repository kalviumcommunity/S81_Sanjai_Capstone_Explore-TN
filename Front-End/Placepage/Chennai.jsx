import React from 'react';

// Enhanced Card Component
const Card = ({ title, content, image }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img 
        src={image || 'https://via.placeholder.com/400'} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{title}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

// Enhanced Section Component
const Section = ({ title, places }) => {
  const gridCols = places.length % 3 === 0 || places.length === 5 ? 'md:grid-cols-3' : 'md:grid-cols-4';
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-100 border-l-4 border-blue-500 pl-4 mb-6 uppercase">{title}</h2>
      <div className={`grid grid-cols-1 ${gridCols} gap-8 p-4`}>
        {places.map((place, index) => (
          <Card key={index} title={place.title} content={place.content} image={place.image} />
        ))}
      </div>
    </div>
  );
};

function Chennai() {
  const cityDescription = "Chennai, the capital city of Tamil Nadu, is a vibrant blend of rich cultural heritage, historic landmarks, and modern attractions. Known for its pristine beaches, ancient temples, colonial-era architecture, and bustling shopping districts, Chennai offers something for every traveler. From the serene Marina Beach to the majestic Kapaleeshwarar Temple, the city embodies tradition and progress in perfect harmony. Whether you explore the artistic exhibits at the Government Museum or enjoy the thrilling rides at VGP Universal Kingdom, Chennai promises an unforgettable experience.";

  const places = {
    Beaches: [
      { title: "Marina Beach", content: "One of the longest beaches in the world.", image: "https://media.gettyimages.com/id/624091590/photo/marina-beach-chennai-city.jpg?s=612x612&w=0&k=20&c=E5J4odZa-ZHIt9QCk_iZKQS57p67fvb2VuOAaxQgWEo=" },
      { title: "Elliot’s Beach", content: "A calm beach known for its peaceful atmosphere.", image: "https://chennaitourism.travel/images/places-to-visit/headers/edward-elliot-s-beach-chennai-tourism-entry-fee-timings-holidays-reviews-header.jpg" },
      { title: "Breezy Beach", content: "A small yet beautiful beach in Chennai.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/c6/d9/4d/thiruvanmiyur-sea-beach.jpg?w=800&h=-1&s=1" },
      { title: "Thiruvanmiyur Beach", content: "A less crowded and serene beach.", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thiruvanmiyur-beach-1656504132_f41b6605537f2931f14e.webp" }
    ],
    Historical: [
      { title: "Fort St. George", content: "One of the oldest British forts in India.", image: "https://tse2.mm.bing.net/th?id=OIP.0kzUrmsyVSKh8BrbNnqZBwHaDW&pid=Api&P=0&h=180" },
      { title: "Santhome Basilica", content: "A neo-Gothic church built over St. Thomas' tomb.", image: "https://tse2.mm.bing.net/th?id=OIP.3ff1cvjOKpD1FOdxUcBupAHaE0&pid=Api&P=0&h=180" },
      { title: "Kapaleeshwarar Temple", content: "A famous temple dedicated to Lord Shiva.", image: "/images/kapaleeshwarar.jpg" },
      { title: "Valluvar Kottam", content: "A monument dedicated to Tamil poet Thiruvalluvar.", image: "/images/valluvar.jpg" },
      { title: "Parthasarathy Temple", content: "An ancient temple dedicated to Lord Krishna.", image: "/images/parthasarathy.jpg" }
    ],
    Museums: [
      { title: "Government Museum", content: "A vast collection of archaeological exhibits.", image: "/images/govtmuseum.jpg" },
      { title: "Vivekananda House", content: "Where Swami Vivekananda stayed during his visit.", image: "/images/vivekananda.jpg" },
      { title: "DakshinaChitra", content: "A cultural heritage museum.", image: "/images/dakshinachitra.jpg" },
      { title: "Periyar Science and Technology Centre", content: "An educational science museum.", image: "/images/periyar.jpg" }
    ],
    Nature: [
      { title: "Guindy National Park", content: "A protected green space with diverse fauna.", image: "/images/guindy.jpg" },
      { title: "Madras Crocodile Bank", content: "A reptile conservation center.", image: "/images/crocodile.jpg" },
      { title: "Theosophical Society", content: "A peaceful green retreat in the city.", image: "/images/theosophical.jpg" },
      { title: "Adyar Eco Park", content: "A lush green ecological park for nature lovers.", image: "/images/adyar.jpg" }
    ],
    Entertainment: [
      { title: "MGR Film City", content: "A studio complex showcasing Tamil cinema.", image: "/images/mgrfilm.jpg" },
      { title: "VGP Marine Kingdom", content: "An immersive aquarium experience.", image: "/images/vgpmarine.jpg" },
      { title: "Birla Planetarium", content: "An interactive space science museum.", image: "/images/birla.jpg" },
      { title: "VGP Universal Kingdom", content: "An amusement park with thrilling rides.", image: "/images/vgpkingdom.jpg" },
      { title: "Queensland", content: "A popular theme park in Chennai.", image: "/images/queensland.jpg" }
    ]
  };

  return (
    <div className="p-8  min-h-screen">
      <div className="bg-gray-950 text-gray-300 p-10 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 uppercase mb-4">
          Top Attractions in Chennai
        </h1>
        <p className="text-lg font-light leading-relaxed">{cityDescription}</p>
      </div>
      <div className="mt-12">
        {Object.entries(places).map(([category, items], index) => (
          <Section key={index} title={category} places={items} />
        ))}
      </div>
    </div>
  );
}

export default Chennai;
