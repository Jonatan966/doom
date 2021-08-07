import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

import { addFolder } from './events/addFolder'
import { addSound } from './events/addSound'
import { checkResources } from './events/checkResources'
import { deleteExplorerItem } from './events/deleteExplorerItem'
import { listSounds } from './events/listSounds'
import { readSound } from './events/loadSound'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    autoHideMenuBar: true,
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  ipcMain.on('check-resources', () => {
    mainWindow?.webContents.send('finish-check-resources', checkResources())
  })

  ipcMain.on('sound-list', (event, path) => {
    listSounds(path).then(soundList =>
      event.sender.send('retrieve-sound-list', soundList)
    )
  })

  ipcMain.on('load-sound', (event, soundPath) => {
    readSound(soundPath).then(url => event.sender.send('loaded-sound', url))
  })

  ipcMain.on('add-sound', (event, soundData) => {
    addSound(soundData).then(() => event.sender.send('success-add-sound'))
  })

  ipcMain.on('add-folder', (event, folderPath) => {
    addFolder(folderPath).then(() => event.sender.send('success-add-folder'))
  })

  ipcMain.on('delete-explorer-item', (event, explorerItem) => {
    deleteExplorerItem(explorerItem).then(success =>
      event.sender.send('retrieve-delete-explorer-item', success)
    )
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
