import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matSearchOutline } from '@ng-icons/material-icons/outline';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  viewProviders: [provideIcons({ matSearchOutline })],
})
export class SearchBarComponent {
  @Input() searchTerm: FormControl<string | null> = new FormControl(
    '',
    Validators.required
  );

  @Output() searchCountriesEvent = new EventEmitter();

  searchCountry() {
    this.searchCountriesEvent.emit(this.searchTerm.value);
  }
}
