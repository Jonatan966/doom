import { useState } from 'react'

import { PileController } from '../PileController'
import { SoundExplorer } from '../SoundExplorer'

export function PileManager() {
  const [currentPath, setCurrentPath] = useState('')
  const [reloadSoundExplorerTrigger, setReloadSoundExplorerTrigger] =
    useState(0)

  return (
    <article>
      <header>
        <h2>Acervo</h2>
      </header>
      <SoundExplorer
        ableToRemoveItem
        onNavigate={path => setCurrentPath(path)}
        reloadPathTrigger={reloadSoundExplorerTrigger}
      />
      <PileController
        targetPath={currentPath}
        onAfterAdd={() => setReloadSoundExplorerTrigger(new Date().getTime())}
      />
    </article>
  )
}
