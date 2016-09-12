import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="flex-container container">
      <div class="sidebar">
        <h3>Files</h3>
      </div>
      <div class="flex-col">
        <div class="content">
          <h2>Title</h2>
          <hr />
          <textarea></textarea>
        </div>
      </div>
    </div>
  `
})
export class AppComponent { }
