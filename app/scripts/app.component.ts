import { Component, OnInit } from '@angular/core'
import { IFile } from './store/file.reducer'

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
              *ngFor="let file of files"
              (click)="onFileSelect(file)">
              <span class="fa"
                [class.fa-file-text-o]="file === selectedFile"
                [class.fa-file-text]="file !== selectedFile"
                ></span> {{file.title}} <span class="fa fa-trash file-delete error" (click)="onFileDelete(file)"></span>
            </li>
            <li>
              <input class="input-block input-transparent" type="text" placeholder="new file" [(ngModel)]="newFile.title" />
              <input type="submit" (click)="createFile(newFile)" />
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-col">
        <content-editor [file]="selectedFile"></content-editor>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  files: IFile[]
  selectedFile: IFile
  newFile: IFile = {
    title: '',
    content: ''
  }

  ngOnInit(): void {
    this.files = [
      {
        title: 'File 1',
        content: 'Content'
      },
      {
        title: 'File 2',
        content: 'Content'
      },
      {
        title: 'File 3',
        content: 'Content'
      }
    ]
  }

  onFileSelect(file: IFile): void {
    this.selectedFile = file
  }

  onFileDelete(file: IFile): void {
    var idx = this.files.indexOf(file)

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
