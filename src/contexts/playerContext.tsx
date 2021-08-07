import {
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
  ReactNode,
} from 'react'
import { toast } from 'react-hot-toast'

import { CurrentSound } from '../@types/currentSound'

interface PlayerProviderProps {
  children: ReactNode
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

  function onSoundEnded() {
    setCurrentSound(currentSound => {
      if (!currentSound) return null

      const formattedCurrentSound = {
        ...currentSound,
        reproductions: (currentSound.reproductions || 1) - 1,
      }

      if (formattedCurrentSound.reproductions === 0) return null

      playSound(formattedCurrentSound)

      return formattedCurrentSound
    })
  }

  useEffect(() => {
    function playLoadedSound() {
      if (!audioRef.current) return

      audioRef.current.play().catch(() => {
        toast.error('Não foi possível tocar esse som')
        setCurrentSound(null)

        if (!audioRef.current) return

        audioRef.current.src = ''
      })
    }

    function afterLoadSound(soundData: string) {
      setLoadingSound(false)

      if (!audioRef.current) return

      audioRef.current.src = soundData
      audioRef.current.onended = onSoundEnded

      setTimeout(playLoadedSound, 500)
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
