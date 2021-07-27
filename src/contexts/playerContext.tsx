import {
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
  ReactNode,
} from 'react'

interface PlayerProviderProps {
  children: ReactNode
}

interface CurrentSound {
  path: string
  name: string
}

interface PlayerContextProps {
  loadingSound: boolean
  currentSound: CurrentSound | null

  playSound: (sound: CurrentSound) => void
  stopCurrentSound: () => void
}

export const PlayerContext = createContext({} as PlayerContextProps)

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [loadingSound, setLoadingSound] = useState(false)
  const [currentSound, setCurrentSound] = useState<CurrentSound | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)

  function playSound(sound: CurrentSound) {
    window.Main.sendMessage('load-sound', sound.path)
    setCurrentSound(sound)
    setLoadingSound(true)
  }

  function stopCurrentSound() {
    if (!audioRef.current) {
      return
    }

    audioRef.current.pause()
    audioRef.current.src = ''
    setCurrentSound(null)
  }

  useEffect(() => {
    function afterLoadSound(soundData: string) {
      setLoadingSound(false)

      if (!audioRef.current) {
        return
      }

      audioRef.current.src = soundData
      audioRef.current.onended = () => setCurrentSound(null)
      audioRef.current.play().catch(() => {
        alert('Não foi possível tocar esse som')
        setCurrentSound(null)

        if (!audioRef.current) {
          return
        }

        audioRef.current.src = ''
      })
    }

    window.Main.on('loaded-sound', afterLoadSound)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        loadingSound,
        currentSound,
        playSound,
        stopCurrentSound,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
