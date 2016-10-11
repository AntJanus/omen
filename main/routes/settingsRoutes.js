var fs = require('fs')
var path = require('path')
const Promise = require('bluebird')
const {ipcMain} = require('electron')

Promise.promisifyAll(fs)

/*
  structure:
    on('req:route/action')
    send('res:route:action')
*/

// routes
ipcMain.on('req:path', getPath)
ipcMain.on('req:path/set', setPath)

function getPath (event, arg) {
  event.sender.send('res:path', { path: process.cwd() })
}

function setPath (event, arg) {
  var p = arg.path

  process.cwd(p)

  event.sender.send('res:path/set', { ok: true })
}
