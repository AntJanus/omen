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
ipcMain.on('req:files/create', createFile)

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
          path: arg,
          content: file.toString(),
          isFile: fileStat.isFile()
        }
      })
    })
}

function editFile (event, arg) {
  fs.writeFileAsync(path.join(process.cwd(), arg.path), arg.content)
    .then(() => {
      event.sender.send('res:files/edit', {
        id: arg.path
      })
    })
}

function createFile (event, arg) {
  var filePath = path.join(process.cwd(), arg)
  fs.writeFileAsync(filePath, '')
    .then(() => {
      event.sender.send('res:files/create', {
        id: arg,
        data: {
          name: arg,
          title: arg,
          path: arg,
          isFile: true
        }
      })
    })
}
