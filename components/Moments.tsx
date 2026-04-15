"use client";
import React from 'react';

// Data for the parallax images with updated positions
const parallaxImages = [
  // Left side elements
  { id: 'graph', src: 'graph.png', alt: 'Investment Graph', className: 'w-20 sm:w-24 md:w-32 lg:w-48 h-auto left-2 sm:left-4 md:left-8 lg:left-60 top-2 md:top-6 lg:top-10', speed: 0.3 },
  { id: 'coin1', src: 'coin1.png', alt: 'Gold Coin', className: 'w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12 left-1 sm:left-2 md:left-4 lg:left-56 top-8 sm:top-12 md:top-24 lg:top-48', speed: 0.5 },
  { id: 'coin2', src: 'coin2.png', alt: 'Gold Coin', className: 'w-8 sm:w-12 md:w-16 lg:w-20 h-8 sm:h-12 md:h-16 lg:h-20 left-4 sm:left-8 md:left-16 lg:left-80 top-12 sm:top-16 md:top-24 lg:top-80', speed: 0.2 },
  { id: 'portfolio_card', src: 'rect1.png', alt: 'Portfolio Card UI', className: 'w-24 sm:w-32 md:w-40 lg:w-52 h-auto left-6 sm:left-12 md:left-20 lg:left-96 top-10 sm:top-14 md:top-28 lg:top-96', speed: 0.35 },

  // Right side elements
  { id: 'gold_units_card', src: 'rect3.png', alt: 'Gold Units Card UI', className: 'w-20 sm:w-24 md:w-32 lg:w-48 h-auto right-2 sm:right-4 md:right-8 lg:right-72 top-1 md:top-4 lg:top-4', speed: 0.2 },
  { id: 'gift', src: 'gift1.png', alt: 'Gift Box', className: 'w-8 sm:w-10 md:w-12 lg:w-16 h-8 sm:h-10 md:h-12 lg:h-16 right-4 sm:right-8 md:right-16 lg:right-96 top-2 sm:top-4 md:top-12 lg:top-24', speed: 0.4 },
  { id: 'mutual_fund_card', src: 'rect2.png', alt: 'Mutual Fund Card UI', className: 'w-28 sm:w-40 md:w-56 lg:w-72 h-auto right-1 sm:right-2 md:right-4 lg:right-48 top-6 sm:top-8 md:top-16 lg:top-56', speed: 0.6 },
];

export default function Moments() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="text-indigo-600">Moments</span> Deserve More Than
            <br />
            Just Beautiful <span className="text-indigo-600">Wishes</span>
          </h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto mb-6">
            Send your love wrapped in value. Gift Top 50 Indian Companies or Digital Gold units. Celebrate Birthdays and Marriages anytime, anywhere.
          </p>
          <p className="font-semibold text-gray-700 mb-4">Soon you can Download on</p>
          <div className="flex justify-center items-center gap-4">
            <a aria-label="Download on the App Store">
              <img src="app-store-badge.png" alt="App Store Badge" className="h-12" />
            </a>
            <a aria-label="Get it on Google Play">
              <img src="google-play-badge.png" alt="Google Play Badge" className="h-12" />
            </a>
          </div>
        </div>

        {/* Parallax Container */}
        <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] my-6 sm:my-8 md:my-12 lg:my-16 flex items-center justify-center">
          {/* Central Phone Mockup - Static */}
          <div className="relative z-10">
            <img src="phone-mockup.png" alt="Phone App Mockup" className="w-auto h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px]" />
          </div>

          {/* Floating Parallax Images */}
          {parallaxImages.map((image) => (
            <div
              key={image.id}
              className={`absolute ${image.className} z-20`}
              style={{
                transform: `translateY(${scrollY * image.speed * 0.1}px)`
              }}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        {/* <div className="flex justify-center items-center gap-4 mt-12">
          <img src="reviews.png" alt="User reviews" className="h-12" />
          <p className="font-semibold text-gray-700">
            Trusted by <span className="text-indigo-600">1 Lakh+</span> Indians
          </p>
        </div> */}
      </div>
    </section>
  );
}
