import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

                <div className="space-y-6 text-gray-600">
                    <p>Last updated: January 2025</p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Agreement to Terms</h2>
                        <p>
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Bahumati Digi Units Pvt. Ltd. ("we," "us" or "our"),
                            concerning your access to and use of our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. User Representations</h2>
                        <p>
                            By using our services, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site and Services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs,
                            and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Prohibited Activities</h2>
                        <p>
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of India. Bahumati Digi Units Pvt. Ltd. and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
