'use client'
import React from 'react'
import { FaWallet } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import {useRouter} from 'next/navigation'
import {useState} from 'react'


const Thanks = ({user}) => {

    const router=useRouter()
    const [copied,setCopied]=useState(false)
  
      const handleCopyAddress = () => {
        if (user?.aptos_account.address) {
            navigator.clipboard.writeText(user?.aptos_account.address);
            setCopied(true)
        }
    };
   

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-2">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Wohooo what's next?</h1>
            
            <div className="mb-6 space-y-4">
              <p className="text-lg font-semibold text-purple-700">
                Thank you ✨{user?.username}✨ for signing up for the Live Tounsi experience! 😊
              </p>
              <p className="text-gray-700">
                We're excited to have you on board and we appreciate your trust in us to create a better and more secure place. Let's goooo 😭❤️❤️
              </p>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded">
                <p className="text-purple-800">
                  We've created an Aptos blockchain account for you to access your digital assets.
                  
                  Please copy your adddress and keep it in a safe place.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaWallet className="text-blue-500 mr-2" />
                  <span className="font-semibold text-gray-800">Account Address:</span>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-sm break-all text-black">{user?.aptos_account?.address}</span>
                  <button 
                  onClick={handleCopyAddress}
                  disabled={copied}
                  className="ml-2 text-blue-500 hover:text-blue-600">
                   {copied?"copied":"copy"}
                  </button>
                </div>
              </div>
            </div>
                 
            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2 font-bold text-purple-700">Why is this important?</p>
              <ul className="list-disc list-inside space-y-2">
                <li>We used your password to encrypt your private key, adding an extra layer of security.</li>
                <li>You should be knowledgeable about your account as you can access it outside our application.</li>
                <li>You can only perform transactions on this account within the application. No worries, a lot of NFTs and fun stuff are awaiting you!</li>
              </ul>
            </div>
            <div className="flex items-end justify-end pt-4">
            <button 
              onClick={() => router.push("/dashboard")} 
              className="flex items-center text-purple-500 hover:text-purple-800 transition-colors"
            >
              <FaArrowRight className="mr-2" />
              <span>Go to Dashboard</span>
            </button>
          </div>
          </div>
        </div>
      );
}

export default Thanks