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
    { name: 'Delete Account Policy', href: '/delete-account-policy' },
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

        {/* Social Links */}
        <div className="mt-10 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-5">Follow Us</h3>
          <div className="flex flex-col sm:flex-row gap-6">

            {/* Bahumati */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Bahumati</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/bahumati.in?igsh=MWZqZnNxdDF1aTVyOQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E1306C] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @bahumati.in
                </a>
              </div>
            </div>

            {/* Founder */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Founder — Venu Gopal Gutta</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/ven.u.think?igsh=c2F5NWRyNjBkdWRz&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E1306C] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @ven.u.think
                </a>
                <a
                  href="https://www.linkedin.com/in/venu-gopal-gutta-a5b148274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A66C2] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Venu Gopal Gutta
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            All Rights Reserved. © 2025 Bahumati Digi Units Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}
