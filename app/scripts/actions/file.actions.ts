import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../store'

import { IPCService } from '../services/IPC.service'

interface IAction {
  type: string,
  payload: any
}

@Injectable()
export class FileActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private IPCService: IPCService) {}

  static RECEIVE_ROOT_FILES: string = 'RECEIVE_ROOT_FILES'
  static RECEIVE_CURRENT_FILE: string = 'RECEIVE_CURRENT_FILE'
  static SAVING_CURRENT_FILE: string = 'SAVING_CURRENT_FILE'
  static SAVED_CURRENT_FILE: string = 'SAVED_CURRENT_FILE'

  static receiveAllFiles (files: any): IAction {
    return {
      type: FileActions.RECEIVE_ROOT_FILES,
      payload: {
        files
      }
    }
  }

  getAllFiles (): void {
    this.IPCService.sendMessage('files', '', (event, arg) => {
      this.ngRedux.dispatch(FileActions.receiveAllFiles(arg.data))

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

  saveCurrentFile (filePath: string, content: string): void {
    this.ngRedux.dispatch({
      type: FileActions.SAVING_CURRENT_FILE,
      payload: filePath
    });

    this.IPCService.sendMessage('file/edit', {
      path: filePath,
      content
    }, (event, arg) => {
      if (arg.id === filePath) {
        this.ngRedux.dispatch({
          type: FileActions.SAVED_CURRENT_FILE,
          payload: {
            content
          }
        })
      }
    })
  }
}
