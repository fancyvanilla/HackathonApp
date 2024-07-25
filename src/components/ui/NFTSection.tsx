import { useState } from "react";
import { FaQrcode, FaChevronDown } from "react-icons/fa";

export default function NFTSection({ achievements }) {
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">NFTs</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1">
                <span className="text-5xl mb-4 block">{achievement.icon}</span>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {achievement.address.slice(0, 6)}...{achievement.address.slice(-4)}
                </p>
              </div>
            <button
              onClick={() => setSelectedNFT(achievement.id)}
              className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <FaQrcode />
            </button>
          </div>
        ))}
      </div>

      {selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h3 className="text-2xl font-semibold mb-4">Scan NFT</h3>
            <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg mb-4">
              <FaQrcode className="text-6xl text-gray-400" />
            </div>
            <button
              onClick={() => setSelectedNFT(null)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}