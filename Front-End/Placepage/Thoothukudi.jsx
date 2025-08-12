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
function Thoothukudi() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  const cityDescription =
    "Thoothukudi, famously called the Pearl City, is a bustling port town along Tamil Nadu’s southeast coast. Known for its pearl fishing heritage, stunning beaches, and vibrant maritime trade, it’s also home to ancient temples, historic churches, and serene coastal villages. From the divine aura of Tiruchendur Murugan Temple to the rich biodiversity of the Gulf of Mannar Marine National Park, Thoothukudi offers travelers a unique blend of culture, spirituality, and seaside charm, all wrapped in the warmth of its local traditions"

;

const places = {
  "temples": [
    { "title": "Our Lady of Snows Basilica", "city": "Thoothukudi", "content": "Historic Catholic basilica known for its annual festival and large pilgrim turnout." },
    { "title": "Tiruchendur Murugan Temple", "city": "Tiruchendur", "content": "One of the six abodes of Lord Muruga located on the seashore." },
    { "title": "Sri Vaikuntam Perumal Temple", "city": "Srivaikuntam", "content": "Important Vaishnava shrine among the Nava Tirupathi temples." },
    { "title": "Azhwarthirunagari Temple", "city": "Azhwarthirunagari", "content": "Birthplace of Nammalvar and a celebrated Divya Desam." },
    { "title": "Thirupuliangudi Perumal Temple", "city": "Thirupuliangudi", "content": "Seaside Vishnu temple with unique legends and rituals." },
    { "title": "Irattai Tirupathi Temples", "city": "Tholaivillimangalam", "content": "Historic twin Vishnu shrines with sacred lore." },
    { "title": "Kulasekarapattinam Mutharamman Temple", "city": "Kulasekarapattinam", "content": "Famous for its Dasara and village traditions." },
    { "title": "Ettayapuram Kasi Viswanathar Temple", "city": "Ettayapuram", "content": "Shiva temple in the town of famed poet Subramania Bharati." },
    { "title": "Korkai Vinayagar Temple", "city": "Korkai", "content": "Ancient Ganesha shrine in the old Pandya port region." },
    { "title": "Panchalankurichi Temple", "city": "Panchalankurichi", "content": "Local shrine near the memorial fort of Veerapandiya Kattabomman." },
    { "title": "Thenthiruperai Temple", "city": "Thenthiruperai", "content": "Historic Vishnu temple associated with regional legends." },
    { "title": "Kayalpattinam Masjid Shrine", "city": "Kayalpattinam", "content": "Historic mosque complex reflecting centuries of trade links." },
    { "title": "Swarna Venkatesa Perumal Temple", "city": "Thoothukudi", "content": "Local Vishnu temple known for community festivals." },
    { "title": "Our Lady of Snows Grotto", "city": "Thoothukudi", "content": "Sacred grotto adjacent to the basilica frequented by pilgrims." },
    { "title": "Arulmigu Muthuramalinga Thevar Temple", "city": "Thoothukudi outskirts", "content": "Shrine dedicated to a local deity with yearly observances." },
    { "title": "Sankaranarayanar Temple", "city": "Thoothukudi region", "content": "Unique temple where Shiva and Vishnu are worshipped together." },
    { "title": "Kovilpatti Ayyanar Temple", "city": "Kovilpatti", "content": "Folk-deity temple famed for vibrant rural rituals." },
    { "title": "Vadakku Veli Perumal Temple", "city": "Thoothukudi", "content": "Small temple with an active local congregation." },
    { "title": "Vembar Amman Temple", "city": "Vembar", "content": "Coastal Amman shrine popular among fishing communities." },
    { "title": "Sekkadu Sivan Temple", "city": "Sekkadu", "content": "Ancient Shiva temple noted for stone work and festivals." },
    { "title": "Perungulam Murugan Temple", "city": "Perungulam", "content": "Murugan temple on the outskirts, ideal for quiet visits." },
    { "title": "Ottapidaram Mariamman Temple", "city": "Ottapidaram", "content": "Village goddess temple with colorful annual celebrations." },
    { "title": "Vembar Marundeeswarar Temple", "city": "Vembar", "content": "Coastal shrine with local healing traditions." },
    { "title": "Kumaran Temple, Kovilpatti", "city": "Kovilpatti", "content": "Hill-facing temple visited by devotees from nearby villages." },
    { "title": "Vellangallur Amman Temple", "city": "Thoothukudi district", "content": "Traditional village Amman temple with community rites." }
  ],
  "historic_sites": [
    { "title": "Ettayapuram Palace", "city": "Ettayapuram", "content": "Palace of Ettayapuram zamindars and cultural hub." },
    { "title": "Veerapandiya Kattabomman Memorial Fort", "city": "Panchalankurichi", "content": "Memorial and fort honoring the famed freedom fighter." },
    { "title": "Korkai Ancient Port Ruins", "city": "Korkai", "content": "Archaeological site of the ancient Pandya port and trade center." },
    { "title": "Kayalpattinam Heritage Streets", "city": "Kayalpattinam", "content": "Old town lanes showing Arab-influenced architecture and trade history." },
    { "title": "Tuticorin (Thoothukudi) Old Harbour", "city": "Thoothukudi Port Area", "content": "Historic harbor area that evolved into a major modern port." },
    { "title": "Manapad Holy Cross Church", "city": "Manapad", "content": "16th-century church associated with early European missionaries." },
    { "title": "Thoothukudi Saltworks Heritage", "city": "Thoothukudi", "content": "Historic salt pans that shaped local industry and economy." },
    { "title": "Tiruchendur Seashore Remains", "city": "Tiruchendur", "content": "Old coastal defense remains and temple precincts." },
    { "title": "Ettayapuram Bharathiar Memorial", "city": "Ettayapuram", "content": "Commemorative site for poet Subramania Bharati." },
    { "title": "Kilakarai Old Mosque Complex", "city": "Kilakarai", "content": "Historic mosque complex reflecting maritime trade heritage." },
    { "title": "Panchalankurichi War Memorial", "city": "Panchalankurichi", "content": "Site marking resistance and local history." },
    { "title": "Ottapidaram Colonial Bungalow Ruins", "city": "Ottapidaram", "content": "Remnants of colonial-era buildings and plantations." },
    { "title": "Tuticorin WWII Battery Remains", "city": "Tuticorin coast", "content": "Old coastal battery positions from wartime history." },
    { "title": "Vembar Trading Post Ruins", "city": "Vembar", "content": "Small remains of old trading infrastructure used by coastal merchants." },
    { "title": "Tuticorin Lighthouse (Old site)", "city": "Thoothukudi", "content": "Historic lighthouse location used by sailors in earlier centuries." }
  ],
  "beaches_and_coast": [
    { "title": "Manapad Beach", "city": "Manapad", "content": "Scenic beach with a unique conch-shaped shoreline and historic church nearby." },
    { "title": "Tiruchendur Beach", "city": "Tiruchendur", "content": "Holy seaside spot in front of the Murugan temple." },
    { "title": "Punnakayal Beach", "city": "Punnakayal", "content": "Quiet coastal stretch with calm waters and local fishing activity." },
    { "title": "Tuticorin Harbour Front", "city": "Thoothukudi", "content": "Bustling port area offering sunset views and ship-watching." },
    { "title": "Kayalpattinam Beach", "city": "Kayalpattinam", "content": "Local beach with colorful fishing boats and shoreline markets." },
    { "title": "Kulasekarapattinam Beach", "city": "Kulasekarapattinam", "content": "Calm beach near the temple town—great for early morning walks." },
    { "title": "Vembar Coastal Stretch", "city": "Vembar", "content": "Less-crowded shoreline frequented by villagers." },
    { "title": "Olakaruvi Cove", "city": "Thoothukudi coastline", "content": "Small scenic cove ideal for photography and quiet time." },
    { "title": "Korkai Shoreline", "city": "Korkai", "content": "Historic shoreline with archaeological significance." },
    { "title": "Pamban-like Viewpoints", "city": "Tuticorin nearby", "content": "Elevated coastal viewpoints with wide sea vistas." }
  ],
  "wildlife_and_sanctuary": [
    { "title": "Hare Island", "city": "Thoothukudi", "content": "Small island accessible by boat, popular for birdwatching and scenic walks." },
    { "title": "Muthupet Mangrove Area (nearby)", "city": "Muthupet", "content": "Dense mangrove channels and biodiversity—boat trips available." },
    { "title": "Vaippar Estuary Bird Pockets", "city": "Vaippar", "content": "Estuarine habitats attracting many coastal birds." },
    { "title": "Kayalpattinam Coastal Patches", "city": "Kayalpattinam", "content": "Small mangrove patches with migratory bird visitors." },
    { "title": "Kulasekarapattinam Tidal Flats", "city": "Kulasekarapattinam", "content": "Feeding grounds for shorebirds at low tide." },
    { "title": "Tuticorin Marine Watchpoints", "city": "Thoothukudi coast", "content": "Good viewpoints for marine life and occasional dolphin sightings." },
    { "title": "Punnakayal Lagoon Pockets", "city": "Punnakayal", "content": "Shallow lagoon areas favored by waders and migratory species." },
    { "title": "Vedharanyam–Vedaranyam bird strips", "city": "nearby", "content": "Extended coastal wetlands known for flamingos in season." }
  ],
  "cultural_and_festivals": [
    { "title": "Our Lady of Snows Festival", "city": "Thoothukudi", "content": "Major annual Catholic festival with processions, masses and community events." },
    { "title": "Tiruchendur Panguni Uthiram", "city": "Tiruchendur", "content": "Grand Murugan chariot festival held on the beach." },
    { "title": "Kulasekarapattinam Dasara", "city": "Kulasekarapattinam", "content": "Local Dasara festivities infused with rural traditions." },
    { "title": "Kayalpattinam Ramadan Street Fest", "city": "Kayalpattinam", "content": "Evening bazaars and special prayers during Ramadan." },
    { "title": "Ettayapuram Cultural Fair", "city": "Ettayapuram", "content": "Festival celebrating local music, poetry and folk arts." },
    { "title": "Nava Tirupathi Garuda Sevai", "city": "Thoothukudi district", "content": "Annual gathering where nine temple idols travel in procession." },
    { "title": "Manapad Holy Cross Feast", "city": "Manapad", "content": "Religious observance drawing pilgrims to the historic cross." },
    { "title": "Fishing Boat Blessing Event", "city": "Tuticorin coast", "content": "Local blessing ceremonies for fishing fleets before monsoon." },
    { "title": "Salt Workers’ Harvest Festival", "city": "Salt pans area", "content": "Celebration among salt pan communities after harvest season." },
    { "title": "Tamil New Year at Temple Tanks", "city": "Various", "content": "Community rituals and small fairs across district temples." }
  ],
  "scenic_nature": [
    { "title": "Harbor Sunset Viewpoint", "city": "Thoothukudi", "content": "Panoramic vantage for spectacular sunsets over the port." },
    { "title": "Salt Pans Viewing Trails", "city": "Thoothukudi", "content": "Glittering salt fields that make striking sunrise/sunset photos." },
    { "title": "Vaippar Backwaters", "city": "Vaippar", "content": "Quiet backwater channels ideal for small boat rides." },
    { "title": "Ottapidaram Countryside Walk", "city": "Ottapidaram", "content": "Scenic rural trails through fields and ponds." },
    { "title": "Ettayapuram Agricultural Terraces", "city": "Ettayapuram outskirts", "content": "Green stretches reflecting seasonal farming patterns." },
    { "title": "Kalangadi Hillock", "city": "Thoothukudi district", "content": "Small hill spot with views over coastal plains." },
    { "title": "Manapad Coastal Cliffs", "city": "Manapad", "content": "Rocky cliffs offering dramatic sea views." },
    { "title": "Korkai Sunset Point", "city": "Korkai", "content": "Historic shoreline viewpoint, great for golden hour photos." },
    { "title": "Tuticorin Urban Garden Spaces", "city": "Thoothukudi", "content": "Well-kept city parks for morning/evening relaxation." },
    { "title": "Kayalpattinam Fishing Lane Views", "city": "Kayalpattinam", "content": "Bustling but photogenic fishing streets at dawn." }
  ],
  "museums_and_heritage": [
    { "title": "Tuticorin Maritime Museum", "city": "Thoothukudi", "content": "Exhibits on port history, pearl trade and sea commerce." },
    { "title": "Ettayapuram Bharathiar Memorial Museum", "city": "Ettayapuram", "content": "Museum honoring poet Subramania Bharati with manuscripts and memorabilia." },
    { "title": "Kayalpattinam Heritage Center", "city": "Kayalpattinam", "content": "Small center documenting Arab-trade links and local culture." },
    { "title": "Pearling History Exhibit", "city": "Thoothukudi", "content": "Experimental exhibit about historic pearl diving and commerce." },
    { "title": "Manapad Church Museum", "city": "Manapad", "content": "Religious artifacts and colonial-era relics near the church." },
    { "title": "Salt Industry Display", "city": "Thoothukudi salt belt", "content": "Small interpretive exhibit about traditional salt making." }
  ],
  "other_spots": [
    { "title": "Tuticorin Central Market", "city": "Thoothukudi", "content": "Bustling market for fish, spices and local produce." },
    { "title": "Fish Auction Wharf", "city": "Thoothukudi port", "content": "Active fish auction area offering a slice of local economy." },
    { "title": "Kayalpattinam Boatyard", "city": "Kayalpattinam", "content": "Small traditional boat-building yards along the shore." },
    { "title": "Tuticorin Fish Processing Units", "city": "Thoothukudi industrial zone", "content": "Large processing hubs of the seafood industry." },
    { "title": "Salt Workers Village", "city": "Salt pan region", "content": "Communities centered around traditional salt production." },
    { "title": "Kayalpattinam Spice Lane", "city": "Kayalpattinam", "content": "Narrow lanes selling local spices and sundried catch." },
    { "title": "Kulasekarapattinam Fishing Harbor", "city": "Kulasekarapattinam", "content": "Small harbor with colorful boats and early-morning auctions." },
    { "title": "Ottapidaram Weavers' Bazar", "city": "Ottapidaram", "content": "Handloom stalls showcasing local textile craft." }
  ],
  "hidden_gems": [
    { "title": "Kayalpattinam Old Arabic Manuscripts", "city": "Kayalpattinam", "content": "Local libraries with centuries-old Arabic and Persian manuscripts." },
    { "title": "Tuticorin Pearl Trade Alley", "city": "Thoothukudi", "content": "Narrow alley with remnants of old pearl-trade shops and stories." },
    { "title": "Manapad Surfing Cove", "city": "Manapad", "content": "Small surf-friendly cove known to local surfers." },
    { "title": "Vembar Fishermen's Cultural Shed", "city": "Vembar", "content": "Informal community space where fishermen tell sea tales." },
    { "title": "Korkai Archaeological Trench", "city": "Korkai", "content": "Occasional small digs and exposed pottery fragments along the shore." },
    { "title": "Tuticorin Rooftop Sundowner Spots", "city": "Thoothukudi", "content": "Rooftop vantage points for unobstructed harbour sunsets." },
    { "title": "Salt Pan Mosaic Fields", "city": "Salt belt", "content": "Geometric white salt patterns best seen at sunrise." },
    { "title": "Ottapidaram Hidden Ponds", "city": "Ottapidaram", "content": "Small secluded ponds frequented by local birdlife." },
    { "title": "Kayalpattinam Spice & Seafood Alley", "city": "Kayalpattinam", "content": "Tiny alley where spice vendors and fish sellers trade at dawn." },
    { "title": "Manapad Lighthouse View Nook", "city": "Manapad", "content": "Quiet vantage near the historic coast lighthouse." }
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
          Top Attractions in Thoothukudi
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

export default Thoothukudi;
