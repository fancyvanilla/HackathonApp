import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FaWallet, FaMedal, FaUserTie, FaLanguage, FaMapMarkedAlt, FaHiking, FaCalendarAlt, FaEnvelope,FaStar,FaCalendarCheck } from 'react-icons/fa'

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/user-avatar.jpg",
    xp: 1250,
    level: 5,
    isGuide: true,
    wallet: "0x1234...5678",
    balance: "500 APT",
    languages: ["English", "Arabic", "French"],
    regions: ["Sahara", "Tunis", "Sidi Bou Said"],
    specialties: ["Hiking", "Camping", "Historical Tours"],
  }

  const plannedTrips = [
    { id: 1, title: "Sahara Desert Expedition", date: "2024-08-15", status: "Upcoming" },
    { id: 2, title: "Historical Tunis Walk", date: "2024-07-20", status: "Completed" },
    { id: 3, title: "Sidi Bou Said Cultural Tour", date: "2024-09-05", status: "Upcoming" },
  ]

  const achievements = [
    { id: 1, name: "Desert Explorer", icon: "🏜️" },
    { id: 2, name: "City Connoisseur", icon: "🏙️" },
    { id: 3, name: "Cultural Enthusiast", icon: "🏛️" },
  ]

  return (
    <div className="bg-green-50 min-h-screen">
      <Head>
        <title>Profile - Tunisian Tourist Guides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Tunisian Guides
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
                {user.isGuide && (
                  <div className="mt-2 flex items-center text-green-600">
                    <FaUserTie className="mr-2" />
                    <span>Certified Guide</span>
                  </div>
                )}
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

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaLanguage className="mr-2 text-purple-500" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.languages.map((lang, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaMapMarkedAlt className="mr-2 text-red-500" />
                  Regions
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.regions.map((region, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaHiking className="mr-2 text-green-500" />
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.specialties.map((specialty, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

           {/* Replace the wallet section with this */}
                <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                    <FaStar className="mr-2 text-yellow-500" />
                    Rating
                </h2>
                <p className="text-sm text-gray-600 mb-1">Average Rating: 4.8/5</p>
                <p className="font-semibold">Based on 47 reviews</p>
                </div>

                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Check Availability
                </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-orange-500" />
                Planned Trips
              </h2>
              <div className="space-y-4">
                {plannedTrips.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-700">{trip.title}</h3>
                      <p className="text-sm text-gray-600">Date: {trip.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      trip.status === 'Upcoming' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4 text-center">
                    <span className="text-3xl mb-2">{achievement.icon}</span>
                    <h3 className="font-semibold text-gray-700">{achievement.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}