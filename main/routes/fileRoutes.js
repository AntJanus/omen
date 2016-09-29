const {ipcMain} = require('electron')

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
  event.sender.send('res:files', {
    data: [
      {
        name: 'file-name.md',
        title: 'File Name 3',
        content: 'My file name'
      },
      {
        name: 'file-2.md',
        title: 'File 2',
        content: 'My second file name'
      }
    ]
  })
}

function getFile (event, arg) {
}

function editFile (event, arg) {
}
