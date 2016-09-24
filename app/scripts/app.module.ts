import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { NgReduxModule, NgRedux } from 'ng2-redux'
import { IAppState, rootReducer } from './store'

import { AppComponent } from './app.component'
import { ContentEditorComponent } from './components/content-editor.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule
  ],
  declarations: [
    AppComponent,
    ContentEditorComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {})
  }
}
