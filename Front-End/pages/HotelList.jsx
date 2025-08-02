import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";

// ✅ Replace this with your actual HOTELS data!
const HOTELS = [
  
  {
    id: 1,
    name: "Hotel Tamil Nadu Beach Resort - Mamallapuram",
    city: "Mamallapuram",
    address: "Ecr Road, Mahabalipuram, Tamil Nadu, 603104",
    starting_price: "₹4,732",
    amenities: ["Free Wifi", "Car Parking", "Swimming Pool", "Restaurant", "Bar", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/mamallapuram/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 2,
    name: "Hotel Tamil Nadu - Kodaikanal",
    city: "Kodaikanal",
    address: "47, Fern Hill Rd, Kodaikanal, Tamil Nadu - 624101",
    starting_price: "₹1,900",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Elevator", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/kodaikanal/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 3,
    name: "Hotel Tamil Nadu - Ooty I",
    city: "Ooty",
    address: "Charring cross, Wenlock Rd, opp. to Breeks Memorial school, Upper Bazar, Ooty, Tamil Nadu - 643001",
    starting_price: "₹2,500",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/ooty1/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 4,
    name: "Hotel Tamil Nadu - Ooty II",
    city: "Ooty",
    address: "171, Church Hill Rd, Pudumund, Ooty, Tamil Nadu - 643001",
    starting_price: "₹1,900",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children Play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/ooty2/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 5,
    name: "Hotel Tamil Nadu - Coimbatore",
    city: "Coimbatore",
    address: "2X79+F9C, ATT Colony, Gopalapuram, Coimbatore, Tamil Nadu - 641018",
    starting_price: "₹1,600",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "House Laundry", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/coimbatore/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 6,
    name: "Hotel Tamil Nadu - Trichy",
    city: "Tiruchirappalli",
    address: "McDonalds Rd, near Govt tourist office, Melapudur, Cantonment, Tiruchirappalli, Tamil Nadu - 620001",
    starting_price: "₹2,000",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Elevator", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/trichy/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 7,
    name: "Hotel Tamil Nadu - Thanjavur",
    city: "Thanjavur",
    address: "Gandhiji Rd, Graham Nagar, Shivaji Nagar, Thanjavur, Tamil Nadu - 613001",
    starting_price: "₹2,600",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/thanjavur/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 8,
    name: "Hotel Tamil Nadu - Madurai I",
    city: "Madurai",
    address: "W476+HP3, Periyar Bus Stand Rd, Periyar, Madurai Main, Madurai, Tamil Nadu - 625001",
    starting_price: "₹2,000",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "House Laundry", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/madurai1/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 9,
    name: "Hotel Tamil Nadu - Madurai II",
    city: "Madurai",
    address: "170, Alagar Kovil Main Rd, Mellur, Ramaond Reserve Line, Madurai, Tamil Nadu - 625002",
    starting_price: "₹2,200",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/madurai2/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 10,
    name: "Hotel Tamil Nadu - Hosur",
    city: "Hosur",
    address: "Denkanikotta Rd, Hamumanthapuram, Kamaraj Colony, Hosur, Tamil Nadu - 635109",
    starting_price: "₹2,300",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "House Laundry", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/hosur/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 11,
    name: "Hotel Tamil Nadu - Krishnagiri",
    city: "Krishnagiri",
    address: "Chennai Salai, Krishnagiri, Tamil Nadu - 635001",
    starting_price: "₹2,500",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children Play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/krishnagiri/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 12,
    name: "Hotel Tamil Nadu - Coonoor",
    city: "Coonoor",
    address: "9Q2P+M6, Balaclava, Coonoor, Tamil Nadu - 643102",
    starting_price: "₹4,000",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children Play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/coonoor/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 13,
    name: "Hotel Tamil Nadu - Ranipet",
    city: "Ranipet",
    address: "W8W9+XH4, Ranipet, Tamil Nadu - 632401",
    starting_price: "₹3,500",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "Children Play Area"],
    image: "https://ttdconline.com/assets/img/hotel/ranipet/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 14,
    name: "Hotel Tamil Nadu - Courtallam I",
    city: "Courtallam",
    address: "51E, Tenkasi Road, Opp Sri Parasakthi College For Women, Courtallam, Tamil Nadu - 627802",
    starting_price: "₹1,600",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "Elevator"],
    image: "https://ttdconline.com/assets/img/hotel/courtallam1/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 15,
    name: "Hotel Tamil Nadu - Courtallam II",
    city: "Courtallam",
    address: "Ramalayam, Courtallam, Tamil Nadu 627802",
    starting_price: "₹1,500",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "CCTV"],
    image: "https://ttdconline.com/assets/img/hotel/courtallam2/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 16,
    name: "Hotel Tamil Nadu - Hogenakkal",
    city: "Hogenakkal",
    address: "Pennagaram, Hogenakkal, Dharmapuri, Tamil Nadu - 636810",
    starting_price: "₹1,700",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Room Service", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/hogenakkal/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 17,
    name: "Hotel Tamil Nadu - Kancheepuram",
    city: "Kancheepuram",
    address: "Kamakshi Amman Sannathi St, near Old Railway Station, Kanchipuram, Tamil Nadu - 631502",
    starting_price: "₹2,500",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children Play Area", "CCTV"],
    image: "https://ttdconline.com/assets/img/hotel/kanchipuram/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 18,
    name: "Hotel Tamil Nadu - Kanyakumari",
    city: "Kanyakumari",
    address: "Kanyakumari Beach Road, Kanyakumari, Tamil Nadu - 629702",
    starting_price: "₹2,200",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Children play Area", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/kanyakumari/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 19,
    name: "Hotel Tamil Nadu - Yercaud",
    city: "Yercaud",
    address: "Near Lake, Yercaud, Kombaikkadu, Tamil Nadu - 636601",
    starting_price: "₹1,700",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Room Service", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/yercaud/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 20,
    name: "Hotel Tamil Nadu - Tiruchendur",
    city: "Tiruchendur",
    address: "F4XG+FXW, Traveller's Bunglow Road, Tiruchendur, Tamil Nadu - 628215",
    starting_price: "₹2,150",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "CCTV", "House Laundry"],
    image: "https://ttdconline.com/assets/img/hotel/tiruchendur/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 21,
    name: "Hotel Tamil Nadu - Tiruvannamalai",
    city: "Tiruvannamalai",
    address: "Polur Rd, Mathalangulam, Tiruvannamalai, Annamalai R.F., Tamil Nadu - 606601",
    starting_price: "₹2,678",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "House Laundry"],
    image: "https://ttdconline.com/assets/img/hotel/thiruvannamalai/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 22,
    name: "Hotel Tamil Nadu - Thirukadaiyur",
    city: "Thirukadaiyur",
    address: "3RJ2+2J5, Hotel Tamilnadu, Thirukkadaiyur, Tamil Nadu - 609311",
    starting_price: "₹1,350",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "CCTV"],
    image: "https://ttdconline.com/assets/img/hotel/thirukadaiyur/list/01.png",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 23,
    name: "Hotel Tamil Nadu - Tirunelveli",
    city: "Tirunelveli",
    address: "Collectorate Campus, Kokkirakulam, Tirunelveli, Tamil Nadu - 627009",
    starting_price: "₹1,800",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Room Service", "House Laundry"],
    image: "https://ttdconline.com/assets/img/hotel/tirunelveli/list/04.jpg",
    bookingURL: "https://www.ttdconline.com"
  },
  {
    id: 24,
    name: "Hotel Tamil Nadu - Rameswaram",
    city: "Rameswaram",
    address: "78RF+F2J, Sudukattanpatti, Tamil Nadu - 623526",
    starting_price: "₹1,700",
    amenities: ["Free Wifi", "Car Parking", "Restaurant", "Bar", "Power Backup", "Banquet Hall"],
    image: "https://ttdconline.com/assets/img/hotel/rameswaram/list/08.png",
    bookingURL: "https://www.ttdconline.com"
  }
];


const HotelCard = ({ hotel, isFavorite, toggleFavorite }) => {
  const handleBooking = () => {
    window.open(hotel.bookingURL, "_blank");
  };

  return (
    <div className="bg-[#0B1120] rounded-2xl shadow-lg border border-gray-700 flex flex-col overflow-hidden transform transition duration-300 hover:scale-[1.02]">
      {/* Image with proper cover */}
      <div className="relative overflow-hidden h-60">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleFavorite(hotel.id)}
          className={`absolute top-3 right-3 text-3xl transition-transform duration-300 ${
            isFavorite ? "text-yellow-400 scale-125" : "text-white scale-100"
          }`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <MdOutlineBookmarkAdded /> : <MdOutlineBookmarkAdd />}
        </button>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-grow text-white">
        <h2 className="text-lg font-bold mb-1">{hotel.name}</h2>
        <p className="text-gray-300 mb-1 text-sm">{hotel.city}</p>
        <p className="text-gray-400 mb-2 text-xs">{hotel.address}</p>
        <p className="text-lime-400 mb-4 text-sm font-semibold">
          Starts at: {hotel.starting_price}
        </p>
        <button
          onClick={handleBooking}
          className="mt-auto w-full bg-lime-500 text-black py-3 rounded-lg font-semibold hover:bg-lime-600 transition shadow hover:shadow-md"
        >
          Book This Hotel
        </button>
      </div>
    </div>
  );
};

const HotelList = () => {
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredHotels =
    filter === "All"
      ? HOTELS
      : filter === "Favorites"
      ? HOTELS.filter((hotel) => favorites.includes(hotel.id))
      : HOTELS.filter((hotel) => hotel.category === filter);

  return (
    <div className="bg-[#0B1120] min-h-screen py-14 px-4 md:px-8 relative">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center drop-shadow">
        Hotel Tamil Nadu (TTDC)
      </h1>

      {/* Favorites link */}
      <div className="flex justify-center mb-6">
        <Link
          to="/Favourite"
          className="inline-block px-6 py-3 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition"
        >
          🔖 View Favorites
        </Link>
      </div>

      {/* Info hover */}
      <div className="absolute top-14 right-8 group">
        <span className="text-white text-3xl cursor-pointer">ℹ️</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-10 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-lg shadow-lg p-8 w-72 text-sm z-50">
          <p className="font-semibold mb-2">How We Guide You</p>
          <p>
            We help you discover verified Hotel Tamil Nadu stays (TTDC-managed &
            tie-up). Book directly through trusted links — we guide you to
            official TTDC pages for safe reservations.
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {["All", "Government", "Tie-up", "Favorites"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-lime-500 text-black shadow"
                : "bg-gray-200 text-gray-800 hover:bg-lime-400 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            isFavorite={favorites.includes(hotel.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
