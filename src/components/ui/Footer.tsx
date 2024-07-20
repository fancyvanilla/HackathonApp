import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex bg-green-600 text-white py-8 w-full">
    <div className="container mx-auto px-6 text-center">
      <p>© 2024 Live Tounsi. All rights reserved.</p>
      <div className="mt-4">
        <Link href="#" className="mx-2 hover:text-green-200">Privacy Policy</Link>
        <Link href="#" className="mx-2 hover:text-green-200">Terms of Service</Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer