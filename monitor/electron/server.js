const electron = require("electron");
const app = electron.app;
const path = require("path");

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    "width": 1200,
    "height": 1200,
    "webPreferences": {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  var args = require('minimist')(process.argv);
    ihm_data={};
    ihm_file='';
    if (args.hasOwnProperty('ihm')) {
        ihm_data = require(args['ihm'])['ihm'];
        ihm_file = args['ihm'];
        mainWindow.loadURL( "http://localhost:8000?electron=on&ihm_file=" + ihm_file);
    }
    else {
        mainWindow.loadURL( "http://localhost:8000?electron=on");
    }
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
