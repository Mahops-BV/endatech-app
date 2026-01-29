'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      setShowBanner(false)
    }
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex items-center justify-center">
        <div className="animate-pulse text-white">Laden...</div>
      </div>
    )
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img src="/icon.svg" alt="OpdrachtHub" className="h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Cookievoorkeuren
          </h2>
          <p className="text-slate-600">
            Wij gebruiken functionele cookies om het platform goed te laten werken.
            Deze cookies zijn noodzakelijk voor inloggen en beveiliging.
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-900">Functionele cookies</p>
              <p className="text-sm text-slate-500">Noodzakelijk voor inloggen, sessies en beveiliging</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={acceptCookies}
            className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Accepteren
          </button>
          <button
            onClick={declineCookies}
            className="w-full px-6 py-3 text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:border-slate-400 transition-colors"
          >
            Weigeren
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/cookies" className="text-sm text-emerald-600 hover:text-emerald-700 underline">
            Lees ons cookiebeleid
          </Link>
        </div>
      </div>
    </div>
  )
}
