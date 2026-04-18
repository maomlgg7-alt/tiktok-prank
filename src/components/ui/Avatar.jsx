import { useRef } from 'react'

export default function Avatar({ src, size = 80, onChange }) {
  const ref = useRef()

  return (
    <>
      <div
        onClick={() => onChange && ref.current.click()}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#FE2C55,#25F4EE)',
          padding: 2,
          cursor: onChange ? 'pointer' : 'default',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {src
            ? <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: size * 0.38, color: '#fff' }}>👤</span>
          }
        </div>
      </div>
      {onChange && (
        <input
          type="file"
          ref={ref}
          accept="image/*"
          onChange={e => {
            const f = e.target.files[0]
            if (!f) return
            const r = new FileReader()
            r.onload = ev => onChange(ev.target.result)
            r.readAsDataURL(f)
          }}
        />
      )}
    </>
  )
}
