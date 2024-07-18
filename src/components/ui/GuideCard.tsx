'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

const GuideCard = ({ name, specialty, place, imageUrl }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{specialty}</p>
        <p className="text-sm text-gray-500 mt-2">{place}</p>
      </div>
    </motion.div>
  );
};

export default GuideCard;