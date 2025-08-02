import React, { useEffect, useState } from "react";

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
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const favHotels = HOTELS.filter((hotel) => favorites.includes(hotel.id));

  return (
    <div className="bg-[#0B1120] min-h-screen py-12 px-4 md:px-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center">
        My Favorite Hotels
      </h1>

      {favHotels.length === 0 ? (
        <p className="text-white text-center text-lg">
          No favorites added yet!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#10172A] rounded-2xl shadow-lg overflow-hidden border border-[#1E293B] flex flex-col transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-52 object-cover"
                />
                {/* Bookmark icon can go here if you want */}
              </div>

              <div className="p-6 flex flex-col flex-grow text-white">
                <h2 className="text-lg md:text-xl font-bold mb-1">{hotel.name}</h2>
                <p className="text-gray-300 mb-1 text-sm">{hotel.city}</p>
                <p className="text-gray-400 mb-2 text-xs">{hotel.address}</p>
                <p className="text-lime-400 font-semibold mb-4">
                  Starts at: {hotel.starting_price}
                </p>
                <a
                  href={hotel.bookingURL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto w-full text-center bg-lime-500 text-black py-3 rounded-md font-semibold hover:bg-lime-600 transition-all duration-200"
                >
                  Book This Hotel
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
