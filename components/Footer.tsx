'use client'

import React from 'react';

const footerLinks = {
  general: [
    { name: 'About Us', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '/contact-us' },
    { name: 'Careers', href: '#' }
  ],
  gifting: [
    { name: 'Send a Gift', href: '#' },
    { name: 'Schedule Gifting', href: '#' },
    { name: 'Gift Ideas', href: '#' },
    { name: 'Latest Updates', href: '#' },
  ],
  investing: [
    { name: 'Invest in Gold', href: '#' },
    { name: 'Invest in Mutual Funds', href: '#' },
    { name: 'Portfolio Tracking', href: '#' },
    { name: 'Returns & Reports', href: '#' },
    { name: 'Investment FAQs', href: '#' }
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ],
  others: [
    { name: 'Contact Support', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Report a Vulnerability', href: '#' },
    { name: 'Press', href: '#' }
  ]
};

const socialLinks = [
  { name: 'Twitter', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Facebook', href: '#' }
];


export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {/* Column 1: General */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">General</h3>
            <ul className="space-y-3">
              {footerLinks.general.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 2: Gifting */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Gifting</h3>
            <ul className="space-y-3">
              {footerLinks.gifting.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 3: Investing */}
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Investing</h3>
            <ul className="space-y-3">
              {footerLinks.investing.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 & 6: Newsletter */}
          {/* <div className="col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Join Our Newsletter</h3>
            <p className="text-gray-500 mb-4">
              Stay up to date with our latest updates, offers & much more
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-l-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div> */}

          {/* Column 1: Others */}
          {/* <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Others</h3>
            <ul className="space-y-3">
              {footerLinks.others.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 2: Connect with us */}
          {/* <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Connect with us</h3>
            <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 border rounded-full flex items-center justify-center">X</div>
                </a>
                 <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Youtube</span>
                     <div className="w-6 h-6 border rounded-full flex items-center justify-center">Y</div>
                </a>
                 <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Instagram</span>
                     <div className="w-6 h-6 border rounded-full flex items-center justify-center">I</div>
                </a>
                 <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                     <div className="w-6 h-6 border rounded-full flex items-center justify-center">L</div>
                </a>
                 <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                     <div className="w-6 h-6 border rounded-full flex items-center justify-center">F</div>
                </a>
            </div>
          </div> */}

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            All Rights Reserved. © 2025 Bahumati Digi Units Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}
