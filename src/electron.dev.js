const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
// global reference to main window
let win;

const createWindow = () => {
    // setTimeout is to delay electron launch after ng build files
    setTimeout(() => {
        // create the browser window
        win = new BrowserWindow({
            widht: 800,
            height: 600,
            icon: './src/favicon.ico'
        });

        // and load the app
        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http',
            slashes: true
        }));

        // open developer tools
        win.webContents.openDevTools();

        // Emitted when window is closed
        win.on('closed', () => {
            // free global window variable resource
            win = null;
        });
    }, 10000);
};

// will be called when electron is loaded and ready to open app
app.on('ready', createWindow);

// Quit app when closing main window
app.on('window-all-closed', () => {
    /**
     * Close if the os is not MacOS
     */
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// create window if app activated
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
