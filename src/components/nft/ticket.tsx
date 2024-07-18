'use client'
import Image from 'next/image';
import { useState } from 'react';

const TouristTicket = () => {
    const [isHovered, setIsHovered] = useState(false);

    const ticket = {
        name: "Tunisia Heritage Tour",
        description: "Explore ancient Carthage and vibrant Sidi Bou Said",
        date: "15 Sep 2024",
        time: "09:00 AM",
        image: "/images/sahara.jpg",
        colors: {
            primary: "from-yellow-400 to-blue-500",
            secondary: "bg-blue-100",
            text: "text-blue-800",
            highlight: "text-yellow-600"
        },
        features: [
            {icon: "🕰️", type: "Duration", value: "6 hours"},
            {icon: "👥", type: "Group Size", value: "Max 12"},
            {icon: "🚶‍♂️", type: "Activity Level", value: "Moderate"},
            {icon: "🍽️", type: "Includes", value: "Lunch"},
            {icon: "🚌", type: "Transport", value: "AC Bus"},
            {icon: "🗣️", type: "Languages", value: "EN, FR, AR"}
        ]
    }
 
    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-br ${ticket.colors.primary}`}>
            <div 
                className="relative w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${ticket.colors.primary} opacity-30`}></div>
                
                <Image src="/images/logo.jpg" alt="Logo" width={50} height={50} className="absolute top-4 left-4 z-10" />
                
                <div className={`relative z-10 p-6 flex flex-col h-full transition-transform duration-300 ${isHovered ? '-translate-y-1/2' : 'translate-y-0'}`}>
                    <div className="flex-grow">
                        <Image src={ticket.image} alt={ticket.name} width={300} height={200} className="rounded-lg shadow-lg object-cover" />
                        <h2 className={`mt-4 text-2xl font-bold ${ticket.colors.text}`}>{ticket.name}</h2>
                        <p className={`mt-2 text-sm ${ticket.colors.text}`}>{ticket.description}</p>
                    </div>
                    
                    <div className={`mt-3 ${ticket.colors.secondary} rounded-lg p-3`}>
                        <p className={`text-sm font-semibold ${ticket.colors.text}`}>Date: {ticket.date}</p>
                        <p className={`text-sm font-semibold ${ticket.colors.text}`}>Time: {ticket.time}</p>
                    </div>
                </div>
                
                <div className={`absolute bottom-0 left-0 w-full bg-white bg-opacity-95 p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                    <h3 className={`${ticket.colors.highlight} font-semibold mb-3 text-center`}>Tour Features</h3>

                    <div className="grid grid-cols-2 gap-2">
                        {ticket.features.map((feature, index) => (
                            <div key={index} className={`${ticket.colors.secondary} rounded-lg p-2 flex items-center`}>
                            <span className="text-2xl mr-2">{feature.icon}</span>
                            <div>
                                <p className={`text-xs ${ticket.colors.highlight}`}>{feature.type}</p>
                                <p className={`text-sm ${ticket.colors.text} font-medium`}>{feature.value}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TouristTicket;























/*'use client'
import Image from 'next/image';
import { useState } from 'react';

const TouristTicket = () => {
    const [isHovered, setIsHovered] = useState(false);

    const ticket = {
        name: "Tunisia Heritage Tour #1",
        description: "Explore ancient Carthage and vibrant Sidi Bou Said",
        date: "15 Sep 2024",
        time: "09:00 AM",
        image: "/images/sahara.jpg",

        //we let the user choose the colors
        colors: {
            primary: "from-yellow-400 to-blue-500",
            secondary: "bg-blue-100",
            text: "text-blue-800",
            highlight: "text-yellow-600"
        },
        features: [
            {icon: "🕰️", type: "Duration", value: "6 hours"},
            {icon: "👥", type: "Group Size", value: "Max 12"},
            {icon: "🚶‍♂️", type: "Activity Level", value: "Moderate"},
            {icon: "🍽️", type: "Includes", value: "Lunch"},
            {icon: "🚌", type: "Transport", value: "AC Bus"},
            {icon: "🗣️", type: "Languages", value: "EN, FR, AR"}
        ]
    }
 
    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-br ${ticket.colors.primary}`}>
            <div 
                className="relative w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${ticket.colors.primary} opacity-30`}></div>
                
                <Image src="/images/logo.jpg" alt="Logo" width={50} height={50} className="absolute top-4 left-4 z-10" />
                
                <div className={`relative z-10 p-6 flex flex-col h-full transition-transform duration-300 ${isHovered ? '-translate-y-1/2' : 'translate-y-0'}`}>
                    <div className="flex-grow">
                        <Image src={ticket.image} alt={ticket.name} width={300} height={200} className="rounded-lg shadow-lg object-cover" />
                        <h2 className={`mt-4 text-2xl font-bold ${ticket.colors.text}`}>{ticket.name}</h2>
                        <p className={`mt-2 text-sm ${ticket.colors.text}`}>{ticket.description}</p>
                    </div>
                    
                    <div className={`mt-3 ${ticket.colors.secondary} rounded-lg p-3`}>
                        <p className={`text-sm font-semibold ${ticket.colors.text}`}>Date: {ticket.date}</p>
                        <p className={`text-sm font-semibold ${ticket.colors.text}`}>Time: {ticket.time}</p>
                    </div>
                </div>
                
                <div className={`absolute bottom-0 left-0 w-full bg-white bg-opacity-95 p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                    <h3 className={`${ticket.colors.highlight} font-semibold mb-3 text-center`}>Tour Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {ticket.features.map((feature, index) => (
                            <div key={index} className={`${ticket.colors.secondary} rounded-lg p-2 flex items-center`}>
                                <span className="text-2xl mr-2">{feature.icon}</span>
                                <div>
                                    <p className={`text-xs ${ticket.colors.highlight}`}>{feature.type}</p>
                                    <p className={`text-sm ${ticket.colors.text} font-medium`}>{feature.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TouristTicket;*/
























