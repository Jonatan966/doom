import { app, BrowserWindow, ipcMain } from 'electron'
import { checkResources } from './events/checkResources'
import { listSounds } from './events/listSounds'
import { readSound } from './events/loadSound'

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
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

  ipcMain.on('sound-list', (_, path) => {
    const soundList = listSounds(path)
    mainWindow?.webContents.send('retrieve-sound-list', soundList)
  })

  ipcMain.on('load-sound', (event, soundPath) => {
    readSound(soundPath).then(url => event.sender.send('loaded-sound', url))
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
