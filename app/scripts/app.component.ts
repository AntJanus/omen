import { Component } from '@angular/core'
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { IAppState } from './store'

@Component({
  selector: 'my-app',
  templateUrl: 'scripts/app.html'
})
export class AppComponent {
  @select(['files', 'currentFile']) currentFile

  constructor(private ngRedux: NgRedux<IAppState>) {}
}
