import { Component, Input } from '@angular/core';
import { File } from '../file';

@Component({
  selector: 'content-editor',
  template: `
    <div class="content">
      <div *ngIf="!file">
        <h2 class="content-title">Welcome to OMEN</h2>
        <h3>Please select file to edit</h3>
      </div>
      <div *ngIf="file">
        <h2 class="content-title"><input class="input-block" type="text" [(ngModel)]="file.title" /></h2>
        <hr />
        <textarea>{{file.content}}</textarea>
      </div>
    </div>
  `
})
export class ContentEditorComponent {
  @Input()
  file: File
}
