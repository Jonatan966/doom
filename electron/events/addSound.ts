import path from 'path'
import fs from 'fs/promises'

interface NewSound {
  data: string
  name: string
  path: string
}

export async function addSound(soundData: NewSound) {
  const finalSoundPath = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    soundData.path,
    soundData.name
  )

  console.log(soundData.data.substr(0, 15), soundData.path)

  await fs.writeFile(finalSoundPath, soundData.data, 'base64')
}
