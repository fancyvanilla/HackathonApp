
import React from 'react'
import Image from 'next/image'

const PetraGuide = () => {
        return (
            <>
          <div className={"min-h-screen bg-blue-950 flex flex-col items-center justify-center p-4 transition-opacity duration-1000 "}>
            <h1 className="text-4xl font-bold mb-6 text-white animate-fade-in-down">One Last Step!</h1>
            <p className="text-xl mb-12 text-center max-w-2xl text-white animate-fade-in-up">
              To complete your booking, please install the Petra wallet extension. It&apos;s quick, easy, and essential for your Tunisian adventure!
            </p>
            <div className="relative w-full max-w-2xl mb-12">
            <Image 
                src="/images/browser.png" 
                alt="Browser with extension tab highlighted" 
                width={800} 
                height={600} 
                className="w-full h-auto animate-fade-in"
              />
              <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/2 animate-bounce">
                <Image 
                  src="/images/point.png" 
                  alt="Hand pointing to extension tab" 
                  width={150} 
                  height={150} 
                  className="w-36 h-36"
                />
              </div>
            </div>
            <p className="text-lg mb-6 text-gray-300 animate-fade-in-up">
              Click on the extension icon in your browser and find Petra wallet to install.
            </p>
            <a 
              href="https://petra.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 animate-pulse"
            >
              Get Petra Wallet
            </a>
            <p className="mt-6 text-sm text-gray-400 animate-fade-in-up">
              After installation, refresh this page to continue your booking.
            </p>
          </div>
  </>)
}

export default PetraGuide