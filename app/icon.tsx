import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A08',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Horizontal bar of T */}
        <div style={{ width: 22, height: 3, background: '#C9A84C', borderRadius: 1 }} />
        {/* Vertical stem */}
        <div style={{ width: 4, height: 12, background: '#C9A84C', borderRadius: 1 }} />
      </div>
    ),
    { ...size }
  )
}
