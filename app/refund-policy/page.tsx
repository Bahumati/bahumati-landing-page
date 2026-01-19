import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RefundPolicy() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>

                <div className="space-y-6 text-gray-600">
                    <p>Last updated: January 2025</p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Returns and Refunds</h2>
                        <p>
                            Thank you for shopping at Bahumati Digi Units Pvt. Ltd.
                        </p>
                        <p className="mt-2">
                            If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Contact Us</h2>
                        <p>
                            If you have any questions about our Returns and Refunds Policy, please contact us:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>By email: support@bahumati.com</li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
