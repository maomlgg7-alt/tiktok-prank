import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import EditableField from '../ui/EditableField'
import Avatar from '../ui/Avatar'

function ChatWindow({ chat, onBack }) {
  const { chats, setChats } = useApp()
  const [newMsg, setNewMsg] = useState('')
  const [msgType, setMsgType] = useState('sent')
  const msgEnd = useRef()

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.msgs])

  const send = () => {
    if (!newMsg.trim()) return
    const now = new Date()
    const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setChats(cs => cs.map(c => c.id === chat.id
      ? { ...c, msgs: [...c.msgs, { id: Date.now(), text: newMsg, sent: msgType === 'sent', time: t }], preview: newMsg, time: 'الآن' }
      : c
    ))
    setNewMsg('')
  }

  const upName = v => setChats(cs => cs.map(c => c.id === chat.id ? { ...c, name: v } : c))
  const upAvatar = v => setChats(cs => cs.map(c => c.id === chat.id ? { ...c, avatar: v } : c))

  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', borderBottom: '0.5px solid #222', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 26, cursor: 'pointer', lineHeight: 1, paddingBottom: 2 }}>‹</button>
        <Avatar src={chat.avatar} size={34} onChange={upAvatar} />
        <div style={{ flex: 1 }}>
          <EditableField value={chat.name} onChange={upName} style={{ fontWeight: '700', fontSize: 15 }} />
          <div style={{ fontSize: 11, color: '#25D366' }}>متصل الآن</div>
        </div>
        <span style={{ color: '#888', fontSize: 22 }}>⋯</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chat.msgs.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sent ? 'flex-end' : 'flex-start', animation: 'slideUp 0.3s ease-out' }}>
            {!m.sent && <div style={{ marginLeft: 6, alignSelf: 'flex-end' }}><Avatar src={chat.avatar} size={26} /></div>}
            <div>
              <div style={{
                maxWidth: 240, padding: '9px 13px',
                borderRadius: m.sent ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.sent ? '#FE2C55' : '#222',
                color: '#fff', fontSize: 14, lineHeight: 1.5,
              }}>
                {m.text}
              </div>
              <div style={{ fontSize: 10, color: '#555', textAlign: m.sent ? 'right' : 'left', marginTop: 2 }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={msgEnd} />
      </div>

      {/* Input */}
      <div style={{ padding: '8px 10px 12px', borderTop: '0.5px solid #1a1a1a', background: '#000', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {['sent', 'received'].map(t => (
            <button key={t} onClick={() => setMsgType(t)} style={{
              flex: 1, padding: '5px 0',
              background: msgType === t ? '#FE2C55' : '#1a1a1a',
              border: 'none', borderRadius: 20, color: '#fff', fontSize: 12, cursor: 'pointer',
            }}>
              {t === 'sent' ? '↑ مُرسَل' : '↓ مُستلَم'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="اكتب رسالة..."
            style={{ flex: 1, background: '#1a1a1a', border: '0.5px solid #333', borderRadius: 22, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }}
          />
          <button onClick={send} style={{ width: 40, height: 40, borderRadius: '50%', background: '#FE2C55', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const { chats, setChats } = useApp()
  const [openId, setOpenId] = useState(null)

  const chat = chats.find(c => c.id === openId)

  const addChat = () => {
    const n = { id: Date.now(), name: 'مستخدم جديد', avatar: null, time: 'الآن', preview: 'ابدأ المحادثة', msgs: [] }
    setChats(cs => [n, ...cs])
    setOpenId(n.id)
  }

  if (openId && chat) return <ChatWindow chat={chat} onBack={() => setOpenId(null)} />

  return (
    <div style={{ background: '#000', minHeight: '100%', paddingBottom: 60 }}>
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '0.5px solid #222' }}>
        <span style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>الرسائل</span>
        <button onClick={addChat} style={{ background: '#FE2C55', border: 'none', borderRadius: 20, color: '#fff', padding: '5px 14px', fontSize: 13, cursor: 'pointer', fontWeight: '600' }}>+ محادثة</button>
      </div>
      {chats.map(c => (
        <div key={c.id} onClick={() => setOpenId(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', borderBottom: '0.5px solid #111' }}>
          <Avatar src={c.avatar} size={52} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>{c.name}</span>
              <span style={{ color: '#555', fontSize: 11 }}>{c.time}</span>
            </div>
            <div style={{ color: '#666', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.preview}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
