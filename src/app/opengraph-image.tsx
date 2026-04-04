import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "EndaTech - Betaalbare airco's, snel geplaatst"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Rode achtergrond links */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '50%', height: '100%',
          backgroundColor: '#DC2626',
          display: 'flex',
        }} />
        {/* Blauwe achtergrond rechts */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50%', height: '100%',
          backgroundColor: '#2563EB',
          display: 'flex',
        }} />

        {/* Content card */}
        <div style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: 24,
          padding: '60px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          minWidth: 700,
        }}>
          {/* Logo tekst */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#DC2626', letterSpacing: -2 }}>
              ENDA
            </span>
            <span style={{ fontSize: 80, fontWeight: 900, color: '#2563EB', letterSpacing: -2 }}>
              TECH
            </span>
          </div>

          {/* Divider */}
          <div style={{
            width: 120, height: 4,
            background: 'linear-gradient(to right, #DC2626, #2563EB)',
            borderRadius: 2,
            marginBottom: 24,
            display: 'flex',
          }} />

          {/* Tagline */}
          <div style={{ fontSize: 32, color: '#374151', fontWeight: 600, marginBottom: 12, display: 'flex' }}>
            Duurzaam koelen en verwarmen
          </div>

          {/* Sub */}
          <div style={{ fontSize: 22, color: '#9CA3AF', display: 'flex' }}>
            Betaalbare airco&apos;s · Snelle installatie · Heel Nederland
          </div>
        </div>

        {/* URL label onderaan */}
        <div style={{
          position: 'absolute', bottom: 28,
          color: 'rgba(255,255,255,0.7)',
          fontSize: 22,
          display: 'flex',
        }}>
          www.endatech.nl
        </div>
      </div>
    ),
    { ...size }
  )
}
