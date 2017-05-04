import { Injectable, NgZone } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../store'

import { IPCService } from '../services/IPC.service'

import { FileActions } from './file.actions'

@Injectable()
export class SettingsActions {
  constructor (
    private ngRedux: NgRedux<IAppState>,
    private IPCService: IPCService,
    private fileActions: FileActions,
    private ngZone: NgZone) {}

  static SET_PATH: string = 'SET_PATH'
  static GET_PATH: string = 'GET_PATH'

  setPath (path): void {
    this.IPCService.sendMessage('path/set', { path }, (event, arg) => {
      this.zoneDispatch({
        type: SettingsActions.SET_PATH,
        payload: {
          path
        }
      })

      this.fileActions.getRootFiles();

      return true
    })
  }

  getPath (): void {
    this.IPCService.sendMessage('path', { path: '' }, (event, arg) => {
      this.zoneDispatch({
        type: SettingsActions.GET_PATH,
        payload: {
          path: arg.path
        }
      })
    })
  }

  private zoneDispatch(action) {
    console.log('Am I in the Angular Zone?', NgZone.isInAngularZone(), action.type);
    if (!NgZone.isInAngularZone()) {
      this.ngZone.run(() => this.ngRedux.dispatch(action));
    }
    else {
      this.ngRedux.dispatch(action);
    }
  }
}
