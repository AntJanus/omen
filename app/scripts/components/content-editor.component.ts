import { Component, Input } from '@angular/core'

import { IFile } from '../store/file.reducer'
import { FileActions } from '../actions/file.actions'
import { IAppState } from '../store'


@Component({
  selector: 'content-editor',
  templateUrl: 'scripts/components/content-editor.html'
})
export class ContentEditorComponent {
  @Input()
  file: IFile

  editorConfig: any = {
    mode: {
      name: 'gfm'
    },
    lineWrapping: true,
    autofocus: true
  }

  constructor(
    private fileActions: FileActions
  ) {
  }

  saveFile(file) {
    this.fileActions.saveCurrentFile(file.path, file.content)
  }
}
