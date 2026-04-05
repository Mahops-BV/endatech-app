'use client'

import { useRef, useEffect, useState } from 'react'

interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  touchSupport: boolean
  deviceType: string
  timestamp: string
}

interface LocationInfo {
  latitude: number
  longitude: number
  accuracy: number
}

export interface SignatureData {
  signature: string
  device: DeviceInfo
  location: LocationInfo | null
  documentHash: string
  consent: {
    identityConfirmed: boolean
    termsAccepted: boolean
    timestamp: string
  }
  verification: {
    emailEntered: string
    phoneLastFour: string
  }
}

interface SignaturePadProps {
  onSave: (data: SignatureData) => void
  onCancel: () => void
  signerName: string
  signerEmail: string
  signerPhone: string
  documentHash: string
}

function getDeviceType(): string {
  const ua = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return 'Telefoon'
  return 'Computer'
}

function getDeviceInfo(): DeviceInfo {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform || 'unknown',
    language: navigator.language || 'unknown',
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pixelRatio: window.devicePixelRatio || 1,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    deviceType: getDeviceType(),
    timestamp: new Date().toISOString(),
  }
}

function getLocation(): Promise<LocationInfo | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: Math.round(pos.coords.accuracy),
      }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  })
}

export default function SignaturePad({ onSave, onCancel, signerName, signerEmail, signerPhone, documentHash }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [location, setLocation] = useState<LocationInfo | null>(null)
  const [locationStatus, setLocationStatus] = useState<'asking' | 'granted' | 'denied' | 'unavailable'>('asking')
  const [submitting, setSubmitting] = useState(false)

  // Step management: 1 = verify identity, 2 = sign
  const [step, setStep] = useState<1 | 2>(1)

  // Verification fields
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [verifyError, setVerifyError] = useState('')

  // Consent checkboxes
  const [identityConfirmed, setIdentityConfirmed] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Extract last 4 digits of phone for verification
  const phoneDigits = signerPhone.replace(/\D/g, '').slice(-4)

  // Request location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        })
        setLocationStatus('granted')
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }, [])

  useEffect(() => {
    if (step !== 2) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, rect.width, rect.height)

    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, rect.height - 40)
    ctx.lineTo(rect.width - 20, rect.height - 40)
    ctx.stroke()

    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2
  }, [step])

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasDrawn(true)
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(20, rect.height - 40)
    ctx.lineTo(rect.width - 20, rect.height - 40)
    ctx.stroke()
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2
    setHasDrawn(false)
  }

  function handleVerify() {
    setVerifyError('')

    const emailMatch = emailInput.trim().toLowerCase() === signerEmail.toLowerCase()
    const phoneMatch = phoneInput.trim() === phoneDigits

    if (!emailMatch && !phoneMatch) {
      setVerifyError('Het e-mailadres en de laatste 4 cijfers van het telefoonnummer komen niet overeen.')
      return
    }
    if (!emailMatch) {
      setVerifyError('Het e-mailadres komt niet overeen met de offerte.')
      return
    }
    if (!phoneMatch) {
      setVerifyError('De laatste 4 cijfers van het telefoonnummer komen niet overeen.')
      return
    }

    setStep(2)
  }

  const saveSignature = async () => {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn || !identityConfirmed || !termsAccepted) return

    setSubmitting(true)

    const loc = location || await getLocation()
    const device = getDeviceInfo()
    const signature = canvas.toDataURL('image/png')

    onSave({
      signature,
      device,
      location: loc,
      documentHash,
      consent: {
        identityConfirmed: true,
        termsAccepted: true,
        timestamp: new Date().toISOString(),
      },
      verification: {
        emailEntered: emailInput.trim(),
        phoneLastFour: phoneInput.trim(),
      },
    })
  }

  const canSign = hasDrawn && identityConfirmed && termsAccepted

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-4">

        {/* Step 1: Identity verification */}
        {step === 1 && (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-7 h-7 rounded-full bg-[#2563EB] text-white text-sm font-bold flex items-center justify-center">1</span>
                <h2 className="text-xl font-bold text-slate-900">Identiteit verifiëren</h2>
              </div>
              <p className="text-sm text-slate-600 mt-1 ml-10">
                Bevestig uw identiteit voordat u de offerte kunt ondertekenen.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {verifyError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {verifyError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Uw e-mailadres
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="naam@voorbeeld.nl"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">Voer het e-mailadres in dat bij de offerte hoort</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Laatste 4 cijfers van uw telefoonnummer
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono tracking-widest text-center focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-b-2xl flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Annuleren
              </button>
              <button
                onClick={handleVerify}
                disabled={!emailInput || phoneInput.length < 4}
                className="flex-1 px-4 py-3 text-white bg-[#2563EB] rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Doorgaan
              </button>
            </div>
          </>
        )}

        {/* Step 2: Sign */}
        {step === 2 && (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">2</span>
                <h2 className="text-xl font-bold text-slate-900">Ondertekenen</h2>
              </div>
              <p className="text-sm text-slate-600 mt-1 ml-10">
                Teken uw handtekening hieronder, {signerName}
              </p>
            </div>

            <div className="p-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  className="w-full h-48 touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Gebruik uw vinger of muis om te tekenen
              </p>

              {/* Device & location status */}
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-500">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {getDeviceType()}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  locationStatus === 'granted' ? 'bg-green-50 text-green-600'
                  : locationStatus === 'denied' ? 'bg-yellow-50 text-yellow-600'
                  : locationStatus === 'asking' ? 'bg-blue-50 text-blue-600'
                  : 'bg-slate-100 text-slate-500'
                }`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locationStatus === 'granted' && 'Locatie vastgelegd'}
                  {locationStatus === 'denied' && 'Locatie geweigerd'}
                  {locationStatus === 'asking' && 'Locatie opvragen...'}
                  {locationStatus === 'unavailable' && 'Locatie niet beschikbaar'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full text-xs text-green-600">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Identiteit geverifieerd
                </span>
              </div>

              {/* Legal consent */}
              <div className="mt-4 space-y-3 bg-slate-50 rounded-lg p-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identityConfirmed}
                    onChange={(e) => setIdentityConfirmed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-xs text-slate-600">
                    Ik bevestig dat ik <strong>{signerName}</strong> ben en bevoegd ben om deze offerte te ondertekenen.
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-xs text-slate-600">
                    Ik ga akkoord met de inhoud van deze offerte en de{' '}
                    <a href="/voorwaarden" target="_blank" className="text-[#2563EB] underline">
                      algemene voorwaarden
                    </a>{' '}
                    van EndaTech. Ik begrijp dat deze digitale handtekening juridisch bindend is.
                  </span>
                </label>
              </div>
            </div>

            <div className="px-4 pb-2">
              <p className="text-[10px] text-slate-400 text-center">
                Uw handtekening, apparaatgegevens, IP-adres, locatie en documenthash (SHA-256) worden
                vastgelegd als juridisch bewijs van ondertekening conform de eIDAS-verordening (EU 910/2014).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Terug
              </button>
              <button
                onClick={clearSignature}
                className="px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Wissen
              </button>
              <button
                onClick={saveSignature}
                disabled={!canSign || submitting}
                className="flex-1 px-4 py-3 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Verwerken...' : 'Ondertekenen'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
