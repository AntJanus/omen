import { v4 as uuid } from 'uuid'

import { Injectable } from '@angular/core'
const { ipcRenderer } = require('electron')

@Injectable()
export class IPCService {
  sendMessage(channel: string, message: any, cb?: any) {
    var requestChannel = `req:${channel}`
    var responseChannel = `res:${channel}`
    var id = uuid();

    ipcRenderer.send(requestChannel, Object.assign({}, message, { id }))

    // one-time callback that self-removes
    if (cb) {
      const cbFilter = (event, args) => {
        //if callback successful
        if (args.id === id) {
          cb(event, args);
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
