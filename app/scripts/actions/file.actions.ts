import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../store'

import { IPCService } from '../services/IPC.service'

@Injectable()
export class FileActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private IPCService: IPCService) {}

  static RECEIVE_ROOT_FILES: string = 'RECEIVE_ROOT_FILES'
  static RECEIVE_CURRENT_FILE: string = 'RECEIVE_CURRENT_FILE'

  getAllFiles (): void {
    this.IPCService.sendMessage('files', '', (event, arg) => {
      this.ngRedux.dispatch({
        type: FileActions.RECEIVE_ROOT_FILES,
        payload: {
          files: arg.data
        }
      })

      return true
    })
  }

  getCurrentFile (filePath: string): void {
    this.IPCService.sendMessage('files/get', filePath, (event, arg) => {
      if (arg.id === filePath) {
        this.ngRedux.dispatch({
          type: FileActions.RECEIVE_CURRENT_FILE,
          payload: arg
        })

        return true
      }
    })
  }
}
