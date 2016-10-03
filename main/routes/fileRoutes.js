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
ipcMain.on('req:files', getFiles)
ipcMain.on('req:files/get', getFile)
ipcMain.on('req:files/edit', editFile)

function getFiles (event, arg) {
  fs.readdirAsync(process.cwd())
    .then((items) => {
      return Promise.map(items, (item) => {
        return fs.statAsync(path.join(process.cwd(), item))
          .then((fileStat) => {
            return {
              name: item,
              title: item,
              content: fileStat,
              isFile: fileStat.isFile()
            }
          })
      })
    })
    .then((files) => {
      event.sender.send('res:files', {
        data: files
      })
    })
}

function getFile (event, arg) {
  var file = {}

  fs.readFileAsync(path.join(process.cwd(), arg))
    .then((item) => {
      file = item

      return fs.statAsync(path.join(process.cwd(), arg))
    })
    .then((fileStat) => {
      event.sender.send('res:files/get', {
        id: arg,
        data: {
          name: arg,
          title: arg,
          content: file.toString(),
          isFile: fileStat.isFile()
        }
      })
    })
}

function editFile (event, arg) {
}
