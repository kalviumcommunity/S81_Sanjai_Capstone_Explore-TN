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
function Sivagangai() {

    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem('token'); // <-- add this line
    const cityDescription =
        "Sivagangai district, rich in Maravar heritage, ancient temples, and vibrant folk culture, offers a fascinating blend of history, spirituality, and natural beauty. From grand forts and hill shrines to serene lakes and colorful festivals, it promises a soulful journey through Tamil Nadu’s heartland.";

    const places = {
        "temples": [
            { "title": "Brihadeeswarar Temple, Thirupuvanam", "city": "Thirupuvanam", "content": "Ancient Shiva temple with stunning Dravidian architecture." },
            { "title": "Kalayarkoil Mariamman Temple", "city": "Kalayarkoil", "content": "Famous for its grand festival and rich Maravar history." },
            { "title": "Sri Anjaneya Swamy Temple", "city": "Sivagangai town", "content": "Popular Hanuman shrine attracting devotees year-round." },
            { "title": "Kudimiyanmalai Siva Temple", "city": "Kudimiyanmalai", "content": "Historic rock-cut temple with exquisite carvings." },
            { "title": "Ayyanar Temple, Ariyakudi", "city": "Ariyakudi", "content": "Folk deity temple known for vibrant rural festivals." }
        ],
        "historic_sites": [
            { "title": "Sivagangai Palace", "city": "Sivagangai town", "content": "Royal palace showcasing the legacy of the Maravar kings." },
            { "title": "Kottai Poondi Fort", "city": "Poondi", "content": "Ruined fort with panoramic views and historic importance." },
            { "title": "Marudhamalai Fort", "city": "Marudhamalai", "content": "Hill fort with ancient defense walls and legends." }
        ],
        "natural_spots": [
            { "title": "Manalur Lake", "city": "Manalur", "content": "Serene water body attracting migratory birds and nature lovers." },
            { "title": "Ariyakudi Forest Patch", "city": "Ariyakudi", "content": "Small forest reserve home to native flora and fauna." },
            { "title": "Kalakkadu Hills", "city": "Kalakkadu", "content": "Rolling hills offering trekking and scenic views." }
        ],
        "cultural_and_festivals": [
            { "title": "Kalayarkoil Mariamman Festival", "city": "Kalayarkoil", "content": "Week-long festival filled with rituals, music, and dance." },
            { "title": "Sivagangai Muthamizh Vizha", "city": "Sivagangai town", "content": "Annual cultural festival celebrating Tamil arts and literature." },
            { "title": "Ariyakudi Folk Dance Fest", "city": "Ariyakudi", "content": "Traditional dance and music performed during harvest season." }
        ],
        "scenic_nature": [
            { "title": "Thiruppuvanam Hill Viewpoint", "city": "Thiruppuvanam", "content": "Scenic hilltop spot for sunrise and sunset views." },
            { "title": "Manalur Village Greenery", "city": "Manalur", "content": "Lush green agricultural fields surrounded by rural hamlets." },
            { "title": "Kalakkadu Waterfalls", "city": "Kalakkadu", "content": "Hidden waterfalls nestled amidst forested hills." }
        ],
        "hidden_gems": [
            { "title": "Poondi Village Step-Wells", "city": "Poondi", "content": "Ancient step-wells still used by locals, a glimpse into water management heritage." },
            { "title": "Ariyakudi Handloom Weaving Center", "city": "Ariyakudi", "content": "Traditional weaving village preserving old textile crafts." },
            { "title": "Manalur Rural Museum", "city": "Manalur", "content": "Small museum showcasing folk artifacts and village life." },
            { "title": "Kudimiyanmalai Rock Art Trails", "city": "Kudimiyanmalai", "content": "Secluded walking paths with prehistoric paintings and inscriptions." },
            { "title": "Sivagangai Traditional Pottery Village", "city": "Sivagangai outskirts", "content": "Village known for pottery making passed down generations." }
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
                    Top Attractions in Sivagangai
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

export default Sivagangai;
