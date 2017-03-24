import { Component, OnInit } from '@angular/core'
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { IFile } from '../store/file.reducer'
import { FileActions } from '../actions/file.actions'
import { SettingsActions } from '../actions/settings.actions'
import { IAppState } from '../store'

import { IPCService } from '../services/IPC.service'

@Component({
  selector: 'file-list',
  templateUrl: 'scripts/components/file-list.html'
})
export class FileListComponent implements OnInit {
  @select(['files', 'files']) files
  @select(['files', 'currentFile']) currentFile
  @select(['settings', 'path']) projectPath


  newProjectPath: ''
  selectedItem: IFile
  newFile: IFile = {
    name: '',
    title: '',
    content: ''
  }

  constructor(private ngRedux: NgRedux<IAppState>,
    private fileActions: FileActions,
    private settingsActions: SettingsActions,
    private IPCService: IPCService) {}

  ngOnInit() {
    this.fileActions.getAllFiles()
    this.settingsActions.getPath()

    this.IPCService.addListener('res:files', (event, arg) => {
      this.ngRedux.dispatch(FileActions.receiveAllFiles(arg.data))
    })
  }

  onItemSelect(item: IFile): void {
    if (item.isFile) {
      this.fileActions.getCurrentFile(item.name)
      this.selectedItem = item
    }
  }

  onItemDelete(item: IFile): void {
    var idx = this.files.indexOf(item)

    if (idx > -1) {
      this.files.splice(idx, 1)
    }
  }

  createFile(file: IFile): void {
    console.log(file, 'file?')
    this.fileActions.createFile(file.title)

    this.newFile = {
      title: '',
      content: ''
    }
  }

  setProjectPath(path): void {
    this.settingsActions.setPath(path)
    this.newProjectPath = ''
  }
}
