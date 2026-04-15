import React from 'react';

const steps = [
  {
    id: 1,
    title: "Choose a Gift",
    description: "Select the Digi Units for any occasion.",
    icon: "how-step-1.png"
  },
  {
    id: 2,
    title: "Record Your Message",
    description: "Add the recipient's details and write a heartfelt message or video to make your gift special.",
    icon: "how-step-2.png"
  },
  {
    id: 3,
    title: "Send Instantly",
    description: "Your thoughtful gift is delivered instantly to your loved ones via email & text.",
    icon: "how-step-3.png"
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it <span className="text-indigo-600">works</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Gifting Bahumati DiGi units is simple, secure, and takes only a few clicks.
          </p>
        </div>

        {/* Mobile layout: vertical list with icon + text side by side */}
        <div className="flex flex-col lg:hidden gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-4 px-2">
                {/* Left: icon + connector line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
                    <img src={step.icon} alt={step.title} width={40} height={40} className="object-contain" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-8 border-l-2 border-dashed border-indigo-200 my-1" />
                  )}
                </div>
                {/* Right: text */}
                <div className="py-1">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-0.5">
                    Step {String(step.id).padStart(2, '0')}
                  </p>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop layout: horizontal flow with connectors */}
        <div className="hidden lg:flex flex-row items-start justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center flex-1 px-6">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
                  Step {String(step.id).padStart(2, '0')}
                </p>
                <div className="w-28 h-28 bg-gray-900 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <img src={step.icon} alt={step.title} width={72} height={72} className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center self-center pb-20 flex-shrink-0">
                  <div className="w-16 border-t-2 border-dashed border-indigo-200" />
                  <svg className="w-4 h-4 text-indigo-300 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  )
}
