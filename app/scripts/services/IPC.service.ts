import { Injectable } from '@angular/core'
const { ipcRenderer } = require('electron')

@Injectable()
export class IPCService {
  sendMessage(channel: string, message: any) {
    ipcRenderer.send(channel, message)
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
