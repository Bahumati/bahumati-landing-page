import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-600">
          <p>Last updated: January 2025</p>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p>
              Bahumati Digi Units Pvt. Ltd. ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
              This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from)
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Identity Data: includes first name, last name, username or similar identifier.</li>
              <li>Contact Data: includes billing address, delivery address, email address and telephone numbers.</li>
              <li>Financial Data: includes bank account and payment card details.</li>
              <li>Transaction Data: includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at bahumati369@gmail.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
