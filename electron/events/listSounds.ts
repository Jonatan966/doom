import fs from 'fs'
import path from 'path'

export function listSounds(soundPath: string = '') {
  const finalSoundPath = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    soundPath
  )

  const soundList = fs.readdirSync(finalSoundPath, {
    withFileTypes: true,
  })

  const mappedSoundList = soundList.map(sound => ({
    name: sound.name,
    type: sound.isFile() ? 'sound' : 'folder',
  }))

  return mappedSoundList
}
