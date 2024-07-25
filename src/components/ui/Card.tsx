import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default function Card({ id, imageUrl, title, description, price, vote, date }) {
  const jsDate = date ? new Date(date.seconds * 1000) : null

  return (
    <Link href={`dashboard/experience/${id}`} className="block group h-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md relative flex flex-col h-full">
        <div className="relative h-40 overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {jsDate && (
            <div className="absolute top-0 left-0 bg-green-600 text-white px-2 py-1 text-xs font-semibold">
              {format(jsDate, 'MMM d, yyyy')}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">{title}</h2>
          <p className="text-gray-600 text-xs mb-2 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center mt-8">
            <span className="text-green-600 font-bold text-sm">${price}</span>
            {vote ? (
              <div className="relative group">
                <button className="bg-gradient-to-r from-teal-400 to-green-500 text-white px-3 py-1 rounded-md text-xs hover:from-teal-500 hover:to-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Vote Now
                </button>
                <div className="absolute z-10 bottom-full right-0 mb-2 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-40 text-center">
                  Participate in our DAO voting to influence offered experiences.
                </div>
              </div>
            ) : (
              <button className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
