import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { NgReduxModule, NgRedux } from 'ng2-redux'

import { IAppState, rootReducer } from './store'

import { FileActions } from './actions/file.actions'
import { SettingsActions } from './actions/settings.actions'

import { IPCService } from './services/IPC.service'

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
  providers: [
    IPCService,
    FileActions,
    SettingsActions
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {})
  }
}
