"use client";
import Link from "next/link";
import Image from "next/image";
import { FaWallet, FaMedal, FaUserTie } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState,useEffect } from "react";
import NFTSection from "./NFTSection";
import { getAccountBalance,createAccount } from "@/lib/aptos/aptos";


interface User{
  username:string
  email:string
  addresses: string[]
  aptos_account:{
    address:string 
    enc_pk:string
  }
}


export default function UserProfile({user}:{user:User}) {

  const [balance,setBalance]=useState("")
  

  /**useEffect(()=>{
    const dec_key=await decrypt(user.aptos_account.enc_key,)

    const getBalance=async()=>{
      const balance= await getAccountBalance()
      setBalance(balance.toString())
    }
  
  },[])**/

  //TODO:to be fetched from aptos
  const bookedExperiences = [
    {
      id: 1,
      title: "Sahara Desert Tour",
      date: "2024-08-15",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Tunis City Tour",
      date: "2024-07-20",
      status: "Completed",
    },
    {
      id: 3,
      title: "Sidi Bou Said Adventure",
      date: "2024-09-05",
      status: "Upcoming",
    },
  ];

// fetch nfts by address
  const achievements = [
    { id: 1, name: "Desert Explorer", icon: "🏜️", address: "0x1234...5678" },
    { id: 2, name: "City Connoisseur", icon: "🏙️", address: "0x5678...9012" },
    { id: 3, name: "Cultural Enthusiast", icon: "🏛️", address: "0x9012...3456" },
  ];


  const addresses=["123","234"]

  return (
    <div className="bg-green-50 min-h-screen">
     
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Live Tounsi
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
                <Image
                  src={"/images/user.jpg"}
                  alt={user.username}
                  width={120}
                  height={120}
                  className="rounded-full mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-700">
                  {user.username}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 flex items-center text-green-600">
                  <FaLocationDot className="mr-2" />
                  <span>Tunis,Marsa</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <FaMedal className="mr-2 text-yellow-500" />
                  Experience
                </h2>
                <div className="bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className="bg-green-500 rounded-full h-4"
                    style={{ width: `${(user.xp % 1000) / 10}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Level {"5"} • {"1250"} XP
                </p>
              </div>

              <div className=" text-gray-700">
                <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-700">
                  <FaWallet className="mr-2 text-blue-500" />
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {user?.aptos_account.address ? `${user?.aptos_account.address.slice(0, 6)}...${user?.aptos_account.address.slice(-4)}` : 'Address not available'}
                        </p>
                <p className="font-semibold text-green-600">balance:{balance}</p>
                    
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Upcoming Experiences
              </h2>
              <div className="space-y-4">
                {bookedExperiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        {experience.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Date: {experience.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        experience.status === "Upcoming"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {experience.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

           <NFTSection achievements={achievements}/>
          </div>
        </div>
      </main>
    </div>
  );
}
