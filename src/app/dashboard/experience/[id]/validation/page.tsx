'use client'
import React, { useEffect, useState } from 'react';
import usePetra from '@/components/petra/usePetra';
import { FaWallet, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import PetraGuide from '@/components/ui/PetraGuide';
import {useRouter} from 'next/navigation'

const Page = () => {
    const {
        account,
        wallet,
        connectWallet,
        disconnectWallet,
        loading,
        error,
        isInstalled,
        isConnected,
        isCancelled,
    } = usePetra();

    const router=useRouter();

    //const [isAttemptingConnect, setIsAttemptingConnect] = useState(false);
    //const [isSettingUpWallet, setIsSettingUpWallet] = useState(false);

    useEffect(() => {
        if (isInstalled && !isConnected && !isCancelled) {
            connectWallet().then(() => {
                console.log("Connection attempt completed");
            }).catch((error) => {
                console.error("Connection attempt failed:", error);
            });
        }
    }, [isInstalled, isConnected, isCancelled, connectWallet]);

    const handleCopyAddress = () => {
        if (account?.address) {
            navigator.clipboard.writeText(account.address);
            alert('Address copied to clipboard!');
        }
    };

    const userCancels=()=>{
        disconnectWallet()
        .then(()=>{
            console.log("wallet disconnected!")
            router.back()
        })

    }

    if (!isInstalled) {
        return <PetraGuide />;
    }

    if (loading.loading) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
                <h3 className='text-gray-900 text-2xl p-4 w-4/6'>{loading.message}</h3>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                <button 
                onClick={userCancels}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Cancel
                </button>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <FaExclamationTriangle className="text-red-500 text-5xl mb-4 mx-auto" />
                    <h2 className="text-2xl font-bold mb-4 text-black">Error</h2>
                    <p className="text-red-500 mb-4">{error}</p>
                </div>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <button 
                    onClick={connectWallet} 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Connect Wallet
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Confirm Transaction</h2>
                <div className="mb-6">
                    <div className="flex items-center mb-2">
                        <FaWallet className="text-blue-500 mr-2" />
                        <span className="font-semibold text-gray-800">Account Address:</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                        <span className="text-sm break-all text-black">{account?.address}</span>
                        <button onClick={handleCopyAddress} className="ml-2 text-blue-500 hover:text-blue-600">
                            Copy
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center mb-2">
                        <FaShieldAlt className="text-green-500 mr-2" />
                        <span className="font-semibold">Security Assurance:</span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>Your NFTs and account will be stored using this address.</li>
                        <li>You can verify your assets in your Petra wallet at any time.</li>
                        <li>We do not have access to your private keys.</li>
                        <li>You will need to sign each transaction for security.</li>
                    </ul>
                </div>
                <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Confirm
                    </button>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;