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

function getFiles (event, args) {
  console.log(args, 'args');
  fs.readdirAsync(path.join(process.cwd(), args.path || '.'))
    .then((items) => {
      return Promise.map(items, (item) => {
        return fs.statAsync(path.join(process.cwd(), args.path, item))
          .then((fileStat) => {
            return {
              name: item,
              title: item,
              path: args.path ? [args.path, item].join('/') : item,
              content: fileStat,
              isFile: fileStat.isFile()
            }
          })
      })
    })
    .then((files) => {
      event.sender.send('res:files', {
        id: args.id,
        data: files
      })
    })
}

function getFile (event, args) {
  var file = {}

  fs.readFileAsync(path.join(process.cwd(), args.path))
    .then((item) => {
      file = item

      return fs.statAsync(path.join(process.cwd(), args.path))
    })
    .then((fileStat) => {
      event.sender.send('res:files/get', {
        id: args.id,
        data: {
          name: args.path,
          title: args.path,
          path: args.path,
          content: file.toString(),
          isFile: fileStat.isFile()
        }
      })
    })
}

function editFile (event, args) {
  fs.writeFileAsync(path.join(process.cwd(), args.path), args.content)
    .then(() => {
      event.sender.send('res:files/edit', {
        id: args.id
      })
    })
}

function createFile (event, args) {
  var filePath = path.join(process.cwd(), args.path)
  fs.writeFileAsync(filePath, '')
    .then(() => {
      event.sender.send('res:files/create', {
        id: args.id,
        data: {
          name: args.path,
          title: args.path,
          path: args.path,
          isFile: true
        }
      })
    })
}
