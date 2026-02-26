'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://server.bahumati.in/api/v1'

type Step = 'terms' | 'phone' | 'otp' | 'done' | 'error'

export default function DeleteAccountPolicy() {
  const [step, setStep] = useState<Step>('terms')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [number, setNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const sendOtp = async () => {
    setError('')
    const num = number.replace(/\D/g, '').slice(-10)
    if (num.length !== 10) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: num }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Failed to send OTP')
        return
      }
      setNumber(num)
      setStep('otp')
    } catch (e) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyAndDelete = async () => {
    setError('')
    if (!otp || otp.length !== 4) {
      setError('Enter the 4-digit OTP')
      return
    }
    setLoading(true)
    try {
      const verifyRes = await fetch(`${API_BASE}/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, otp }),
      })
      const verifyData = await verifyRes.json().catch(() => ({}))
      if (!verifyRes.ok) {
        setError(verifyData.message || 'Invalid OTP')
        return
      }
      const token = verifyData.token
      if (!token) {
        setError('Verification failed')
        return
      }
      const delRes = await fetch(`${API_BASE}/users/me`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const delData = await delRes.json().catch(() => ({}))
      if (!delRes.ok) {
        setError(delData.message || 'Failed to delete account')
        return
      }
      setSuccessMessage('Your account has been permanently deleted.')
      setStep('done')
    } catch (e) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Delete Account &amp; Data Policy</h1>

        <div className="space-y-6 text-gray-600">
          <p>Last updated: January 2025</p>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Your right to delete</h2>
            <p>
              You may request permanent deletion of your Bahumati account and associated data at any time.
              This action is irreversible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. What we delete</h2>
            <p>When you permanently delete your account, we remove:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your profile (name, phone number, photo, preferences)</li>
              <li>Gift and portfolio data linked to your account</li>
              <li>Chat and conversation history</li>
              <li>KYC and bank details (where applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Safety &amp; verification</h2>
            <p>
              To protect your account, we verify your identity using your registered mobile number and a one-time password (OTP)
              before processing any deletion request. Do not share your OTP with anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. After deletion</h2>
            <p>
              Once your account is deleted, you will not be able to recover it or access any previous data.
              You may create a new account later using the same or a different mobile number.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Contact</h2>
            <p>
              For questions about account deletion or data handling, contact us at bahumati369@gmail.com
            </p>
          </section>
        </div>

        {/* Permanently delete account CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Permanently delete your account</h2>
          <p className="text-gray-600 mb-6">
            If you want to delete your account and all associated data, use the button below.
            You will be asked to enter your registered mobile number and the OTP we send to confirm your identity.
          </p>

          {step === 'terms' && (
            <button
              type="button"
              onClick={() => setShowConfirmDialog(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Permanently delete account
            </button>
          )}

          {/* Confirmation dialog: only after confirming can user proceed to phone/OTP */}
          {showConfirmDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowConfirmDialog(false)}>
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-left" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete your account?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  This will <strong>permanently delete</strong> all your account details including:
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm mb-6 space-y-1">
                  <li>Profile, name, photo &amp; preferences</li>
                  <li>Gifts, portfolio &amp; transaction history</li>
                  <li>Chats &amp; conversations</li>
                  <li>KYC &amp; bank details</li>
                </ul>
                <p className="text-gray-600 text-sm mb-6">
                  This action <strong>cannot be undone</strong>. Only press confirm if you are sure.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowConfirmDialog(false); setStep('phone'); }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                  >
                    Yes, delete my account
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'phone' && (
            <div className="max-w-sm space-y-4">
              <label className="block text-sm font-medium text-gray-700">Mobile number</label>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 15))}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder:text-gray-400"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setStep('terms'); setError(''); setNumber(''); setShowConfirmDialog(false); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md"
                >
                  {loading ? 'Sending…' : 'Send OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="max-w-sm space-y-4">
              <p className="text-sm text-gray-600">OTP sent to {number}. Enter it below.</p>
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4-digit OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder:text-gray-400"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setError(''); setOtp(''); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={verifyAndDelete}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md"
                >
                  {loading ? 'Deleting…' : 'Verify & delete account'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
