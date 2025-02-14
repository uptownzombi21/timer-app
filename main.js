const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 414, // iPhone width
    height: 896, // iPhone height + extra space
    maximizable: false, // Disable maximize button
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadURL('http://localhost:8080'); // Load the Vue app in development
  // win.loadFile(path.join(__dirname, 'dist', 'index.html')); // For production
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});