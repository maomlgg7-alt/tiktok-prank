import { useRef } from 'react'
import { useApp } from '../../context/AppContext'
import EditableField from '../ui/EditableField'
import Avatar from '../ui/Avatar'

function StatBox({ label, value, onChange }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <EditableField
        value={String(value)}
        onChange={onChange}
        style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}
      />
      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{label}</div>
    </div>
  )
}

export default function ProfilePage() {
  const { profile, setProfile, videos, setVideos } = useApp()
  const up = key => val => setProfile(p => ({ ...p, [key]: val }))

  const addVideo = idx => {
    const inp = document.createElement('input')
    inp.type = 'file'
    inp.accept = 'image/*,video/*'
    inp.onchange = e => {
      const f = e.target.files[0]
      if (!f) return
      const r = new FileReader()
      r.onload = ev => {
        const nv = [...videos]
        nv[idx] = ev.target.result
        setVideos(nv)
      }
      r.readAsDataURL(f)
    }
    inp.click()
  }

  return (
    <div style={{ background: '#000', minHeight: '100%', paddingBottom: 60 }}>
      {/* Header */}
      <div style={{
        position: 'relative', height: 48, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderBottom: '0.5px solid #222',
      }}>
        <span style={{ color: '#fff', fontWeight: '700', fontSize: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
          <EditableField value={profile.name} onChange={up('name')} style={{ fontWeight: '700', fontSize: 16 }} />
          {profile.verified && <span style={{ color: '#20d5ec' }}>✓</span>}
        </span>
        <button
          onClick={() => setProfile(p => ({ ...p, verified: !p.verified }))}
          style={{ position: 'absolute', right: 14, background: 'none', border: 'none', color: '#888', fontSize: 22, cursor: 'pointer' }}
        >⋯</button>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        {/* Avatar + Stats */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
          <Avatar src={profile.avatar} size={82} onChange={up('avatar')} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 8 }}>
              <EditableField value={profile.displayName} onChange={up('displayName')} style={{ fontSize: 18, fontWeight: '700' }} />
            </div>
            <div style={{ display: 'flex', gap: 0 }}>
              <StatBox label="متابَع"  value={profile.following} onChange={up('following')} />
              <StatBox label="متابِع"  value={profile.followers} onChange={up('followers')} />
              <StatBox label="إعجاب"   value={profile.likes}     onChange={up('likes')} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ fontSize: 13, color: '#ccc', marginBottom: 16, lineHeight: 1.6 }}>
          <EditableField
            value={profile.bio}
            onChange={up('bio')}
            multiline
            placeholder="اكتب السيرة الذاتية..."
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button style={{ flex: 1, padding: '8px 0', background: '#FE2C55', border: 'none', borderRadius: 4, color: '#fff', fontWeight: '700', fontSize: 14, cursor: 'pointer' }}>
            تعديل الملف
          </button>
          <button style={{ flex: 1, padding: '8px 0', background: '#222', border: 'none', borderRadius: 4, color: '#fff', fontWeight: '600', fontSize: 14, cursor: 'pointer' }}>
            مشاركة الملف
          </button>
          <button style={{ width: 38, background: '#222', border: 'none', borderRadius: 4, color: '#fff', fontSize: 18, cursor: 'pointer' }}>+</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid #222' }}>
        {['⊞', '🔖', '❤️'].map((ic, i) => (
          <button key={i} style={{
            flex: 1, padding: '10px 0', background: 'none', border: 'none',
            color: i === 0 ? '#fff' : '#555', fontSize: 18, cursor: 'pointer',
            borderBottom: i === 0 ? '2px solid #fff' : '2px solid transparent',
          }}>{ic}</button>
        ))}
      </div>

      {/* Video Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1 }}>
        {videos.map((v, i) => (
          <div
            key={i}
            onClick={() => addVideo(i)}
            style={{ aspectRatio: '3/4', background: '#111', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
          >
            {v
              ? <img src={v} alt="video thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ color: '#444', fontSize: 28 }}>+</div>
                  <div style={{ color: '#444', fontSize: 10 }}>أضف مقطع</div>
                </div>
            }
            {v && (
              <div style={{ position: 'absolute', bottom: 4, left: 4, color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }}>
                ▶ {(Math.floor(Math.random() * 900) + 100)}K
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
