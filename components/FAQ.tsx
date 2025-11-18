"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// --- Helper Components for Icons ---

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

// --- TypeScript Interfaces ---
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  [key: string]: FaqItem[];
}

interface FormDataState {
  name: string;
  email: string;
  dob: string;
  number: string;
}

// --- FAQ Component (from your code) ---
const faqData: FaqData = {
  Gifting: [
    {
      question: "How do I send a digital gift through Bahumati?",
      answer:
        "Simply choose the asset you want to gift, enter the recipient’s phone number or Bahumati ID, add an optional message, and hit send. It’s fast, secure, and takes just a few taps.",
    },
    {
      question: "What types of assets can I gift on Bahumati?",
      answer:
        "You can gift a variety of digital units, including Gold and units of Top 50 Indian Companies.",
    },
    {
      question: "Can I schedule a gift for a birthday or special occasion?",
      answer:
        "Yes, our platform allows you to schedule gifts for future dates, ensuring your loved ones receive their surprise on their special day.",
    },
    {
      question:
        "Will the recipient need a Bahumati account to receive the gift?",
      answer:
        "Yes, the recipient will be prompted to create a free Bahumati account to claim and manage their gifted asset. The process is quick and easy.",
    },
    {
      question: "Is my gift safe and private?",
      answer:
        "Absolutely. All transactions are end-to-end encrypted, and we adhere to strict privacy policies to ensure your data and gifts are secure.",
    },
  ],
  Investing: [
    {
      question: "What are the benefits of investing through Bahumati?",
      answer:
        "Bahumati offers a user-friendly platform with curated investment options, zero commission, and the ability to start with small amounts. It's designed to make investing accessible to everyone.",
    },
  ],
  Transactions: [
    {
      question: "Are there any hidden fees on transactions?",
      answer:
        "No, Bahumati is a zero-commission platform. We believe in complete transparency. The only charges are the standard expense ratios applicable to mutual funds.",
    },
    {
      question: "How long do transactions take to process?",
      answer:
        "Most transactions, including self-gifting and gifting, are processed instantly or within a few business hours.",
    },
  ],
  "Security & Services": [
    {
      question: "Is Bahumati regulated?",
      answer:
        "Yes, Bahumati is a SEBI-registered platform, and we comply with all regulatory guidelines to ensure the safety and security of your investments.",
    },
    {
      question: "What kind of customer support do you offer?",
      answer:
        "We offer 24/7 customer support through live chat and email. Our dedicated team is always ready to assist you with any queries or issues.",
    },
  ],
};

const categories: string[] = [
  "Gifting",
  "Investing",
  "Transactions",
  "Security & Services",
];

function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("Gifting");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" style={{ color: "#6C63FF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Have questions? We've got answers. Explore our FAQs to find the
            information you need.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(0);
                  }}
                  className={`w-full text-left px-6 py-4 rounded-lg font-semibold transition-all duration-300 text-lg shadow-sm ${
                    activeCategory === category
                      ? "bg-[#6C63FF] text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqData[activeCategory].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-md font-semibold text-[#111827] pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 text-[#6C63FF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className={`transition-transform duration-300 ${
                          openIndex === index ? "transform rotate-180" : ""
                        }`}
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out grid ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5">
                        <p className="text-[#6B7280] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Main Page Component ---

export default function ContactPage() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    dob: "",
    number: "",
  });
  const [status, setStatus] = useState<string>("");

  // IMPORTANT: Replace this with the URL you get after deploying your Google Apps Script.
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbylvAClGMwqeJ1xj2Y5ERAAfcB6xHbkOkH5NkxRei3nWw1dQqyJAxSORLco0Trf_Ae9gw/exec";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name.toLowerCase()]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("dob", formData.dob);
    data.append("number", formData.number);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          setStatus("Thank you! We will notify you at launch.");
          setFormData({ name: "", email: "", dob: "", number: "" }); // Reset form
          setTimeout(() => setStatus(""), 4000);
        } else {
          throw new Error(data.error || "An unknown error occurred.");
        }
      })
      .catch((error) => {
        console.error("Error submitting to Google Sheet:", error);
        setStatus(`Error: Could not submit. ${error.message}`);
      });
  };

  return (
    <div className="bg-white min-h-screen">
      <style jsx global>{`
        :root {
          --primary: #6c63ff;
          --secondary: #ffb400;
          --heading: #111827;
          --body: #6b7280;
          --primary-light: #f0f0ff;
        }
        input[type="date"]::-webkit-datetime-edit {
          color: transparent; /* hide dd-mm-yyyy */
        }
        input[type="date"]:focus::-webkit-datetime-edit,
        input[type="date"]:valid::-webkit-datetime-edit {
          color: inherit; /* show entered date once valid */
        }
      `}</style>

      <main className="overflow-hidden">
        {/* Contact Form Section */}
        <section className="relative py-20 md:py-24 bg-gray-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--primary-light)] clip-path-polygon"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side: Text Content */}
              <div className="text-center md:text-left">
                <span className="font-bold text-[var(--primary)] uppercase">
                  Launching Soon
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--heading)] mt-2 mb-6">
                  Be the First to Experience Bahumati
                </h1>
                <p className="text-lg text-[var(--body)] mb-8">
                  A new era of digital gifting and self gifting is just around the
                  corner. If you're interested, fill out the form and we'll
                  notify you the moment our platform goes live!
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-[var(--body)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[var(--primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Get Notified at Launch</span>
                </div>
              </div>

              {/* Right Side: Form Card */}
              <div className="bg-white p-8 rounded-2xl shadow-2xl z-10">
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
                  Join the Waitlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="w-full pl-10 pr-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EmailIcon />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full pl-10 pr-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                    />
                  </div>
                  {/* DOB Input (FIXED) */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarIcon />
                    </div>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 pt-5 pb-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition peer"
                    />
                    <label
                      htmlFor="dob"
                      className="absolute left-10 top-4 text-gray-500 transition-all duration-200 pointer-events-none
             peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--primary)]
             peer-valid:top-1.5 peer-valid:text-xs peer-valid:text-[var(--primary)]"
                    >
                      Date of Birth
                    </label>
                  </div>
                  {/* Phone Number Input (Optional) */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon />
                    </div>
                    <input
                      type="tel"
                      name="number"
                      id="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="Phone Number (Optional)"
                      className="w-full pl-10 pr-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition"
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                  >
                    Get Notified
                  </button>
                  {status && (
                    <p className="text-center text-[var(--body)] mt-4">
                      {status}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />
      </main>
      <style jsx>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
        }
        @media (max-width: 768px) {
          .clip-path-polygon {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
}
