const HomeIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#fff' : 'none'} stroke={active ? '#fff' : '#666'} strokeWidth="1.8">
    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)

const FriendsIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="1.8">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M15 18c0-2.5 2.2-4 4-4" />
  </svg>
)

const InboxIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="1.8">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
)

const UserIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

const PlusButton = () => (
  <div style={{ width: 48, height: 28, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', left: 0, width: 28, height: 28, background: '#25F4EE', borderRadius: 6 }} />
    <div style={{ position: 'absolute', right: 0, width: 28, height: 28, background: '#FE2C55', borderRadius: 6 }} />
    <div style={{ position: 'relative', width: 28, height: 28, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#000', fontSize: 20, fontWeight: '700', lineHeight: 1 }}>+</span>
    </div>
  </div>
)

const TABS = [
  { id: 'home',    label: 'الرئيسية', Icon: HomeIcon },
  { id: 'friends', label: 'أصدقاء',   Icon: FriendsIcon },
  { id: 'plus',    label: '',          Icon: PlusButton },
  { id: 'inbox',   label: 'البريد',    Icon: InboxIcon },
  { id: 'profile', label: 'الملف',     Icon: UserIcon },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div style={{
      height: 56,
      background: '#000',
      borderTop: '0.5px solid #1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexShrink: 0,
      zIndex: 100,
    }}>
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => id !== 'plus' && onChange(id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: id === 'plus' ? 'default' : 'pointer',
            gap: 2,
            padding: '4px 0',
          }}
        >
          <Icon active={active === id} />
          {label && (
            <span style={{ fontSize: 9, color: active === id ? '#fff' : '#666' }}>
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
