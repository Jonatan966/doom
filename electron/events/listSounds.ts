import fs from 'fs/promises'
import path from 'path'

export async function listSounds(soundPath: string = '') {
  const finalSoundPath = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    soundPath
  )

  const soundList = await fs.readdir(finalSoundPath, {
    withFileTypes: true,
  })

  const mappedSoundList = soundList.map(sound => ({
    name: sound.name,
    type: sound.isFile() ? 'sound' : 'folder',
    path: path.join(soundPath, sound.name),
  }))

  return mappedSoundList
}
