const electron = require("electron");
const app = electron.app;
const path = require("path");
const ejse = require('ejs-electron')

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    "width": 1200,
    "height": 1200,
    "webPreferences": {
      nodeIntegration: true
    }
  });
    ejse.data('electron', 'on');
    ejse.data('json', 'ihm.json');

  mainWindow.loadURL( "http://localhost:8000?electron='on'&json='ihm.json'");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
