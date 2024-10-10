import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroMoon } from '@ng-icons/heroicons/outline';
import { heroMoonSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  viewProviders: [provideIcons({ heroMoon, heroMoonSolid })],
})
export class NavbarComponent {
  @Input() isDark = false;
  @Output() toggleDarkModeEvent = new EventEmitter();

  toggleDarkMode() {
    this.toggleDarkModeEvent.emit();
  }
}
