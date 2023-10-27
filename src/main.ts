import { app, BrowserWindow, net, protocol } from 'electron'
import path from 'path'
import url from 'url'
import _ from 'lodash'
import '@/handler/markdown'
let mainWindow: BrowserWindow
if (app.requestSingleInstanceLock() == false) {
    app.quit()
}
app.on('will-finish-launching', () => {
    protocol.registerSchemesAsPrivileged([
        {
            scheme: 'app',
            privileges: {
                secure: true,
                standard: true,
                supportFetchAPI: true,
            },
        },
    ])
})
app.on('ready', () => {
    protocol.handle('app', async (req) => {
        let filePath = req.url.slice('app://'.length)
        if (filePath) {
            filePath = path.join(__dirname, 'dist', filePath)
            filePath = _.toString(url.pathToFileURL(filePath))
        }
        return net.fetch(filePath)
    })

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
        show: false,
    })
    const loadURL = app.isPackaged
        ? 'app://./index.html'
        : 'http://localhost:8080'
    mainWindow.loadURL(loadURL)
    mainWindow.webContents.once('dom-ready', () => {
        mainWindow.show()
        if (app.isPackaged == false) {
            mainWindow.webContents.openDevTools()
        }
    })
})
app.on('activate', () => {
    const windows = BrowserWindow.getAllWindows()
    if (!(windows && windows.length == 0)) {
        return
    }
    /** @TODO 화면 다시 열기 */
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore()
        }
        mainWindow.focus()
    }
})
