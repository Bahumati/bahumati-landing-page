import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactUs() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            Have questions about our services or need assistance? Our team is here to help. Reach out to us through any of the following channels.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900">Address</h3>
                                <p className="text-gray-600">Bahumati Digi Units Pvt. Ltd.<br />India</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900">Email</h3>
                                <p className="text-gray-600">bahumati369@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    {/* 
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Your Name" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="How can we help?"></textarea>
                            </div>

                            <button type="button" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium">
                                Send Message
                            </button>
                        </form>
                    </div> */}

                </div>
            </div>
            <Footer />
        </main>
    )
}
