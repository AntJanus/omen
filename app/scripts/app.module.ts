import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ContentEditorComponent } from './components/content-editor.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ContentEditorComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
