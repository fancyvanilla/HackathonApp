import React from 'react';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';

const NFTCard = ({ name, artist, imageUrl, price }) => {
  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 p-1 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mb-4">by {artist}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-800 flex items-center">
              <FaEthereum className="mr-1 text-green-500" />
              {price} ETH
            </span>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;