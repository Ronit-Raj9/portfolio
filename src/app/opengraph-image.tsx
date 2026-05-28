import { ImageResponse } from 'next/og'

export const alt = 'Ronit Raj - Full-Stack AI & ML Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Ronit Raj
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 500,
            color: '#d4d4d8',
            marginTop: 16,
          }}
        >
          Full-Stack AI &amp; ML Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#a1a1aa',
            marginTop: 28,
          }}
        >
          OSS India 2026 Speaker · SIH 2024 Winner · NHA PM-JAY Runner-Up
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
