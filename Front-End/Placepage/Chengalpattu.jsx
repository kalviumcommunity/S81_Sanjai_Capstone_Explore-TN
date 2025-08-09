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
function  Chengalpattu() {
    const [favorites, setFavorites] = useState([]);

    const token = localStorage.getItem('token');

    const cityDescription =
        "Chengalpattu district, nestled along Tamil Nadu’s Coromandel coast, offers a captivating mix of ancient Pallava heritage, serene beaches, vibrant wildlife reserves, cultural museums, and sacred temples—a journey spanning centuries and ecosystems.";
    const places = {
        "heritage_monuments": [
            { "title": "Sadras Fort", "city": "Sadras", "content": "17th-century Dutch fort with church, cemetery and sea views." },
            { "title": "DakshinaChitra", "city": "Muttukadu", "content": "Living museum showcasing South Indian art, architecture & crafts." },
            { "title": "Chennai-Chengalpattu Railway Station", "city": "Chengalpattu", "content": "Colonial-era station notable for its architecture." },
            { "title": "Cholamandal Artists’ Village", "city": "Chengalpattu", "content": "Creative hub for contemporary art and local artists’ works." }
        ],
        "ancient_temples": [
            { "title": "Kandhaswamy Temple", "city": "Tirupporur", "content": "Pallava-era Murugan temple; one of the 33 Murugan shrines in TN." },
            { "title": "Vedagiriswarar Temple", "city": "Thirukazhukundram", "content": "Hilltop Shiva temple where daily two eagles are said to worship." },
            { "title": "Nithya Kalyana Perumal Temple", "city": "Tiruvidanthai", "content": "1000+-year-old Varaha Perumal shrine believed to bless unmarried devotees." },
            { "title": "Srinivasa Perumal Temple", "city": "Semmenjeri", "content": "Ancient Perumal shrine famed for miraculous cures and blessings." },
            { "title": "Sri Sundara Varadharaja Temple", "city": "Uthiramerur", "content": "Historic temple with rich Dravidian architectural elements." },
            { "title": "Eri Katha Ramar Temple", "city": "Madurantakam", "content": "Temple dedicated to Rama, noted for the legend of saving the lake." },
            { "title": "Sri Appan Venkatesa Perumal Kovil", "city": "Thirumukkudal", "content": "1200-year-old shrine with immense historical reverence." },
            { "title": "Vallakottai Murugan Temple", "city": "Vallakottai", "content": "Murugan temple set amidst greenery, with a small waterfall nearby." },
            { "title": "Melmaruvathur Adhiparasakthi Temple", "city": "Melmaruvathur", "content": "Popular spiritual site dedicated to the Divine Mother." }
        ],
        "temple_culture": [
            { "title": "Pakshi Theertham", "city": "Thirukazhukundram", "content": "Sacred temple pond where migratory birds gather." }
        ],
        "heritage_museums": [
            { "title": "Mamallapuram Sculpture Museum", "city": "Mahabalipuram", "content": "Displays Pallava-era sculptures of exceptional craftsmanship." },
            { "title": "Seashell Museum", "city": "Mahabalipuram", "content": "Extensive collection of rare and beautiful seashell specimens." }
        ],
        "monuments_and_sculptures": [
            { "title": "Shore Temple", "city": "Mahabalipuram", "content": "UNESCO-listed coastal Dravidian temple complex." },
            { "title": "Pancha Rathas (Five Rathas)", "city": "Mahabalipuram", "content": "Rock-cut temples shaped like chariots carved from monoliths." },
            { "title": "Arjuna’s Penance (Descent of the Ganges)", "city": "Mahabalipuram", "content": "Massive open-air relief depicting mythological tales." },
            { "title": "Krishna’s Butterball", "city": "Mahabalipuram", "content": "Gravity-defying massive boulder balanced on a slope." },
            { "title": "Tiger Cave", "city": "Mahabalipuram", "content": "Rock-cut temple with tiger motifs near the sea." },
            { "title": "Mahabalipuram Lighthouse", "city": "Mahabalipuram", "content": "Historic lighthouse offering panoramic coastal views." }
        ],
        "wildlife_and_nature": [
            { "title": "Vedanthangal Bird Sanctuary", "city": "Madurantakam", "content": "India’s oldest bird sanctuary, home to 40,000+ migratory birds." },
            { "title": "Karikili Bird Sanctuary", "city": "near Vedanthangal", "content": "Important foraging site; hosts 100+ bird species." },
            { "title": "Pulicat Lake", "city": "Pulicat area", "content": "Second-largest brackish lake in India, famed for flamingos and pelicans." },
            { "title": "Nanmangalam Reserve Forest", "city": "Near Chengalpattu", "content": "Urban scrub forest with 85 bird species and orchid diversity." }
        ],
        "zoos_and_conservation": [
            { "title": "Crocodile Bank", "city": "Mahabalipuram outskirts", "content": "Reptile conservation centre housing crocodiles, snakes, turtles." },
            { "title": "Arignar Anna Zoological Park (Vandalur Zoo)", "city": "Vandalur", "content": "One of South Asia’s largest zoos; includes a butterfly enclosure." }
        ],
        "water_recreation": [
            { "title": "Muttukadu Boat House", "city": "Muttukadu", "content": "Backwater boating, windsurfing, water-skiing and speedboats." },
            { "title": "Rain Drop Boat House (Mudaliarkuppam)", "city": "Mudaliarkuppam", "content": "TTDC-run boat house with banana boats and island trips." },
            { "title": "Muttukadu Backwaters", "city": "Muttukadu", "content": "Quiet backwater area ideal for boating and birdwatching." },
            { "title": "Kovalam Beach", "city": "Kovalam", "content": "Serene seaside village offering catamaran rides and diving." },
            { "title": "Cheyyur Beach", "city": "Cheyyur area", "content": "Undiscovered quiet beach offering solitude and sea views." }
        ],
        "urban_and_lakes": [
            { "title": "Chengalpattu Lake", "city": "Chengalpattu", "content": "Picturesque lake popular for picnics and boating." }
        ],
        "coastal_beaches": [
            { "title": "Mahabalipuram Beach", "city": "Mahabalipuram", "content": "Scenic beach adjoining historic monuments." }
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
                    Top Attractions in  Chengalpattu
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

export default Chengalpattu;
