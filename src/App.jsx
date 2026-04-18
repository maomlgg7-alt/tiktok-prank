import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import BottomNav from './components/ui/BottomNav'
import ProfilePage from './components/profile/ProfilePage'
import ChatPage from './components/chat/ChatPage'
import LivePage from './components/live/LivePage'

function PlaceholderPage({ icon, label }) {
  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <div style={{ fontSize: 14, color: '#444' }}>{label}</div>
    </div>
  )
}

function AppContent() {
  const [tab, setTab] = useState('profile')
  const [prevTab, setPrevTab] = useState('home')
  const [showLive, setShowLive] = useState(false)

  const goTab = t => {
    setPrevTab(tab)
    setTab(t)
  }

  const pages = {
    home:    <PlaceholderPage icon="🎬" label="الصفحة الرئيسية" />,
    friends: <PlaceholderPage icon="👥" label="الأصدقاء" />,
    inbox:   <ChatPage />,
    profile: <ProfilePage />,
  }

  return (
    <div className="app-frame" style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {showLive
          ? <LivePage />
          : <div className="page-scroll">{pages[tab] || pages.home}</div>
        }
      </div>

      <BottomNav active={tab} onChange={goTab} />

      {/* Live toggle FAB */}
      <button
        onClick={() => setShowLive(s => !s)}
        style={{
          position: 'fixed',
          bottom: 70,
          right: 16,
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: showLive ? '#25F4EE' : '#FE2C55',
          border: 'none',
          color: showLive ? '#000' : '#fff',
          fontSize: 16,
          cursor: 'pointer',
          zIndex: 200,
          boxShadow: '0 4px 20px rgba(254,44,85,0.5)',
          fontWeight: '700',
        }}
      >
        {showLive ? '✕' : '🔴'}
      </button>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
