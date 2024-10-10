import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChevronLeftSolid,
  heroChevronRightSolid,
} from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIconComponent, NgClass, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  viewProviders: [
    provideIcons({ heroChevronLeftSolid, heroChevronRightSolid }),
  ],
})
export class PaginationComponent {
  @Input() perPage!: number;
  @Input() totalCountries!: number;
  @Input() numOfPages!: number;
  @Input() currentPage!: number;

  @Output() changePageEvent = new EventEmitter();
  @Output() goToPrevEvent = new EventEmitter();
  @Output() goToNextEvent = new EventEmitter();

  // Calculate start and end dynamically
  get start(): number {
    return (this.currentPage - 1) * this.perPage + 1;
  }

  get end(): number {
    return Math.min(this.currentPage * this.perPage, this.totalCountries);
  }

  changePage(currentPage: number) {
    this.changePageEvent.emit(currentPage);
  }

  goToPrev() {
    this.goToPrevEvent.emit();
  }

  goToNext() {
    this.goToNextEvent.emit();
  }
}
