import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../store'

import { IPCService } from '../services/IPC.service'

import { FileActions } from './file.actions'

@Injectable()
export class SettingsActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private IPCService: IPCService,
    private FileActions: fileActions) {}

  static SET_PATH: string = 'SET_PATH'
  static GET_PATH: string = 'GET_PATH'

  setPath (path): void {
    this.IPCService.sendMessage('path/set', { path }, (event, arg) => {
      this.ngRedux.dispatch({
        type: SettingsActions.SET_PATH,
        payload: {
          path
        }
      })

      this.fileActions.getAllFiles();

      return true
    })
  }

  getPath (): void {
    this.IPCService.sendMessage('path', '', (event, arg) => {
      this.ngRedux.dispatch({
        type: SettingsActions.GET_PATH,
        payload: {
          path: arg.path
        }
      })
    }})
  }
}
