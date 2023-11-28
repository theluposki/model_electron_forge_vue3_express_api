const { app, BrowserWindow } = require("electron");
const { spawn } = require("node:child_process");
const path = require("path");

let apiProcess;

function startApi() {
  const appDirectory = path.join(__dirname, "../", "../");
  process.chdir(appDirectory);
  const apiServerPath = path.join(appDirectory, "./src/api/src/index.mjs");

  apiProcess = spawn("node", [
    "-r",
    "dotenv/config",
    "--no-warnings",
    "--experimental-modules",
    apiServerPath,
  ]);

  apiProcess.stdout.on("data", (data) => {
    console.log(`API process stdout: ${data}`);
  });
  apiProcess.stderr.on("data", (data) => {
    console.error(`API process stderr: ${data}`);
  });
  apiProcess.on("close", (code) => {
    console.log(`API process exited with code ${code}`);
  });
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  startApi();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    apiProcess.kill();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
