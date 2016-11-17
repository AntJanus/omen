import 'core-js/es7/reflect'
import 'zone.js'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app.module'

const platform = platformBrowserDynamic()
platform.bootstrapModule(AppModule)
