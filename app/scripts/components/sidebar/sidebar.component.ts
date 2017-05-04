import { Component, OnInit } from '@angular/core'
import { select, NgRedux } from '@angular-redux/store'

import { SettingsActions } from '../../actions/settings.actions'
import { FileActions } from '../../actions/file.actions'

@Component({
  selector: 'sidebar',
  templateUrl: 'scripts/components/sidebar/sidebar.html'
})
export class SidebarComponent implements OnInit {
  @select(['files', 'files']) files

  hidden: boolean = false

  newProjectPath: ''

  constructor(private settingsActions: SettingsActions,
    private fileActions: FileActions) {}

  ngOnInit() {
    this.fileActions.getRootFiles()
    this.settingsActions.getPath()
  }

  toggleSidebar() {
    this.hidden = !this.hidden
  }

  setProjectPath(path): void {
    this.settingsActions.setPath(path)
    this.newProjectPath = ''
  }
}
