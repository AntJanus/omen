import { Injectable } from '@angular/core'
const { ipcRenderer } = require('electron')

@Injectable()
export class IPCService {
  sendMessage(channel: string, message: any, cb?: any) {
    var requestChannel = `req:${channel}`
    var responseChannel = `res:${channel}`

    ipcRenderer.send(requestChannel, message)

    // one-time callback that self-removes
    if (cb) {
      const cbFilter = (event, arg) => {
        //if callback successful
        if (cb(event, arg)) {
          this.removeListener(responseChannel, cbFilter)
        }

      }

      this.addListener(responseChannel, cbFilter)
    }
  }

  addListener(channel: string, callback: any) {
    ipcRenderer.on(channel, callback)
  }

  removeListener(channel, callback) {
    ipcRenderer.removeListener(channel, callback)
  }

  removeAllListeners(channel?: string) {
    ipcRenderer.removeAllListeners(channel)
  }
}
