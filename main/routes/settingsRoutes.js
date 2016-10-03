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
  var p = arg.path

  process.cwd(p)

  event.sender.send('res:path', { ok: true })
}

function setPath (event, arg) {
  event.sender.send('res:path/set', { ok: true })
}
