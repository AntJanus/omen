import { Injectable, NgZone } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
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
    private IPCService: IPCService,
    private ngZone: NgZone) {}

  static RECEIVE_ROOT_FILES: string = 'RECEIVE_ROOT_FILES'
  static RECEIVE_CURRENT_FILE: string = 'RECEIVE_CURRENT_FILE'
  static SAVING_CURRENT_FILE: string = 'SAVING_CURRENT_FILE'
  static SAVED_CURRENT_FILE: string = 'SAVED_CURRENT_FILE'

  static RECEIVE_NEW_FILE: string = 'RECEIVE_NEW_FILE'
  static RECEIVE_DIR_FILES: string = 'RECEIVE_DIR_FILES'

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
      this.zoneDispatch(FileActions.receiveAllFiles(arg.data))

      return true
    })
  }

  getDirFiles (dirName): void {
    this.IPCService.sendMessage('files/dir', dirName, (event, arg) => {
      if (arg.id === dirName) {
        this.zoneDispatch({
          type: FileActions.RECEIVE_DIR_FILES,
          payload: {
            files: arg.data
          }
        })
      }
    })
  }

  createFile (filePath: string): void {
    this.IPCService.sendMessage('files/create', filePath, (event, arg) => {
      if (arg.id === filePath) {
        this.zoneDispatch({
          type: FileActions.RECEIVE_NEW_FILE,
          payload: arg
        })

        return true
      }
    })
  }

  getCurrentFile (filePath: string): void {
    this.IPCService.sendMessage('files/get', filePath, (event, arg) => {
      if (arg.id === filePath) {
        this.zoneDispatch({
          type: FileActions.RECEIVE_CURRENT_FILE,
          payload: arg
        })

        return true
      }
    });
  }

  saveCurrentFile (filePath: string, content: string): void {
    console.log('WHOA', filePath, content)
    this.zoneDispatch({
      type: FileActions.SAVING_CURRENT_FILE,
      payload: filePath
    });

    this.IPCService.sendMessage('files/edit', {
      path: filePath,
      content
    }, (event, arg) => {
      if (arg.id === filePath) {
        this.zoneDispatch({
          type: FileActions.SAVED_CURRENT_FILE,
          payload: {
            content
          }
        })
      }
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
