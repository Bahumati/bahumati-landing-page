"use client";
import React from 'react';

// Main component
export default function UniqueFeatures() {
  return (
    <section className="py-20 bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="text-left mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Avail Best Experience with our Unique Features
          </h2>
          <p className="text-indigo-200">
            Discover a seamless and meaningful way to gift and self-gift with features designed for your convenience and peace of mind.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Top Card: No Demat */}
          <div className="lg:col-span-3 bg-white text-gray-800 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">No Demat, No Hassle</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                You do not require a Demat Account or go through multiple KYC document verifications to start gifting or self-gifting with Bahumati thanks to our whole new payment infrastructure.
              </p>
              {/* <button className="bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto md:mx-0">
                Get Started 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
              </button> */}
              <div className="mt-4 md:mt-6">
                <p className="text-xs text-gray-500">Powered by</p>
                <img src="powered-by-logos.png" alt="Logos" className="h-4 md:h-6 mt-1 mx-auto md:mx-0" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img src="phones-mockup.png" alt="App on phones" className="w-full max-w-sm md:max-w-none h-auto mx-auto" />
            </div>
          </div>

          {/* Gift a Future Card (Wider) */}
          <div className="lg:col-span-2 bg-white text-gray-800 rounded-2xl shadow-lg min-h-[320px] md:h-80 flex flex-col md:flex-row items-center p-0 overflow-hidden">
            <div className="w-full md:w-1/2 z-10 p-6 md:p-8 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Gift The Indias Growth to Your Loved Little Ones</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Start their journey with the gift of Bahumati digital units. Invest in their future with top 50 indian companies or gold units, meaningful, and timeless.
              </p>
              {/* <button className="bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold mx-auto md:mx-0">
                Start Gifting Now
              </button> */}
            </div>
            <div className="w-full md:w-1/2 h-48 md:h-full relative">
              <img src="gift-illustration.png" alt="Mother and child illustration" className="absolute bottom-0 right-0 h-full w-auto object-contain mx-auto md:mx-0" />
            </div>
          </div>

          {/* Profits Card 1 (Square) */}
          <div className="bg-white text-gray-800 rounded-2xl shadow-lg min-h-[320px] md:h-80 flex flex-col p-6 md:p-8 overflow-hidden">
            <h3 className="text-4xl md:text-6xl font-bold">1k+</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Seen in Profits by the users over the span</p>
            <div className="flex-grow mt-3 md:mt-4 -mr-6 md:-mr-8 -mb-6 md:-mb-8">
              <img src="profit-graph.png" alt="Profit graph" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Profits Card 2 */}
          <div className="hidden lg:block bg-white text-gray-800 rounded-2xl shadow-lg min-h-[320px] md:h-80 flex flex-col p-6 md:p-8 overflow-hidden">
            <h3 className="text-4xl md:text-6xl font-bold">1k+</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Seen in Profits by the users over the span</p>
            <div className="flex-grow mt-3 md:mt-4 -mr-6 md:-mr-8 -mb-6 md:-mb-8">
              <img src="profit-graph.png" alt="Profit graph" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Support Sacred Spaces Card */}
          <div className="lg:col-span-2 bg-white text-gray-800 rounded-2xl shadow-lg min-h-[320px] md:h-80 flex flex-col md:flex-row items-center p-0 overflow-hidden">
            <div className="w-full md:w-1/2 z-10 p-6 md:p-8 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Support Sacred Spaces & Noble Causes</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Easily donate Bahumati DiGi units to temples or registered trusts and be a part of something meaningful.
              </p>
              {/* <button className="bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold mx-auto md:mx-0">
              Donate Now
              </button> */}
            </div>
            <div className="w-full md:w-1/2 h-48 md:h-full flex items-center justify-center">
            <img src="temple-illustration.png" alt="Temple illustration" className="w-[80%] h-auto" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
