import fs from 'fs/promises'
import path from 'path'

import { ExplorerItem } from '../../src/@types/explorerItem'

export async function deleteExplorerItem({
  type,
  path: explorerItemPath,
}: ExplorerItem) {
  const finalExplorerItemPath = path.join(
    process.env.APPDATA || '',
    'doom',
    'sounds',
    explorerItemPath
  )

  try {
    switch (type) {
      case 'folder':
        await fs.rmdir(finalExplorerItemPath, { recursive: true })
        break
      case 'sound':
        await fs.unlink(finalExplorerItemPath)
        break
    }

    return true
  } catch {
    return false
  }
}
