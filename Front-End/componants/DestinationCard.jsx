import React from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const destinations = [
  // Your original 9 destinations
  { id: 1, name: "Chennai", image: "https://wallpaperaccess.com/full/2273780.jpg", path: "/Chennai" },
  { id: 2, name: "Madurai", image: "https://wallpaperaccess.com/full/6697117.jpg", path: "/Madurai" },
  { id: 3, name: "Nilgiris", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp", path: "/Ooty" },
  { id: 4, name: "Dindugal", image: "https://wallpaperaccess.com/full/9301891.jpg", path: "/Dindugal" },
  { id: 5, name: "Salem", image: "https://t3.ftcdn.net/jpg/03/46/77/80/240_F_346778049_beFmFk61ShrmeRdasboUEs9hY6XsPqdr.jpg", path: "/salem" },
  { id: 6, name: "Coimbatore", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/valparai-1655317113_9a764f170250c439648c.webp", path: "Coimbatore" },
  { id: 7, name: "Namakkal", image: "https://media.istockphoto.com/id/1216022846/photo/kolli-hills-kollimalai-seventy-hairpin-bends-located-in-central-tamil-nadu-india.jpg?s=612x612&w=0&k=20&c=Zwa-SlGmibGqfMed5vvWBEfngRTrD-P-bHIuh3P6frU=", path: "/Namakal" },
  { id: 8, name: "Theni", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvu8dkzwRYj22lK7qiYyrqcWJ3h1j_C3EHzQ&s", path: "/Theni" },
  { id: 9, name: "Coonoor", image: "https://media1.thrillophilia.com/filestore/f0ufvscjst2argui3nfh4ikavh7i_1556099835_shutterstock_657980620.jpg?w=753&h=450&dpr=1.0", path: "/Coonoor" },

  // Remaining districts with placeholder images
  { id: 10, name: "Ariyalur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/gangaikonda-cholapuram-1653462626_d1ad072dfb78c46813de.webp", path: "/Ariyalur" },
  { id: 11, name: "Chengalpattu", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/mamallapuram-shore-temple-1653384258_d88d3d01bc1bbf48db9b.webp", path: "/Chengalpattu" },
  { id: 12, name: "Cuddalore", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/cuddalore-1655973797_3b43b93842028e41e6bc.webp", path: "/Cuddalore" },
  { id: 13, name: "Dharmapuri", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/dharmapuri-1653922404_49805cb32cbb7d670df0.webp", path: "/Dharmapuri" },
  { id: 14, name: "Erode", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/bhavanisagar-dam-1657114764_f57e659511ffd59d91b3.webp", path: "/Erode" },
  { id: 15, name: "Kallakurichi", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kallakurichi-district-1656587156_99dff737ee2b9be3d1c2.webp", path: "/Kallakurichi" },
  { id: 16, name: "Kanchipuram", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/kancheepuram-1655983334_6d3935580aa02e02f27f.webp", path: "/Kanchipuram" },
  { id: 17, name: "Kanniyakumari", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/thiruvalluvar-statue-kanyakumari-1655196659_5a5050bcb47fea97a025.webp", path: "/Kanniyakumari" },
  { id: 18, name: "Karur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/karur-district-1656573681_0f21eaa24b5989bfbb72.webp", path: "/Karur" },
  { id: 19, name: "Krishnagiri", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/krishnagiri-1654605910_0b35d32dc281da466c9b.webp", path: "/Krishnagiri" },
  { id: 20, name: "Mayiladuthurai", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/mayiladuthurai-1655991586_b1c1635422c12edd2471.webp", path: "/Mayiladuthurai" },
  { id: 21, name: "Nagapattinam", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/tranquebar-1678086475_525b356363c1ce110b65.webp", path: "/Nagapattinam" },
  { id: 22, name: "Perambalur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/perambalur-1655996823_74bfd05a5298c0ce76cd.webp", path: "/Perambalur" },
  { id: 23, name: "Pudukkottai", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/2c/2a/25/chidambara-vilas-chettinad.jpg?w=500&h=300&s=1", path: "/Pudukkottai" },
  { id: 24, name: "Ramanathapuram", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/rameswaram-1657461850_7bb1e9861ee1dc4127ba.webp", path: "/Ramanathapuram" }, 
  { id: 25, name: "Sivagangai", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/sivaganga-1656013801_c196928c461ae2a3c25b.webp", path: "/Sivaganga" },
  { id: 26, name: "Tenkasi", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/tenkasi-1656043942_0dd1d7a5582f25b5db57.webp", path: "/Tenkasi" },
  { id: 27, name: "Thanjavur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thanjavur-1655294212_8d67c2fdaa46899ddda7.webp", path: "/Thanjavur" },
  { id: 28, name: "Thoothukudi", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/tuticorin-1654611283_94a49d4e08e03d44cb27.webp", path: "/Thoothukudi" },
  { id: 29, name: "Tiruchirappalli", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/pachamalai-hills-1677235131_0066fb291a712c6d7e83.webp", path: "/Tiruchirappalli" },
  { id: 30, name: "Tirunelveli", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/nellai-wildlife-sanctuary-1659785369_55a82bca4c364edc85cb.webp", path: "/Tirunelveli" },
  { id: 31, name: "Tirupathur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ketty-valley-view-1656164366_12148eecaea7235e8668.webp", path: "/Tirupathur" },
  { id: 32, name: "Tiruppur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/tiruppur-1656057421_d49ed96fa493a31c39a4.webp", path: "/Tiruppur" },
  { id: 33, name: "Tiruvallur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/thiruvallur-1656059792_6a0af2afca69893472f3.webp", path: "/Tiruvallur" },
  { id: 34, name: "Tiruvannamalai", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/arunachaleshwar-temple-1656172461_377e21b0eb59b54127af.webp", path: "/Tiruvannamalai" },
  { id: 35, name: "Tiruvarur", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/thyagaraja-temple-tiruvarur-1657273412_b0741db08d7c60b43a27.webp", path: "/Tiruvarur" },
  { id: 36, name: "Vellore", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/vellore-1656056881_efdda9aca6d6e0fc5968.webp", path: "/Vellore" },
  { id: 37, name: "Viluppuram", image: "https://windows10spotlight.com/wp-content/uploads/2023/01/c21d5a38a28e1da43fd555d1cb5555a1.jpg", path: "/Viluppuram" },
  { id: 38, name: "Virudhunagar", image: "https://www.tamilnadutourism.tn.gov.in/img/pages/mobile/srivilliputhur-andal-temple-1656235670_f09fd6a2fd09c2ca4a73.webp", path: "/Virudhunagar" }
];


const DestinationCard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-5 py-1">
      <h2 className="text-3xl font-bold mb-2.5 text-gray-100 text-left">
        Popular Destinations in TAMIL NADU
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 py-4">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition hover:shadow-2xl"
          >
            <div className="overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-46 object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x200?text=No+Image")
                }
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
            </div>
            <hr className="border-gray-700 w-full" />
            <div className="relative group flex justify-center ">
              <button
                className="w-full cursor-pointer text-white py-2 relative overflow-hidden transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => navigate(destination.path)}
              >
                <span className="relative z-10 flex  items-center gap-2">
                  <span className="group-hover:text-black group-hover:font-bold transition-all  duration-300 ">
                    Explore Now
                  </span>
                  <LuSquareArrowOutUpRight className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-black" />
                </span>
                <span className="absolute inset-0 bg-lime-500 scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        
      </div>
    </div >
  );
};

export default DestinationCard;