'use client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FaWallet, FaMedal, FaUserTie } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import {useState} from 'react'
import { FaQrcode } from 'react-icons/fa';


export default function UserProfile() {

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/user-avatar.jpg",
    xp: 1250,
    level: 5,
    isGuide: true,
    wallet: "0x1234...5678",
    balance: "500 APT",
    role:"user"
  }

  const bookedExperiences = [
    { id: 1, title: "Sahara Desert Tour", date: "2024-08-15", status: "Upcoming" },
    { id: 2, title: "Tunis City Tour", date: "2024-07-20", status: "Completed" },
    { id: 3, title: "Sidi Bou Said Adventure", date: "2024-09-05", status: "Upcoming" },
  ]

  const achievements = [
    { id: 1, name: "Desert Explorer", icon: "🏜️" },
    { id: 2, name: "City Connoisseur", icon: "🏙️" },
    { id: 3, name: "Cultural Enthusiast", icon: "🏛️" },
  ]

  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <div className="bg-green-50 min-h-screen">
     
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Live Tounsi
          </Link>
          <Link href="/dashboard" className="text-white">
            Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <Image src={"/images/user.jpg"} alt={user.name} width={120} height={120} className="rounded-full mb-4" />
                <h1 className="text-2xl font-bold text-gray-700">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2 flex items-center text-green-600">
                    <FaLocationDot className="mr-2" />
                    <span>Tunis,Marsa</span>
                  </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaMedal className="mr-2 text-yellow-500" />
                  Experience
                </h2>
                <div className="bg-gray-200 rounded-full h-4 mb-2">
                  <div className="bg-green-500 rounded-full h-4" style={{width: `${(user.xp % 1000) / 10}%`}}></div>
                </div>
                <p className="text-sm text-gray-600">Level {user.level} • {user.xp} XP</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-700">
                  <FaWallet className="mr-2 text-blue-500" />
                </h2>
                <p className="text-sm text-gray-600 mb-1">{user.wallet}</p>
                <p className="font-semibold">{user.balance}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black">Upcoming Experiences</h2>
              <div className="space-y-4">
                {bookedExperiences.map((experience) => (
                  <div key={experience.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-700">{experience.title}</h3>
                      <p className="text-sm text-gray-600">Date: {experience.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      experience.status === 'Upcoming' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {experience.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">NFTs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="relative">
            <Link href={`/nft/${achievement.id}`}>
              <div className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-3xl mb-2">{achievement.icon}</span>
                <h3 className="font-semibold text-gray-700">{achievement.name}</h3>
              </div>
            </Link>
            <button 
              onClick={() => setSelectedNFT(achievement.id)}
              className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <FaQrcode />
            </button>
          </div>
        ))}
      </div>

      {selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <p className='text-black'>SCAN</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedNFT(null)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

          </div>
        </div>
      </main>
    </div>
  )
}