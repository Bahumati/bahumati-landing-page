"use client";
import React from 'react';

const testimonials = [
  {
    text: "Never knew gifting Digital Gold could be this easy! My sister was so happy receiving it on her birthday. The app made it super smooth and secure.",
    name: "Aarav Sharma",
    role: "Investor & Bahumati User",
  },
  {
    text: "I used Bahumati to donate to a temple trust during Diwali. The process was simple, and I got the confirmation instantly. Big thumbs up!",
    name: "Diya Mehta",
    role: "Investor & Bahumati User",
  },
  {
    text: "Sent mutual fund units to my cousin as a wedding gift. So much better than cash or gift cards. It felt meaningful and smart!",
    name: "Rohan Desai",
    role: "Investor & Bahumati User",
  },
  {
    text: "As a new parent, I wanted to invest something valuable for my daughter. Gifting Digital Gold through Bahumati was the perfect choice.",
    name: "Priya Nair",
    role: "Investor & Bahumati User",
  },
  {
    text: "The interface is clean and the process is straightforward. A great way to introduce friends and family to investing.",
    name: "Vikram Singh",
    role: "Investor & Bahumati User",
  },
  {
    text: "Gifting for festivals is so much easier now. I can send valuable gifts to relatives in different cities instantly.",
    name: "Ananya Rao",
    role: "Investor & Bahumati User",
  }
];

// Duplicate the array to create a seamless loop
const extendedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 text-gray-800 overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hear From Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Send your love wrapped in value. Gift Digital Gold or mutual fund units app. Celebrate meaningfully, anytime, anywhere.
          </p>
        </div>

        <div className="relative flex flex-col gap-8">
          {/* First Row */}
          <div className="flex animate-scroll-slow">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={`top-${index}`} className="bg-white border border-gray-200 rounded-2xl p-6 w-[28rem] flex-shrink-0 mx-4">
                <blockquote className="text-gray-600 mb-6">
                  {testimonial.text}
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row (offset and reversed direction) */}
          <div className="flex animate-scroll-reverse">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={`bottom-${index}`} className="bg-white border border-gray-200 rounded-2xl p-6 w-[28rem] flex-shrink-0 mx-4">
                <blockquote className="text-gray-600 mb-6">
                  {testimonial.text}
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll-slow {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes scroll-reverse {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-scroll-slow {
          animation: scroll-slow 60s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
