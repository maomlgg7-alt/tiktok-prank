import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('tt_profile', {
    name: 'username_here',
    displayName: 'اسمك هنا',
    bio: 'اضغط لتعديل السيرة الذاتية ✨',
    followers: '12.5M',
    following: '487',
    likes: '89.4M',
    avatar: null,
    verified: false,
  })

  const [videos, setVideos] = useLocalStorage('tt_videos', Array(6).fill(null))

  const [chats, setChats] = useLocalStorage('tt_chats', [
    {
      id: 1,
      name: 'ريان_sa',
      avatar: null,
      time: 'الآن',
      preview: 'هلا كيفك',
      msgs: [
        { id: 1, text: 'هلا كيفك 👋', sent: false, time: '10:22' },
        { id: 2, text: 'الحمد لله تمام وانت؟', sent: true, time: '10:23' },
      ],
    },
  ])

  const [liveSettings, setLiveSettings] = useLocalStorage('tt_live', {
    viewers: '12,847',
    title: '🔴 بث مباشر',
    hostName: 'اسمك هنا',
  })

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      videos, setVideos,
      chats, setChats,
      liveSettings, setLiveSettings,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
