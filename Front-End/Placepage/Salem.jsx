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



function Salem() {
    const cityDescription = "Salem, located in the state of Tamil Nadu, is known for its rich cultural heritage, historical significance, and scenic surroundings. Famous for its textile industry, especially in cotton weaving, Salem is also home to beautiful landmarks like the Yercaud hill station, Kottai Mariamman Temple, and the breathtaking hills and forests. The city offers a blend of nature, history, and modern industry, making it an interesting destination for both travelers and history enthusiasts.";


  const places = {
    "hill_stations": [
      {
        "title": "Yercaud Hill Station",
        "city": "Salem",
        "content": "Known for its cool climate and scenic beauty."
      },
      {
        "title": "Kolli Hills",
        "city": "Salem",
        "content": "A hill range known for its scenic beauty and trekking routes."
      },
      {
        "title": "Shevaroy Hills",
        "city": "Salem",
        "content": "A range of hills known for their natural beauty."
      },
      {
        "title": "Kanjamalai Hills",
        "city": "Salem",
        "content": "A hill range known for its iron ore deposits."
      },
      {
        "title": "Kalrayan Hills",
        "city": "Salem",
        "content": "A hill range known for its natural beauty."
      },
      {
        "title": "Chinna Kottai Hills",
        "city": "Salem",
        "content": "A hill range near Chinna Kottai."
      },
      {
        "title": "Sitheri Hill Station",
        "city": "Salem",
        "content": "A lesser-known, peaceful hill station."
      }
    ],
    "waterfalls": [
      {
        "title": "Kiliyur Falls",
        "city": "Salem",
        "content": "A picturesque waterfall near Yercaud."
      },
      {
        "title": "Mookaneri Lake",
        "city": "Salem",
        "content": "A serene lake in Salem city."
      },
      {
        "title": "Nature’s Lap – Muttal",
        "city": "Salem",
        "content": "A waterfall near Attur."
      },
      {
        "title": "Poolampatty Water Place",
        "city": "Salem",
        "content": "Often referred to as 'Salem's Kerala'."
      }
    ],
    "viewpoints": [
      {
        "title": "Lady’s Seat",
        "city": "Salem",
        "content": "A viewpoint offering panoramic views of Salem."
      },
      {
        "title": "Pagoda Point",
        "city": "Salem",
        "content": "Another scenic viewpoint in Yercaud."
      },
      {
        "title": "Arthur’s Seat",
        "city": "Salem",
        "content": "A viewpoint named after a British officer."
      },
      {
        "title": "Kaveri Peak",
        "city": "Salem",
        "content": "A popular trekking destination."
      },
      {
        "title": "Sankagiri Fort",
        "city": "Salem",
        "content": "An ancient fort with over 10 walls built by different rulers."
      },
      {
        "title": "Kolli Hills Viewpoint",
        "city": "Salem",
        "content": "A viewpoint offering panoramic views of the Kolli Hills."
      },
      {
        "title": "Sorabur Viewpoint",
        "city": "Salem",
        "content": "An undiscovered scenic spot in the hills."
      },
      {
        "title": "Manjakuttai Viewpoint",
        "city": "Salem",
        "content": "Great place for sunrise/sunset views."
      }
    ],
    "temples": [
      {
        "title": "Servarayan Temple",
        "city": "Salem",
        "content": "Located at the highest point in Yercaud."
      },
      {
        "title": "1008 Lingam Temple",
        "city": "Salem",
        "content": "A temple housing 1008 Shiva lingams."
      },
      {
        "title": "Kalangi Siddhar Temple",
        "city": "Salem",
        "content": "Dedicated to one of the 18 Tamil Siddhars."
      },
      {
        "title": "Kottai Mariamman Temple",
        "city": "Salem",
        "content": "A prominent temple in Salem city."
      },
      {
        "title": "Skandasramam Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Murugan."
      },
      {
        "title": "Linga Bhairavi Temple",
        "city": "Salem",
        "content": "Known for its unique architecture."
      },
      {
        "title": "Sugavaneswarar Temple",
        "city": "Salem",
        "content": "An ancient temple dedicated to Lord Shiva."
      },
      {
        "title": "Kalipatti Kandaswamy Temple",
        "city": "Salem",
        "content": "A Murugan temple known for its festivals."
      },
      {
        "title": "Sri Ramar Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Rama."
      },
      {
        "title": "Kumaragiri Murugan Temple",
        "city": "Salem",
        "content": "Located on Udayapatti Bypass Road."
      },
      {
        "title": "Kandhasamy Kovil",
        "city": "Salem",
        "content": "One of the seven richest temples in the district."
      },
      {
        "title": "Alagirinathar Temple",
        "city": "Salem",
        "content": "Also known as 'Kottai Perumal Koil'."
      },
      {
        "title": "Oothumalai Murugan Temple",
        "city": "Salem",
        "content": "Situated on Oothumalai Hill."
      },
      {
        "title": "Mecheri Bathrakali Amman Temple",
        "city": "Salem",
        "content": "A temple dedicated to Goddess Kali."
      },
      {
        "title": "Thanthondrieswarar Temple",
        "city": "Salem",
        "content": "Located in Belur."
      },
      {
        "title": "Atkonteshwarae Temple",
        "city": "Salem",
        "content": "Situated in Pethanaickenpalayam."
      },
      {
        "title": "Sri Muth Malai Murugan Kovil",
        "city": "Salem",
        "content": "Located in Puthiragoundampalayam."
      },
      {
        "title": "Salem Ramanujar Manimandapam",
        "city": "Salem",
        "content": "A memorial dedicated to Sri Ramanuja."
      },
      {
        "title": "Tharamangalam Kailasanathar Temple",
        "city": "Salem",
        "content": "Known for its intricate carvings."
      },
      {
        "title": "Ellai Pedari Amman Temple",
        "city": "Salem",
        "content": "A temple dedicated to Goddess Pedari."
      },
      {
        "title": "Arulmigu Alagirinathar Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Vishnu."
      },
      {
        "title": "Sowriyur Mariamman Temple",
        "city": "Salem",
        "content": "A temple dedicated to Goddess Mariamman."
      },
      {
        "title": "Kottai Perumal Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Vishnu."
      },
      {
        "title": "Siddhar Koil",
        "city": "Salem",
        "content": "A temple dedicated to Siddhars."
      },
      {
        "title": "Arulmigu Kandaswamy Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Murugan."
      },
      {
        "title": "Arulmigu Mariamman Temple",
        "city": "Salem",
        "content": "A temple dedicated to Goddess Mariamman."
      },
      {
        "title": "Arulmigu Perumal Temple",
        "city": "Salem",
        "content": "A temple dedicated to Lord Perumal."
      }
    ],
    "forts": [
      {
        "title": "Sankagiri Fort",
        "city": "Salem",
        "content": "An ancient fort with over 10 walls built by different rulers."
      },
      {
        "title": "Attur Fort",
        "city": "Salem",
        "content": "A well-known historic fort with a moat."
      },
      {
        "title": "Tharamangalam Fort Remains",
        "city": "Salem",
        "content": "Historic remnants in Tharamangalam town."
      },
      {
        "title": "Mettur Dam Viewpoint",
        "city": "Salem",
        "content": "Offers historic views of the Mettur Dam region."
      }
    ],
    "parks_and_gardens": [
      {
        "title": "Anna Park",
        "city": "Yercaud",
        "content": "Landscaped gardens with children's play areas."
      },
      {
        "title": "Sky Park",
        "city": "Yercaud",
        "content": "Adventure and fun park with a scenic backdrop."
      },
      {
        "title": "Children's Park",
        "city": "Salem",
        "content": "A city park for family and kids."
      },
      {
        "title": "Kurumbapatti Zoological Park",
        "city": "Yercaud",
        "content": "Mini-zoo and eco park near Yercaud."
      },
      {
        "title": "Paravasa Ulagam Water Theme Park",
        "city": "Salem",
        "content": "A popular family water park."
      }
    ],
    "historical_sites": [
      {
        "title": "Government Museum",
        "city": "Salem",
        "content": "Artifacts, inscriptions, and history of the region."
      },
      {
        "title": "Tribal Cultural Museum",
        "city": "Yercaud",
        "content": "Showcases tribal life and crafts of the area."
      },
      {
        "title": "Salem Jama Masjid",
        "city": "Salem",
        "content": "A significant mosque in Salem city."
      },
      {
        "title": "St. Mary’s Church",
        "city": "Salem",
        "content": "One of the oldest churches in the region."
      },
      {
        "title": "CSI Christ Church",
        "city": "Yercaud",
        "content": "A beautiful colonial-era church."
      }
    ]
  }
  

  return (
    <div className="p-8 min-h-screen">
      <div className="bg-gray-950 text-gray-300 p-10 rounded-lg shadow-xl text-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100 uppercase mb-4">
          Top Attractions in Salem
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

export default Salem;


