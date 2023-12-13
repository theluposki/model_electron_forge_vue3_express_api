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
  ], { stdio: "pipe" });

  apiProcess.stdout.on("data", (data) => {
    console.log(`[ API ] -> stdout: ${data}`);
  });
  apiProcess.stderr.on("data", (data) => {
    console.error(`[ API ] -> stderr: ${data}`);
  });
  apiProcess.on("close", (code) => {
    console.log(`\n[ API ] -> stdout: process exited with code ${code}`);
  });
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
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

app.on("ready", () => {
  startApi();
  createWindow();
});

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
