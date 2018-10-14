const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// main window
let win;

const createWindow = () => {
    // create main window
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'favicon.ico')
    });

    // load the index.html of ur app
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // free resorces when closed
    win.on('closed', () => {
        // free main window resources
        win = null;
    });
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
app.on('activated', () => {
    if (win === null) {
        createWindow();
    }
});

