const GIFTING_URL = process.env.NEXT_PUBLIC_GIFTING_URL || 'https://app.bahumati.in'

export default function Hero() {
  return (
    <section className="relative top-14 flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Top Pill Button */}
      <div className="absolute top-8 md:top-8">
        <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
          </svg>
          Redefining the way India Gifts!
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20 md:mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 mb-4 leading-tight">
          Celebrate Moments With
          <br />
          <span className="text-gray-800">Meaningful Digital Units</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          A revolutionary way to gift in India. Send Top 50 Indian Company Units and Digital Gold with personalized wishes instantly to your loved ones.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${GIFTING_URL}/gift`}
            className="group relative inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-base transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 active:scale-95"
          >
            <img src="gift.png" alt="" className="h-5 w-auto" />
            Gift Someone
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href={`${GIFTING_URL}/selfgift`}
            className="inline-flex items-center gap-3 bg-white hover:bg-indigo-50 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Gift Yourself
          </a>
        </div>

        {/* Subtle social proof line */}
        <p className="mt-6 text-sm text-gray-400">
          Invest in Digital Gold &amp; Top 50 Indian Companies <br /> gift it to anyone, instantly.
        </p>
      </div>

      {/* Bottom Map Image */}
      <div className="relative w-full max-w-5xl mt-4 md:mt-0">
        <img
          src="hero.png"
          alt="Dotted map of India with gift and coin icons"
          width="1200"
          height="600"
          className="object-contain w-full h-auto"
        />
      </div>
    </section>
  )
}
