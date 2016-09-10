import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="flex-container">
      <div class="sidebar">
        <h3>Files</h3>
      </div>
      <div class="flex-col">
        <h2>Title</h2>
      </div>
    </div>
  `
})
export class AppComponent { }
