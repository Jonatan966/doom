import fs from 'fs/promises'
import path from 'path'

export async function addFolder(folderPath: string) {
  const finalFolderPath = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    folderPath
  )

  await fs.mkdir(finalFolderPath)
}
