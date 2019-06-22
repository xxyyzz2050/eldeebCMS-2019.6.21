import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `./browser/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  // todo: if dev mode
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}
