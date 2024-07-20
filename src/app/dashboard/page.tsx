'use client'
import { withAuth } from '@/components/authentification/withAuth';
import Head from 'next/head'
import Image from 'next/image'
import Card from '@/components/ui/Card';
import {useState,useEffect,useRef} from 'react'
import { motion } from 'framer-motion';
import GuideCard from '@/components/ui/GuideCard';
import Link from 'next/link'
import { subscribeToCollection } from '@/lib/firebase/firebaseControllers';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/components/authentification/AuthContext';
import ExperienceSkeletonCard from '@/components/ui/ExperienceSkeletonCard'
import GuideSkeletonCard from '@/components/ui/GuideSkeletonCard';



const ProtectedPage = () => {

    useEffect(() => {
      setLoading(true);
      
      const unsubscribeExperiences = subscribeToCollection('trips', (data) => {
        setExperiences(data);
      });

      const unsubscribeGuides = subscribeToCollection('users', (data) => {
        const validGuides = data.filter(guide => guide.role === "guide");
        setGuides(validGuides);
      });

      // Function to handle clicks outside the menu
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      // Set loading to false after a short delay to ensure data has been fetched
      const loadingTimer = setTimeout(() => setLoading(false), 1000);

      // Cleanup function
      return () => {
        unsubscribeExperiences();
        unsubscribeGuides();
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(loadingTimer);
      };
    }, []);



  const LogOut=async()=>{
    try{
    await logout();
    }
    catch(err) {
      console.error("Error while logging out",err);
    }
  }

    const [activeCategory, setActiveCategory] = useState('All')
    const [activeTab, setActiveTab] = useState('Experiences')
    const [experiences, setExperiences] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [guides, setGuides] = useState([])

    const menuRef = useRef(null);
    const {user,logout} = useAuth()
    console.log(user)

//TODO: we need to add the attribute category to trips
  const categories = [
    'All', 'Camping', 'Sahara', 'Beach', 'City Tours', 'Historical', 'Cultural', 'Adventure', 'Food & Drink'
  ]
 
  //mock data
    /**const experiences = [
        { id: 1, imageUrl: "/images/sahara.jpg", title: "Sahara Desert Tour", description: "Experience the beauty of the Sahara desert with our expert guides.", price: 199 },
        { id: 2, imageUrl: "/images/tunis-city.jpg", title: "Tunis City Tour", description: "Explore the rich history and culture of Tunis with a local guide.", price: 49 },
      ]**/

     //TODO: we need another collection for guides for more information(speciality and stuff)
      /**const guides = [
        { id: 1, name: "Ahmed Ben Ali", specialty: "Historical Tours", place: "Tunis", imageUrl: "/images/user.jpg" },
        { id: 2, name: "Fatima Zahr", specialty: "Culinary Experiences", place: "Sfax", imageUrl: "/images/woman2.jpg" },
        { id: 3, name: "Youssef Mansour", specialty: "Desert Adventures", place: "Tozeur", imageUrl: "/images/man2.jpg" },
        { id: 4, name: "Leila Bouazizi", specialty: "Cultural Immersion", place: "Kairouan", imageUrl: "/images/woman.jpg" },
      ];**/

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      };
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };
  
    return (

        <div className=" bg-green-50 min-h-screen flex flex-col">
          <nav className="bg-green-600 p-2">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/">
              <div className="flex items-center space-x-4">
                <Image src="/images/logo.jpg" alt="Logo" width={50} height={50} />
                <span className="text-white text-xl font-bold">Live Tounsi</span>
              </div>
              </Link>
              <div className="text-white flex flex-row gap-2">
              <button className="bg-green-700 text-white px-4 py-2 rounded-full text-sm">
                  Apply as Guide
                </button>
                <div className="relative" ref={menuRef}>
                    <button 
                      onClick={() => setIsOpen(!isOpen)} 
                      className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center"
                    >
                      <FaUser className="w-6 h-6 text-white" />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link href={`/dashboard/profile/${user.uid}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <button 
                        onClick={LogOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaSignOutAlt className="inline mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
               
              </div>
            </div>
          </nav>
          <div className='flex container mx-auto gap-6 items-center justify-center pt-4'>
        {['Experiences', 'Guides','NFT Marketplace'].map((tab) => (
          <div
            key={tab}
            className={`pb-2 px-4 cursor-pointer transition duration-300 ${
              activeTab === tab
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
          <main className="container mx-auto mt-8 px-4 flex-grow pb-16">

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 p-2 border border-green-300 rounded text-gray-700"
                />
                <input
                  type="date"
                  className="p-2 border border-green-300 rounded text-gray-700"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                  Search
                </button>
              </div>
            </div>

            <div className="mt-6 mb-8">
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full mr-3 whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mt-12 mb-6">
          {activeTab === 'Experiences' ? 'Explore Experiences' : 'Discover Guides'}
        </h2>

        {activeTab === 'Experiences' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <Card
                key={experience.id}
                id={experience.id}
                imageUrl={"/images/sahara.jpg"} 
                title={experience.title}
                description={experience.description}
                price={experience.price}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {guides.map((guide) => (
              <motion.div key={guide.id} variants={itemVariants}>
                <GuideCard
                  name={guide.username}
                  specialty={"Cultural Immersion"}
                  place={"Tunsia,Tunis"}
                  imageUrl={"/images/woman2.jpg"}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
          </main>
        </div>
      )
};

export default withAuth(ProtectedPage);
