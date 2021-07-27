import fs from 'fs/promises'
import path from 'path'
import dataUrl from 'dataurl'
import mimeTypes from 'mime-types'

export async function readSound(soundLocation: string) {
  const fullSoundLocation = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    soundLocation
  )

  try {
    const soundData = await fs.readFile(fullSoundLocation)
    let mimeType = mimeTypes.lookup(soundLocation)

    if (mimeType) {
      mimeType = mimeType.replace('wave', 'wav')
    }

    return dataUrl.convert({
      data: soundData,
      mimetype: mimeType,
    })
  } catch {
    return false
  }
}
