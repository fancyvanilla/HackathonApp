'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Paypal from '@/components/payement/paypal'
import CustomMarkerIcon from './CustomMarkerIcon'


const Experience = ({experience,guides}) => {
  return (
    <div className="min-h-screen bg-green-50">
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
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{experience?.title}</h1>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Left column: Image, Description, and Details */}
              <div className="md:w-3/5">
                <Image src={"/images/sahara.jpg"} alt={experience?.title} width={500} height={300} className="w-full object-cover rounded-lg mb-4" />
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h2 className='text-xl font-bold mb-2 text-gray-800'>Experience Details</h2>
                  <p className="text-gray-700 text-base leading-relaxed">{experience?.description}</p>
                </div>
                
                {/* Commented out guides section */}
                
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <h2 className='text-xl font-bold mb-2 text-gray-800'>Meet Your Guides</h2>
                  <div className="flex flex-col space-y-4">
                    {guides.map((guide) => (
                      <div key={guide.id} className="flex flex-row items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
                        <Image src={"/images/man2.jpg"} alt={guide.username} width={60} height={60} className="rounded-full" />
                        <h3 className="font-semibold text-md text-gray-700">{guide.username}</h3>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>

              {/* Right column: Map and Booking */}
              <div className="md:w-2/5 flex flex-col">
                {/* Commented out map section */}
                {/*  */}
                {experience &&
                  <div className="mb-4" style={{ height: '300px', width: '100%' }}>
                    <MapContainer center={[experience.geoPoint.lat, experience.geoPoint.long]} zoom={10} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[experience.geoPoint.lat, experience.geoPoint.long]} icon={CustomMarkerIcon({ color: '#10B981', size: 24 })}>
                        <Popup>{`${experience?.city}, Tunisia`}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                }
                

                <div className="bg-green-50 p-6 rounded-lg shadow-md mt-4">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Book This Experience</h2>
                  <p className="text-3xl text-green-600 font-bold mb-2">
                    ${experience?.price} <span className="text-sm text-gray-600 font-normal">per person</span>
                  </p>
                  
                  <p className="text-sm text-gray-700 mb-4">
                    Secure your spot now! Only {experience.capacity} places left for {new Date(experience?.date).toLocaleDateString()}.
                  </p>
                  <Paypal price={`${experience?.price}`} currency="USD" />
                  
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

export default Experience