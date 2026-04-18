import { useState, useEffect, useRef, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { FAKE_COMMENTS, FAKE_NAMES } from '../../data/fakeComments'
import EditableField from '../ui/EditableField'

export default function LivePage() {
  const { liveSettings, setLiveSettings } = useApp()
  const [bg, setBg] = useState(null)
  const [bgType, setBgType] = useState('image')
  const [comments, setComments] = useState([])
  const [running, setRunning] = useState(false)
  const [editViewers, setEditViewers] = useState(false)
  const intervalRef = useRef()
  const commRef = useRef()

  const upLS = key => val => setLiveSettings(s => ({ ...s, [key]: val }))

  const addRandomComment = useCallback(() => {
    const [em, nm, txt] = FAKE_COMMENTS[Math.floor(Math.random() * FAKE_COMMENTS.length)]
    setComments(cs => [...cs.slice(-30), { id: Date.now() + Math.random(), em, nm, txt }])
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(addRandomComment, 1400)
      return () => clearInterval(intervalRef.current)
    }
    clearInterval(intervalRef.current)
  }, [running, addRandomComment])

  useEffect(() => {
    commRef.current?.scrollTo({ top: commRef.current.scrollHeight, behavior: 'smooth' })
  }, [comments])

  const uploadBg = () => {
    const inp = document.createElement('input')
    inp.type = 'file'
    inp.accept = 'image/*,video/*'
    inp.onchange = e => {
      const f = e.target.files[0]
      if (!f) return
      setBgType(f.type.startsWith('video') ? 'video' : 'image')
      const r = new FileReader()
      r.onload = ev => setBg(ev.target.result)
      r.readAsDataURL(f)
    }
    inp.click()
  }

  const addJoin = () => {
    const nm = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)]
    setComments(cs => [...cs.slice(-30), { id: Date.now(), em: '🎉', nm, txt: 'انضم للبث', join: true }])
  }

  return (
    <div style={{ position: 'relative', background: '#000', height: '100%', overflow: 'hidden', minHeight: 700 }}>
      {/* Background */}
      {bg
        ? bgType === 'video'
          ? <video src={bg} autoPlay loop muted style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <img src={bg} alt="bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0d0d1a 0%,#1a0d0d 100%)' }} />
      }

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,transparent 30%,transparent 55%,rgba(0,0,0,0.85) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: '#FE2C55', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: '700', color: '#fff', letterSpacing: 1, animation: 'pulseLive 1.5s infinite' }}>
              LIVE
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 14, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 12 }}>👁</span>
              {editViewers
                ? <input
                    value={liveSettings.viewers}
                    onChange={e => upLS('viewers')(e.target.value)}
                    onBlur={() => setEditViewers(false)}
                    autoFocus
                    style={{ background: 'none', border: 'none', color: '#fff', fontSize: 13, fontWeight: '600', width: 80, outline: 'none' }}
                  />
                : <span onClick={() => setEditViewers(true)} style={{ color: '#fff', fontSize: 13, fontWeight: '600', cursor: 'pointer' }}>
                    {liveSettings.viewers}
                  </span>
              }
            </div>
          </div>
          <button style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', fontSize: 16, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Host info */}
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#FE2C55,#25F4EE)', padding: 2, flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎙</div>
          </div>
          <div>
            <EditableField value={liveSettings.hostName} onChange={upLS('hostName')} style={{ fontWeight: '700', fontSize: 14, color: '#fff' }} />
            <div style={{ fontSize: 11 }}>
              <EditableField value={liveSettings.title} onChange={upLS('title')} style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }} />
            </div>
          </div>
          <button style={{ marginLeft: 'auto', background: '#FE2C55', border: 'none', borderRadius: 20, color: '#fff', fontSize: 12, fontWeight: '700', padding: '5px 14px', cursor: 'pointer' }}>متابعة</button>
        </div>

        <div style={{ flex: 1 }} />

        {/* Comments */}
        <div style={{ padding: '0 14px', marginBottom: 10 }}>
          <div ref={commRef} style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, animation: 'commentIn 0.4s ease-out' }}>
                <div style={{
                  background: c.join ? 'rgba(37,244,238,0.2)' : 'rgba(0,0,0,0.5)',
                  borderRadius: 16, padding: '5px 12px',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 14 }}>{c.em}</span>
                  <span style={{ color: c.join ? '#25F4EE' : '#aaa', fontSize: 12, fontWeight: '600' }}>{c.nm}</span>
                  <span style={{ color: '#fff', fontSize: 13 }}>{c.txt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div style={{ padding: '10px 14px', borderTop: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 22, padding: '9px 14px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            اكتب تعليقاً...
          </div>
          <button onClick={() => setRunning(r => !r)} style={{ background: running ? '#25F4EE' : '#FE2C55', border: 'none', borderRadius: '50%', width: 38, height: 38, color: running ? '#000' : '#fff', fontSize: 14, cursor: 'pointer', fontWeight: '700' }}>
            {running ? '⏸' : '▶'}
          </button>
          <button onClick={addJoin} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 38, height: 38, color: '#fff', fontSize: 16, cursor: 'pointer' }}>👤</button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, padding: '6px 14px 14px' }}>
          <button onClick={uploadBg} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', fontSize: 12, padding: '8px 0', cursor: 'pointer' }}>
            📷 تغيير الخلفية
          </button>
          <button onClick={() => { setComments([]); setRunning(false) }} style={{ flex: 1, background: 'rgba(254,44,85,0.15)', border: '0.5px solid rgba(254,44,85,0.3)', borderRadius: 8, color: '#FE2C55', fontSize: 12, padding: '8px 0', cursor: 'pointer' }}>
            🗑 مسح التعليقات
          </button>
        </div>
      </div>
    </div>
  )
}
