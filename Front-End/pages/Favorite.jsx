import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Favourite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const favoriteItems = location.state?.favoriteItems || {};

  const items = Object.values(favoriteItems);

  const Favourite = ({ favouriteItems }) => {
    const items = favouriteItems;
  
    return (
      <div className="p-8 min-h-screen bg-gray-950 text-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">❤️ Your Favourite Places</h2>
          {items.length === 0 ? (
            <p>No favourites added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {items.map((place, idx) => (
                <div key={idx} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                  <img src={place.image} alt={place.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{place.title}</h3>
                    <p className="text-gray-400 text-sm">{place.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
};

export default Favourite;
