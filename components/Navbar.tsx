'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="logo.png"
              alt="Bahumathi Logo"
              className="h-36 w-auto"
            />
          </a>

          {/* Right-aligned group for desktop */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Desktop Navigation Links */}
            {/* <a href="#about" className="text-gray-700 hover:text-indigo-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors">
              ABOUT US
            </a> */}
            {/* <a href="#features" className="text-gray-700 hover:text-indigo-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors">
              FEATURES
            </a> */}
            {/* <a href="#resources" className="text-gray-700 hover:text-indigo-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors">
              RESOURCES
            </a> */}
            <a href="/contact-us" className="text-gray-700 hover:text-indigo-600 px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors">
              CONTACT
            </a>

            {/* Language Selector */}
            {/* <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-indigo-600 text-sm font-medium transition-colors">
              <img
              src="language.png"
              alt="language icon"
              className="h-5 w-auto mr-2"
            />
                  ENG
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              </button>
            </div> */}

            {/* Vertical Divider */}
            <div className="h-8 border-l border-gray-300"></div>

            {/* CTA Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 xl:px-4 py-2 rounded-lg font-medium transition-colors flex items-center text-xs xl:text-sm">
              <img
                src="gift.png"
                alt="gift icon"
                className="h-4 xl:h-5 w-auto mr-1 xl:mr-2"
              />
              Coming Soon
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {/* <a href="#about" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                ABOUT US
              </a>
              <a href="#features" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                FEATURES
              </a>
              <a href="#resources" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                RESOURCES
              </a> */}
              <a href="/contact-us" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                CONTACT
              </a>
              {/* <div className="border-t border-gray-200 pt-4 mt-2">
                 <div className="flex items-center px-3 py-2">
                 <img
              src="language.png"
              alt="language icon"
              className="h-5 w-auto mr-2"
            />
                    <span className="text-gray-700 font-medium">ENG</span>
                 </div>
               </div> */}
              <div className="pt-2">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <img
                    src="gift.png"
                    alt="gift icon"
                    className="h-5 w-auto mr-2"
                  />
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
