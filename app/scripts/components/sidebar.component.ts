import { Component } from '@angular/core'

@Component({
  selector: 'sidebar',
  templateUrl: 'scripts/components/sidebar.html'
})
export class SidebarComponent {
  hidden: boolean = false

  constructor() {}

  toggleSidebar() {
    this.hidden = !this.hidden
  }
}
