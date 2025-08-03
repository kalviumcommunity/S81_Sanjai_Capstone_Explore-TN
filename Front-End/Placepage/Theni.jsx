import React from 'react';

const Card = ({ title, content, image, city }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={image || 'https://via.placeholder.com/400'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-100">
          {title} ({city})
        </h2>
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

function Theni() {
  const cityDescription =
    "Theni, a serene district in Tamil Nadu, is known for its lush green hills, waterfalls, tea estates, and cardamom plantations. It's a gateway to the Western Ghats and offers breathtaking landscapes, trekking trails, and peaceful temples.";

  const places = {
  "hill_stations": [
    { "title": "Meghamalai", "city": "Theni", "content": "High Wavy Mountains known for tea estates and wildlife." },
    { "title": "Kurangani Hills", "city": "Bodinayakkanur", "content": "A hidden trekking paradise with scenic trails." },
    { "title": "Top Station", "city": "Theni", "content": "Historic viewpoint with panoramic Western Ghats views." },
    { "title": "Kolukkumalai Tea Estate", "city": "Bodinayakkanur", "content": "World’s highest organic tea plantation." },
    { "title": "Manjalar Dam Viewpoint", "city": "Theni", "content": "A peaceful spot with scenic dam views." },
    { "title": "Perumal Malai", "city": "Theni", "content": "A quiet hill village with breathtaking sunrise points." }
  ],
  "waterfalls": [
    { "title": "Suruli Falls", "city": "Theni", "content": "Famous multi-tier waterfall in dense forests." },
    { "title": "Chinna Suruli Falls", "city": "Meghamalai", "content": "A hidden gem near Meghamalai." },
    { "title": "Kumbakkarai Falls", "city": "Periyakulam", "content": "Two-stage falls with natural pools." },
    { "title": "Thalaiyar Falls Viewpoint", "city": "Bodinayakkanur", "content": "Spectacular view of Tamil Nadu’s tallest falls." },
    { "title": "Catherine Falls Nearby", "city": "Theni Border", "content": "Remote forest waterfall for trekkers." }
  ],
  "dams_and_lakes": [
    { "title": "Vaigai Dam", "city": "Andipatti", "content": "Major dam surrounded by gardens and parks." },
    { "title": "Shanmuganathi Dam", "city": "Rayapanpatty", "content": "A tranquil picnic spot with hill views." },
    { "title": "Sothuparai Dam", "city": "Periyakulam", "content": "A peaceful dam with scenic backdrop." },
    { "title": "Manjalar Dam", "city": "Batlagundu", "content": "Located at foothills, good for quick stopovers." },
    { "title": "Mullaiperiyar Dam", "city": "Kumily Border", "content": "Historic dam near Theni’s western edge." },
    { "title": "Varusanadu Valley Lake", "city": "Theni", "content": "Serene water body amidst plantations." }
  ],
  "temples": [
    { "title": "Kuchanur Saneeswara Temple", "city": "Kuchanur", "content": "Famous temple dedicated to Lord Shani." },
    { "title": "Mavoothu Velappar Temple", "city": "Meghamalai", "content": "Hill temple hidden inside forests." },
    { "title": "Sothuparai Murugan Temple", "city": "Periyakulam", "content": "Temple near Sothuparai Dam." },
    { "title": "Sri Gowmariamman Temple", "city": "Cumbum", "content": "Important local goddess temple." },
    { "title": "Sri Vellappar Temple", "city": "Kadamalai Gundu", "content": "Historic hilltop shrine." },
    { "title": "Sri Sundaramahalingam Temple", "city": "Uthamapalayam", "content": "Popular Murugan temple in hills." },
    { "title": "Sri Kamatchi Amman Temple", "city": "Bodinayakkanur", "content": "Powerful local Amman temple." },
    { "title": "Periyakulam Balasubramanya Temple", "city": "Periyakulam", "content": "Temple on the banks of river Varaganadhi." }
  ],
  "viewpoints": [
    { "title": "Cloud Land Falls Viewpoint", "city": "Meghamalai", "content": "Popular scenic point for sunrise." },
    { "title": "Munnar Border Viewpoint", "city": "Theni Hills", "content": "Stunning view near Kerala border." },
    { "title": "Manalaru Estate View", "city": "Meghamalai", "content": "Tea garden view with valley panorama." },
    { "title": "Kurangani Viewpoint", "city": "Kurangani", "content": "Perfect for sunrise or sunset." },
    { "title": "Suruli Falls View Deck", "city": "Suruli", "content": "Viewing area for Suruli Falls." }
  ],
  "parks_and_gardens": [
    { "title": "Vaigai Dam Park", "city": "Andipatti", "content": "Well-maintained park near dam." },
    { "title": "Children’s Park Cumbum", "city": "Cumbum", "content": "Family-friendly urban park." },
    { "title": "Meghamalai Estate Gardens", "city": "Meghamalai", "content": "Lush plantation gardens open for visitors." },
    { "title": "Bodinayakkanur Municipal Park", "city": "Bodinayakkanur", "content": "Small town garden for families." }
  ],
  "historical_sites": [
    { "title": "Sothuparai Dam Heritage Bridge", "city": "Periyakulam", "content": "Old stone bridge near dam." },
    { "title": "Theni Old Market Street", "city": "Theni", "content": "Bustling street with colonial era vibes." },
    { "title": "Bodinayakkanur Old Clock Tower", "city": "Bodinayakkanur", "content": "Historic landmark of the town." },
    { "title": "Cumbum Old Railway Station", "city": "Cumbum", "content": "Vintage station showcasing local heritage." }
  ],
  "other_spots": [
    { "title": "Bodinayakkanur Cardamom Estates", "city": "Bodinayakkanur", "content": "Walk through aromatic cardamom farms." },
    { "title": "Cumbum Valley Vineyards", "city": "Cumbum", "content": "Local grape farms open for visitors." },
    { "title": "Theni Weekly Market", "city": "Theni", "content": "Colorful local produce market." },
    { "title": "Varusanadu Tea Trails", "city": "Varusanadu", "content": "Scenic trail in tea plantations." },
    { "title": "Periyakulam Mango Farms", "city": "Periyakulam", "content": "Mango orchards famous for delicious varieties." },
    { "title": "Kadamalai Gundu Forest Trails", "city": "Kadamalai Gundu", "content": "Peaceful forest trails for hiking." },
    { "title": "Chinnamanur Cotton Fields", "city": "Chinnamanur", "content": "Visit local cotton farmlands." },
    { "title": "Andipatti Paddy Fields", "city": "Andipatti", "content": "Lush green paddy fields with scenic backdrops." },
    { "title": "Bodi Mettu Checkpost", "city": "Bodinayakkanur", "content": "Entry to Kerala border hill routes." },
    { "title": "Lower Camp Forest", "city": "Lower Camp", "content": "Dense green area for nature lovers." },
    { "title": "Highwavys Wildlife Spotting", "city": "Meghamalai", "content": "Spot elephants and bison in the wild." },
    { "title": "Thekkady Nearby Activities", "city": "Border", "content": "Access to Periyar Tiger Reserve from Theni side." }
  ]
}
            

  return (
    <div className="p-8 min-h-screen">
      <div className="bg-gray-950 text-gray-300 p-10 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 uppercase mb-4">
          Top Attractions in Theni
        </h1>
        <p className="text-lg font-light leading-relaxed">{cityDescription}</p>
      </div>
      <div className="mt-12">
        {Object.entries(places).map(([category, items], index) => (
          <Section key={index} title={category.replace(/_/g, ' ')} places={items} />
        ))}
      </div>
    </div>
  );
}

export default Theni;
