'use client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import {useAuth} from '@/components/authentification/AuthContext'
import { FaRegUserCircle } from "react-icons/fa";

//i thought the sphere is cool and blockchainyy
const ThreeJSAnimation = dynamic(() => import('../components/animation/ThreeJsAnimation'), { ssr: false })

//todo:fix the logo
//yes i should have made this into components but having everything at one place seemed right

export default function LandingPage() {
  
  //this for the hamburger but m not hangry now 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Head>
        <title>Live Tounsi - Authentic Tunisian Experiences</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
  <div className="container mx-auto py-3 flex justify-between items-center">
    <Link href="/" className="flex items-center px-4 md:px-12">
      <Image src="/images/logo.jpg" alt="Live Tounsi Logo" width={40} height={40} className="mr-2" />
      <span className="font-bold text-xl text-green-600">Live Tounsi</span>
    </Link>
    <div className="hidden md:flex items-center space-x-6 px-4 md:px-10">
      <Link href="#experiences" className="text-gray-700 hover:text-green-600">Experiences</Link>
      <Link href="#about" className="text-gray-700 hover:text-green-600">About</Link>
      <Link href="#contact" className="text-gray-700 hover:text-green-600">Contact</Link>
      {loading ? (
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
      ) : user ? (
        <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
          <FaRegUserCircle className="h-6 w-6" />
        </Link>
      ) : (
        <>
          <Link href="/login" className="text-gray-700 hover:text-green-600">Sign In</Link>
          <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

      <main>
          <section className="h-screen relative overflow-hidden pt-16">
      <ThreeJSAnimation />
      <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-50">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Discover Authentic Tunisian Experiences</h1>
          <p className="text-xl mb-8 text-white">Powered by blockchain technology</p>
          <Link href="#experiences" className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
            Explore Experiences
          </Link>
        </div>
      </div>
    </section>

        <section id="experiences" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Sahara Desert Adventure", image: "/images/sahara.jpg" },
                { title: "Medina Food Tour", image: "/images/sahara.jpg" },
                { title: "Coastal Paradise Getaway", image: "/images/sahara.jpg" }
              ].map((exp, index) => (
                <div key={index} className="bg-green-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <Image src={exp.image} alt={exp.title} width={400} height={300} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-green-700">{exp.title}</h3>
                    <Link href="#" className="text-orange-600 hover:text-orange-900">Learn More →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">About Live Tounsi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Live Tounsi is your gateway to authentic Tunisian experiences. We connect travelers with local guides and unique adventures, ensuring you experience the true essence of Tunisia. From the bustling medinas to the serene Sahara, we bring Tunisia to life.
            </p>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-4">
                <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <textarea placeholder="Your Message" rows="4" className="w-full p-2 border border-gray-300 rounded"></textarea>
              </div>
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition duration-300">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      {/**<footer className="bg-green-600 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 Live Tounsi. All rights reserved.</p>
          <div className="mt-4">
            <Link href="#" className="mx-2 hover:text-green-200">Privacy Policy</Link>
            <Link href="#" className="mx-2 hover:text-green-200">Terms of Service</Link>
          </div>
        </div>
      </footer>**/}
    </div>
  )
}
/* <video className="w-full max-w-3xl" autoPlay loop muted>
          <source src="video/mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video> */