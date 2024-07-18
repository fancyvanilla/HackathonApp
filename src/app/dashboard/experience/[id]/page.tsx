'use client'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const experiences = [
  {
    id: 1,
    imageUrl: "/images/sahara.jpg",
    title: "Sahara Desert Tour",
    description: "Experience the beauty of the Sahara desert with our expert guides.",
    price: 199,
    longDescription: "Embark on an unforgettable journey through the golden dunes of the Sahara. Our expert guides will lead you on a 3-day adventure, where you'll ride camels, sleep under the stars, and explore ancient oases.",
    duration: "3 days",
    groupSize: "4-12 people",
    difficulty: "Moderate",
    includes: ["Camel ride", "Camping equipment", "Meals", "Local guide"],
    meetingPoint: "Douz, Tunisia"
  },
]

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
          <div className="md:flex">
            {/* Left column: Experience details */}
            <div className="md:w-2/3 p-6">
              <Image src={experience.imageUrl} alt={experience.title} width={800} height={400} className="w-full object-cover rounded-lg mb-6" />
              <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
              <p className="text-gray-600 mb-6">{experience.longDescription}</p>
              
              <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p>{experience.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Group Size</h3>
                  <p>{experience.groupSize}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Difficulty</h3>
                  <p>{experience.difficulty}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Meeting Point</h3>
                  <p>{experience.meetingPoint}</p>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">What's Included:</h3>
              <ul className="list-disc pl-5 mb-6">
                {experience.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Right column: Booking and payment */}
            <div className="md:w-1/3 bg-green-50 p-6">
              <div className="sticky top-6">
                <h2 className="text-2xl font-bold mb-4">Book This Experience</h2>
                <p className="text-3xl text-green-600 font-bold mb-6">${experience.price} <span className="text-sm text-gray-600 font-normal">per person</span></p>
                
                <form className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
                      Select Date
                    </label>
                    <input type="date" id="date" name="date" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="guests">
                      Number of Guests
                    </label>
                    <select id="guests" name="guests" className="w-full p-2 border border-gray-300 rounded-md">
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="button"
                    onClick={() => alert('Payment processing would be implemented here')}
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                  >
                    Book Now
                  </button>
                </form>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-2"><strong>Cancellation policy:</strong> Free cancellation up to 24 hours before the start of the experience.</p>
                  <p><strong>Questions?</strong> Contact us at support@tunisianguides.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}