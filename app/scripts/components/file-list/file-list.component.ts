import { Component, Input } from '@angular/core'
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { IFile } from '../../store/file.reducer'
import { FileActions } from '../../actions/file.actions'
import { IAppState } from '../../store'

import { IPCService } from '../../services/IPC.service'

@Component({
  selector: 'file-list',
  templateUrl: 'scripts/components/file-list/file-list.html'
})
export class FileListComponent {
  @select(['files', 'currentFile']) currentFile

  @Input()
  files: IFile[]

  newProjectPath: ''
  selectedItem: IFile
  newFile: IFile = {
    name: '',
    title: '',
    content: ''
  }

  constructor(private ngRedux: NgRedux<IAppState>,
    private fileActions: FileActions,
    private IPCService: IPCService) {}

  onItemSelect(item: IFile): void {
    if (item.isFile) {
      this.fileActions.getCurrentFile(item.path)
      this.selectedItem = item
    } else {
      this.fileActions.getFolderFiles(item.path)
      item.openFolder = true
    }
  }

  onItemDelete(item: IFile): void {
    var idx = this.files.indexOf(item)

    if (idx > -1) {
      this.files.splice(idx, 1)
    }
  }

  createFile(file: IFile): void {
    this.fileActions.createFile(file.title)

    this.newFile = {
      title: '',
      content: ''
    }
  }
}
