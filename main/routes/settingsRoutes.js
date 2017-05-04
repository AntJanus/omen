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

function getPath (event, args) {
  event.sender.send('res:path', { id: args.id, path: process.cwd() })
}

function setPath (event, args) {
  var p = args.path

  process.chdir(p)

  event.sender.send('res:path/set', { id: args.id, ok: true })
}
