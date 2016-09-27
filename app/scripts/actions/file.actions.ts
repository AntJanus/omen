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

  getAllFiles (): void {
    this.ngRedux.dispatch({
      type: FileActions.RECEIVE_ROOT_FILES,
      payload: {
        files: [
          {
            name: 'file-name.md',
            title: 'File Name',
            content: 'My file name'
          },
          {
            name: 'file-2.md',
            title: 'File 2',
            content: 'My second file name'
          }
        ]
      }
    })
  }
}
