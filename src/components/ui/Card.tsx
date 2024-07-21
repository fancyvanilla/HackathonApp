import Image from 'next/image'
import Link from 'next/link'

export default function Card({ id, imageUrl, title, description, price }) {
  return (
    <Link href={`dashboard/experience/${id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">${price}</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}