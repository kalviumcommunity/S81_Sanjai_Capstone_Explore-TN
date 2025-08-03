import React from 'react';

const Card = ({ title, content, image,city }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={image || 'https://via.placeholder.com/400'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">{title} ({city})</h2>
        <h3 className='text-xl font-semibold mb-2 text-gray-100'></h3>
        <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

const Section = ({ title, places }) => {
  let mainPlaces = places;
  let lastTwoPlaces = [];

  let gridCols = 'md:grid-cols-4'; 

  if (places.length === 10) {
    mainPlaces = places.slice(0, 8);
    lastTwoPlaces = places.slice(8);
    gridCols = 'md:grid-cols-4'; 
  } else if (places.length === 2) {
    gridCols = 'md:grid-cols-2';
  } else if (places.length === 5) {
    mainPlaces = places.slice(0, 3);
    lastTwoPlaces = places.slice(3);
    gridCols = 'md:grid-cols-3';
  } else if (places.length % 3 === 0) {
    gridCols = 'md:grid-cols-3';
  }

  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-gray-100 border-l-4 border-blue-500 pl-4 mb-6 uppercase">
        {title}
      </h2>

      {/* First Main Places */}
      <div className={`grid grid-cols-1 ${gridCols} gap-8 p-4`}>
        {mainPlaces.map((place, index) => (
          <Card
            key={index}
            title={place.title}
            city={place.city}
            content={place.content}
            image={place.image}
          />
        ))}
      </div>

      {/* Last Two Places (if any) */}
      {lastTwoPlaces.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 mt-8">
          {lastTwoPlaces.map((place, index) => (
            <Card
              key={`last-${index}`}
              title={place.title}
              city={place.city}
              content={place.content}
              image={place.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};



function Dindigul() {
  const cityDescription = "Dindigul district, located in Tamil Nadu, is known for its rich history, scenic hill stations, and thriving agriculture. Home to the majestic Dindigul Fort, the lush greenery of Kodaikanal, and a variety of cultural landmarks, the district offers a blend of heritage, nature, and tradition.";
  ;

  const places = {
    "Nature, Hills & Scenic Spots": [
      { "title": "Kodaikanal", "city": "Kodaikanal" },
      { "title": "Berijam Lake", "city": "Kodaikanal" },
      { "title": "Coaker's Walk", "city": "Kodaikanal" },
      { "title": "Bryant Park", "city": "Kodaikanal" },
      { "title": "Silver Cascade Falls", "city": "Kodaikanal" },
      { "title": "Guna Caves", "city": "Kodaikanal" },
      { "title": "Dolphin’s Nose", "city": "Kodaikanal" },
      { "title": "Pine Forest", "city": "Kodaikanal" },
      { "title": "Pillar Rocks", "city": "Kodaikanal" },
      { "title": "Moir Point", "city": "Kodaikanal" },
      { "title": "Mannavanur Lake", "city": "Kodaikanal" },
      { "title": "Poombarai Village", "city": "Kodaikanal" },
      { "title": "Vattakanal", "city": "Kodaikanal" },
      { "title": "Kurinji Andavar Temple Hill", "city": "Kodaikanal" },
      { "title": "Thalaiyar Falls (Rat Tail Falls)", "city": "Kodaikanal" },
      { "title": "Perumal Peak", "city": "Kodaikanal" },
      { "title": "Silent Valley View Point", "city": "Kodaikanal" },
      { "title": "Upper Lake View Point", "city": "Kodaikanal" },
      { "title": "Chettiar Park", "city": "Kodaikanal" },
      { "title": "Pambar Falls", "city": "Kodaikanal" },
      { "title": "Bear Shola Falls", "city": "Kodaikanal" },
      { "title": "Fairy Falls", "city": "Kodaikanal" },
      { "title": "Green Valley View (Suicide Point)", "city": "Kodaikanal" },
      { "title": "Caps Valley View", "city": "Kodaikanal" },
      { "title": "Gundar Falls", "city": "Kodaikanal" },
      { "title": "Sirumalai Hills", "city": "Sirumalai" },
      { "title": "Sanjeevani Hills", "city": "Kodaikanal" },
      { "title": "Selvi Koil Point", "city": "Kodaikanal" },
      { "title": "Kamarajar Lake", "city": "Kodaikanal" },
      { "title": "Kumbakkarai Falls", "city": "Kodaikanal" },
      { "title": "Agamalai Reserve Forest", "city": "Kodaikanal" },
      { "title": "Elephant Valley", "city": "Kodaikanal" },
      { "title": "Kuthiraiyar Dam Falls", "city": "Kodaikanal" },
      { "title": "Vellimalai Forest View", "city": "Vellimalai" },
      { "title": "Gundar Valley", "city": "Kodaikanal" }
    ],
    "Temples & Religious Sites": [
      { "title": "Palani Murugan Temple", "city": "Palani" },
      { "title": "Periyanayaki Amman Temple", "city": "Dindigul" },
      { "title": "Soundararaja Perumal Temple, Thadikombu", "city": "Dindigul" },
      { "title": "Kottai Mariamman Temple", "city": "Dindigul" },
      { "title": "Abirami Amman Temple", "city": "Dindigul" },
      { "title": "Vellimalai Murugan Temple, Sirumalai", "city": "Sirumalai" },
      { "title": "Kalainathaswamy Temple", "city": "Dindigul" },
      { "title": "Bala Murugan Temple, Kodaikanal", "city": "Kodaikanal" },
      { "title": "Ayyappan Temple, Palani", "city": "Palani" },
      { "title": "Anjaneyar Temple, Sirumalai", "city": "Sirumalai" },
      { "title": "Mariamman Temple, Batlagundu", "city": "Batlagundu" },
      { "title": "Veera Raghava Perumal Temple", "city": "Dindigul" },
      { "title": "Vaitheeswaran Temple, Oddanchatram", "city": "Oddanchatram" },
      { "title": "Ramar Temple, Palani", "city": "Palani" },
      { "title": "Thenkailayam Temple", "city": "Dindigul" }
    ],
    "Forts, Churches & Heritage Sites": [
      { "title": "Dindigul Rock Fort", "city": "Dindigul" },
      { "title": "Begambur Big Mosque", "city": "Dindigul" },
      { "title": "Saint Joseph Church", "city": "Dindigul" },
      { "title": "Dutch Fort Ruins (Kodaikanal)", "city": "Kodaikanal" },
      { "title": "CSI Christ the King Church, Kodaikanal", "city": "Kodaikanal" },
      { "title": "St. Antony’s Church, Palani", "city": "Palani" },
      { "title": "Kodaikanal Observatory", "city": "Kodaikanal" },
      { "title": "Ghat Road Watch Tower", "city": "Dindigul" },
      { "title": "Jain Sculpture Site, Pudukkottai", "city": "Pudukkottai" }
    ],
    "Villages & Cultural Spots": [
      { "title": "Athoor Village", "city": "Dindigul" },
      { "title": "Chinnalapatti (Saree Weaving)", "city": "Dindigul" },
      { "title": "Vedasandur", "city": "Dindigul" },
      { "title": "Oddanchatram Vegetable Market", "city": "Oddanchatram" },
      { "title": "Aathupalam Check Dam", "city": "Dindigul" },
      { "title": "Reddiarchatram", "city": "Dindigul" },
      { "title": "Batlagundu", "city": "Dindigul" },
      { "title": "Seelapadi", "city": "Dindigul" },
      { "title": "Puduchatram", "city": "Dindigul" },
      { "title": "Nilakottai (Jewelry Market)", "city": "Dindigul" },
      { "title": "Vembarpatti", "city": "Dindigul" },
      { "title": "Kodaikanal Organic Market", "city": "Kodaikanal" }
    ],
    "Lakes, Dams & Forests": [
      { "title": "Kodaikanal Lake", "city": "Kodaikanal" },
      { "title": "Berijam Lake", "city": "Kodaikanal" },
      { "title": "Kamarajar Sagar Dam", "city": "Dindigul" },
      { "title": "Sothuparai Dam", "city": "Dindigul" },
      { "title": "Shanmuganathi Dam", "city": "Dindigul" },
      { "title": "Sirumalai Lake", "city": "Sirumalai" },
      { "title": "Kumbapatti Lake", "city": "Dindigul" },
      { "title": "Pannaikadu Lake", "city": "Kodaikanal" },
      { "title": "Amaravathi Reserve Forest", "city": "Dindigul" },
      { "title": "Chinnakodaikanal Forest Area", "city": "Kodaikanal" },
      { "title": "Adukkam View Forest", "city": "Kodaikanal" },
      { "title": "Palani Hills Wildlife Sanctuary", "city": "Palani" },
      { "title": "Mannavanur Sheep Farm", "city": "Kodaikanal" }
    ],
    "Hidden Gems & Viewpoints": [
      { "title": "Pazhamputhur View Point", "city": "Kodaikanal" },
      { "title": "Thandikudi Hills", "city": "Kodaikanal" },
      { "title": "Keelavalavu Rock Caves", "city": "Kodaikanal" },
      { "title": "Kavunji Valley", "city": "Kodaikanal" },
      { "title": "Kodaikanal Solar Observatory", "city": "Kodaikanal" },
      { "title": "Kookal Village", "city": "Kodaikanal" },
      { "title": "Kookal Lake", "city": "Kodaikanal" },
      { "title": "Poondi View Point", "city": "Kodaikanal" },
      { "title": "Palani View Point", "city": "Palani" },
      { "title": "Mannavanur Forest Trails", "city": "Kodaikanal" },
      { "title": "Periyakulam Forest Route", "city": "Periyakulam" }
    ]
  }
  

  return (
    <div className="p-8 min-h-screen">
      <div className="bg-gray-950 text-gray-300 p-10 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 uppercase mb-4">
          Top Attractions in Dindugal
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

export default Dindigul;


