import fs from 'fs'
import path from 'path'

function createFolderIfNotExists(folderPath: string) {
  const isFolderExists = fs.existsSync(folderPath)

  if (!isFolderExists) {
    fs.mkdirSync(folderPath)
  }
}

export function checkResources() {
  try {
    const userDataPath = path.join(process.env.APPDATA || '', 'doom')

    createFolderIfNotExists(userDataPath)

    const soundsPath = path.join(userDataPath, 'sounds')

    createFolderIfNotExists(soundsPath)

    return true
  } catch {
    return false
  }
}
