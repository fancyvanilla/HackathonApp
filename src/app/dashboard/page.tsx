'use client'
import { withAuth } from '@/components/authentification/withAuth';
import Image from 'next/image'
import Card from '@/components/ui/Card';
import {useState, useEffect, useRef} from 'react'
import { motion } from 'framer-motion';
import GuideCard from '@/components/ui/GuideCard';
import Link from 'next/link'
import { subscribeToCollection } from '@/lib/firebase/firebaseControllers';
import { useAuth } from '@/components/authentification/AuthContext';
import { useRouter } from 'next/navigation';
import {FaSignOutAlt, FaBell, FaSearch, FaUser, FaCalendar, FaPaintBrush } from 'react-icons/fa';


const ProtectedPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('Experiences')
  const [experiences, setExperiences] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guides, setGuides] = useState([])
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //this needs to be stored on user session and gets updated when a new notif comes
  const [seenNotifications, setSeenNotifications]=useState(false);
  const router = useRouter()

  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const {user, logout} = useAuth()

//for dynamic search
  const getPlaceholder = () => {
    switch(activeTab) {
      case 'Experiences':
        return 'Search for experiences...';
      case 'Guides':
        return 'Find a guide...';
      case 'NFT Marketplace':
        return 'Search for NFTs...';
      default:
        return 'Search...';
    }
  };

  const getIcon = () => {
    switch(activeTab) {
      case 'Experiences':
        return <FaSearch />;
      case 'Guides':
        return <FaUser />;
      case 'NFT Marketplace':
        return <FaPaintBrush />;
      default:
        return <FaSearch />;
    }
  }

  // Static array of notifications
  const notifications = [
    { id: 1, message: "New experience added in Tunis!" },
    { id: 2, message: "Your booking has been confirmed." },
    { id: 3, message: "A guide responded to your inquiry." },
  ];

  useEffect(() => {
    setLoading(true);
    
    const unsubscribeExperiences = subscribeToCollection('trips', (data) => {
      setExperiences(data);
    });

    const unsubscribeGuides = subscribeToCollection('users', (data) => {
      const validGuides = data.filter(guide => guide.role === "guide");
      setGuides(validGuides);
    });

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    const loadingTimer = setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubscribeExperiences();
      unsubscribeGuides();
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(loadingTimer);
    };
  }, []);

  const LogOut = async () => {
    try {
      await logout();
    } catch(err) {
      console.error("Error while logging out", err);
    }
  }

  const categories = [
    'All', 'Camping', 'Sahara', 'Beach', 'City Tours', 'Historical', 'Cultural', 'Adventure', 'Food & Drink'
  ]

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
    <div className="bg-gray-50 min-h-screen flex flex-col">

        <nav className="bg-white border-b border-gray-200 py-4 px-6 fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="rounded-full" />
              <span className="text-gray-900 text-lg font-semibold">Live Tounsi</span>
            </Link>
            <div className="flex items-center space-x-6">
              <button 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={() => router.push("https://docs.google.com/forms/d/e/1FAIpQLSeaY_fe72T0s8IjRxh9yDkczT-GR7gRHAh7ocSQdQ52u7bZpg/viewform?usp=sf_link")}
              >
                Apply as Guide
              </button>
              
              {/* Notification Icon */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications)
                    setSeenNotifications(true)
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <FaBell className="w-5 h-5" />
                  { !seenNotifications && notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {notification.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <FaUser className="w-4 h-4" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
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
            <div className='flex container mx-auto gap-6 items-center justify-center pt-6 pb-2'>
            {['Experiences', 'Guides', 'NFT Marketplace'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
              <div className="container mx-auto px-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className="text-gray-400">
                {getIcon()}
              </div>
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-2 outline-none text-gray-700"
              />
              {activeTab === 'Experiences' && (
                <input
                  type="date"
                  className="p-2 border-l border-gray-200 text-gray-700 focus:outline-none"
                />
              )}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Search
              </button>
            </div>
          </div>
        <main className="container mx-auto mt-10 px-4 flex-grow pb-16 max-w-7xl">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className='flex gap-6 items-center mb-8 border-b'>
            {['Experiences', 'Guides', 'NFT Marketplace'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

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
                    place={"Tunisia, Tunis"}
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
