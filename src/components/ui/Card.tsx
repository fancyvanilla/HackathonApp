import Image from 'next/image'
import Link from 'next/link'

export default function Card({ id,imageUrl, title, description, price }) {
  return (
    <Link href={`dashboard/experience/${id}`} className="block">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={imageUrl} alt={title} width={400} height={200} className="w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl text-black font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-bold">${price}</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
    </Link>
  )
}