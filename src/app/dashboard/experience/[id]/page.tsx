'use client'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import Paypal from '@/components/payement/paypal'

const experiences = [
  {
    id: 1,
    imageUrl: "/images/sahara.jpg",
    title: "Sahara Desert Tour",
    description: "Embark on an unforgettable journey through the golden dunes of the Sahara. Our expert guides will lead you on a 3-day adventure, where you'll ride camels, sleep under the stars, and explore ancient oases.",
    price: 199,
    city: "Douz",
    geopoint: [33.4667, 9.0167],
    date: "2024-08-15",
    capacity: 12,
    duration: "3 days",
    difficulty: "Moderate",
    includes: ["Camel ride", "Camping equipment", "Meals", "Local guide"],
    meetingPoint: "Douz, Tunisia",
    guides:[
      {id:"0",username:"Farhat",email:"farhat@gmail.com",role:"Lead Guide",avatar:"/images/user.jpg",},
      {id:"1",username:"Nouha",email:"oussema@gmail.com",role:"Assistant Guide",avatar:"/images/woman2.jpg",},
    ]
  },
]

const customMarkerIcon = divIcon({
  html: renderToStaticMarkup(
    <FaMapMarkerAlt style={{ color: '#10B981', fontSize: '24px' }} />
  ),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const remainingPlaces = 5

export default function ExperienceDetails({params}:{params:{id:string}}) {
  const router = useRouter()
  const { id } = params
  const experience = experiences.find(exp => exp.id === parseInt(id))

  if (!experience) return <div>Experience not found</div>

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>{experience.title} - Tunisian Tourist Guides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-green-600 p-4">
        <div className="container mx-auto">
          <Link href="/" className="text-white text-xl font-bold">
            Tunisian Guides
          </Link>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{experience.title}</h1>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Left column: Image, Description, and Details */}
              <div className="md:w-3/5">
                <Image src={experience.imageUrl} alt={experience.title} width={500} height={300} className="w-full object-cover rounded-lg mb-4" />
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h2 className='text-xl font-bold mb-2 text-gray-800'>Experience Details</h2>
                  <p className="text-gray-700 text-base leading-relaxed">{experience.description}</p>
                </div>
        
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h2 className='text-xl font-bold mb-2 text-gray-800'>Meet Your Guides</h2>
                  <div className="flex flex-col space-y-4">
                    {experience.guides.map((guide) => (
                      <div key={guide.id} className="flex flex-row items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
                        <Image src={guide.avatar} alt={guide.username} width={60} height={60} className="rounded-full" />
                          <h3 className="font-semibold text-md text-gray-700">{guide.username}</h3>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: Map and Booking */}
              <div className="md:w-2/5 flex flex-col">
                <div className="mb-4" style={{ height: '300px', width: '100%' }}>
                  <MapContainer center={experience.geopoint} zoom={10} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={experience.geopoint} icon={customMarkerIcon}>
                      <Popup>{experience.meetingPoint}</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="bg-green-50 p-6 rounded-lg shadow-md mt-4">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Book This Experience</h2>
                  <p className="text-3xl text-green-600 font-bold mb-2">${experience.price} <span className="text-sm text-gray-600 font-normal">per person</span></p>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    Secure your spot now! Only {remainingPlaces} places left for {new Date(experience.date).toLocaleDateString()}.
                  </p>
                  <Paypal price={`${experience.price}`} currency="USD" />
                  {/**<button 
                    onClick={() => alert('Payment processing would be implemented here')}
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                  >
                    Book Now
                  </button>**/}
                  
                  <div className="mt-4 text-sm text-gray-700">
                    <p className="mb-1"><strong>Cancellation policy:</strong> Free cancellation up to 24 hours before the start of the experience.</p>
                    <p><strong>Questions?</strong> Contact us at support@tunisianguides.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}