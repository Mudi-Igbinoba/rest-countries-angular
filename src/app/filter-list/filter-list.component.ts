import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [TitleCasePipe, ReactiveFormsModule],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.css',
})
export class FilterListComponent {
  regions = ['africa', 'americas', 'antarctic', 'asia', 'europe', 'oceania'];

  @Input() selectedRegion: FormControl<string | null> = new FormControl(
    '',
    Validators.required
  );

  @Output() filterRegionEvent = new EventEmitter();
  filterRegion() {
    this.filterRegionEvent.emit(this.selectedRegion.value);
  }
}
