'use client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import {useAuth} from '@/components/authentification/AuthContext'
import { FaRegUserCircle, FaEthereum, FaShieldAlt, FaGlobeAfrica, FaUserFriends, FaMobileAlt } from "react-icons/fa";

const ThreeJSAnimation = dynamic(() => import('../components/animation/ThreeJsAnimation'), { ssr: false })

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Head>
        <title>Live Tounsi - Blockchain-Powered Tunisian Experiences</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.jpg" 
                alt="Live Tounsi Logo" 
                width={50} 
                height={50} 
                className="rounded-full mr-3"
              />
              <span className="font-bold text-2xl text-green-600">Live Tounsi</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#experiences" className="text-gray-700 hover:text-green-600 transition duration-300">Experiences</Link>
              <Link href="#about" className="text-gray-700 hover:text-green-600 transition duration-300">About</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-green-600 transition duration-300">How It Works</Link>
              <Link href="#contact" className="text-gray-700 hover:text-green-600 transition duration-300">Contact</Link>
              {loading ? (
                <div className="w-6 h-6 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
              ) : user ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition duration-300">
                  <FaRegUserCircle className="h-6 w-6" />
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-700 hover:text-green-600 transition duration-300">Sign In</Link>
                  <Link href="/register" className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition duration-300">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-green-600 transition duration-300">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                  ) : (
                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2">
            <Link href="#experiences" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">Experiences</Link>
            <Link href="#about" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">About</Link>
            <Link href="#how-it-works" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">How It Works</Link>
            <Link href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">Contact</Link>
            {!user && (
              <>
                <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">Sign In</Link>
                <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white transition duration-300">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      <main className="pt-16">
        <section className="h-screen relative overflow-hidden">
          <ThreeJSAnimation />
          <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-50">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Discover Tunisia with Blockchain</h1>
              <p className="text-xl mb-8 text-white">Secure, transparent, and unforgettable experiences.</p>
              <Link href="#experiences" className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
                Explore Experiences
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose Live Tounsi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                  <Image 
                    src="/images/aptos-apt-logo.svg" 
                    alt="Aptos APT Logo" 
                    width={50} 
                    height={50} 
                    className="mx-auto text-5xl mb-4"
                  />
                {/**<FaEthereum className="mx-auto text-5xl text-green-500 mb-4" />**/}
                <h3 className="text-xl font-semibold mb-2  text-gray-900">Blockchain-Powered</h3>
                <p className="text-gray-600">Aptos Secure transactions and smart contracts ensure transparency and trust</p>
              </div>
              <div className="text-center">
                <FaUserFriends className="mx-auto text-5xl text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Local Expertise</h3>
                <p className="text-gray-600">Connect with verified local guides for authentic experiences</p>
              </div>
              <div className="text-center">
                <FaMobileAlt className="mx-auto text-5xl text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Booking</h3>
                <p className="text-gray-600">Book and manage your experiences with our user-friendly app</p>
              </div>
            </div>
          </div>
        </section>

        <section id="experiences" className="py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Featured Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Sahara Desert Adventure", image: "/images/sahara.jpg" },
                { title: "Medina Food Tour", image: "/images/tunis-city.jpg" },
                { title: "Coastal Paradise Getaway", image: "/images/summer.jpg" }
              ].map((exp, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <Image src={exp.image} alt={exp.title} width={400} height={300} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-green-700">{exp.title}</h3>
                    <p className="text-gray-600 mb-4">Experience the beauty of Tunisia with our curated adventures.</p>
                    <Link href="#" className="text-orange-600 hover:text-orange-900">Learn More →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image src="/images/eljam.jpg" alt="Tunisian Culture" width={500} height={400} className="rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Discover the Heart of Tunisia</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Live Tounsi is more than just a travel app. We&apos;re a blockchain-powered platform connecting travelers with authentic Tunisian experiences and local guides. Our mission is to showcase the true essence of Tunisia while ensuring secure and transparent transactions.
                </p>
                <Link href="#" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Browse Experiences</h3>
                <p className="text-gray-600">Explore our curated list of authentic Tunisian experiences and local guides</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Book Securely</h3>
                <p className="text-gray-600">Use our blockchain-powered system for safe and transparent booking</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Enjoy Tunisia</h3>
                <p className="text-gray-600">Meet your local guide and create unforgettable memories</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Contact Us</h2>
            <form className="max-w-lg mx-auto">
              <div className="mb-4">
                <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="mb-4">
                <textarea placeholder="Your Message" rows="4" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
              </div>
              <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 w-full">Send Message</button>
            </form>
          </div>
        </section>
      </main>
      </div>
  )}

/** </div> <video className="w-full max-w-3xl" autoPlay loop muted>
          <source src="video/mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video> **/