import { Component, OnInit } from '@angular/core'
import { select, NgRedux } from 'ng2-redux'
import { Observable } from 'rxjs/Observable'

import { IFile } from './store/file.reducer'
import { FileActions } from './actions/file.actions'
import { IAppState } from './store'

@Component({
  selector: 'my-app',
  template: `
    <div class="flex-container container">
      <div class="sidebar">
        <input class="input-block input-transparent input-search" type="text" placeholder="Search" />
        <hr />
        <div class="file-listing">
          <ul class="list-plain">
            <li
              class="file-item"
              *ngFor="let item of (files | async)"
              (click)="onItemSelect(item)">
              <span class="fa"
                [class.fa-file-text-o]="item === selectedItem && item.isFile"
                [class.fa-file-text]="item !== selectedItem && item.isFile"
                [class.fa-folder]="item !== selectedItem && !item.isFile"
                [class.fa-folder-open-o]="item === selectedItem && !item.isFile"
                ></span> {{item.title}} <span class="fa fa-trash file-delete error" (click)="onFileDelete(item)"></span>
            </li>
            <li>
              <input class="input-block input-transparent" type="text" placeholder="new file" [(ngModel)]="newFile.title" />
              <input type="submit" (click)="createFile(newFile)" />
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-col">
        {{ currentFile | async }}
        <content-editor [file]="currentFile | async"></content-editor>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  @select(['files', 'files']) files
  @select(['files', 'currentFile']) currentFile

  selectedItem: IFile
  newFile: IFile = {
    name: '',
    title: '',
    content: ''
  }

  constructor(private ngRedux: NgRedux<IAppState>, private fileActions: FileActions) {}

  ngOnInit() {
    this.fileActions.getAllFiles()
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
    this.files.push(file)

    this.newFile = {
      title: '',
      content: ''
    }
  }
}
