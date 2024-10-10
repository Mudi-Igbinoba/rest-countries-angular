import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { COUNTRIES } from '../../data';
import { AsyncPipe, DecimalPipe, SlicePipe } from '@angular/common';
import { CountryCardsComponent } from '../country-cards/country-cards.component';
import { Country } from '../model/country';
import { PaginationComponent } from '../pagination/pagination.component';
import { ConfigService } from '../services/config.service';
import { catchError, map, Observable, of, timeout } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    DecimalPipe,
    FilterListComponent,
    SkeletonComponent,
    CountryCardsComponent,
    PaginationComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  countries$!: Observable<Country[]>;
  filteredCountries!: Country[];
  totalCountries!: number;
  perPage: number = 12;
  currentPage: number = 1;
  paginatedCountries!: Country[];
  numOfPages!: any;
  start: number = 1;
  end: number = 12;
  searchTerm: string = '';
  selectedRegion: string = '';

  configService = inject(ConfigService);

  ngOnInit() {
    this.begin();
  }

  begin() {
    this.countries$ = this.configService.getAllCountries().pipe(
      map((countries) => {
        this.totalCountries = countries.length;
        this.numOfPages = Math.ceil(this.totalCountries / this.perPage);

        // Sort countries once and store in a property
        this.filteredCountries = countries.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA.localeCompare(nameB);
        });

        // Initialize pagination
        this.updatePaginatedCountries();

        return countries;
      })
    );
  }

  private updatePaginatedCountries() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    this.paginatedCountries = this.filteredCountries.slice(start, end);
    this.start = start + 1; // Start index for display (1-based)
    this.end = Math.min(end, this.totalCountries); // End index for display (1-based)
  }

  searchCountry(query: any) {
    this.searchTerm = query;

    if (this.searchTerm && !this.selectedRegion) {
      this.configService
        .getCountryByName(query)
        .pipe(
          timeout(5000),
          catchError((err) => {
            console.error(err);
            alert('No country found!');

            throw err;
          })
        )
        .subscribe({
          next: (countries) => {
            this.currentPage = 1;
            this.filteredCountries = countries;
            this.totalCountries = this.filteredCountries.length;
            this.numOfPages = Math.ceil(this.totalCountries / this.perPage);
            this.updatePaginatedCountries();
          },
          error: (err) => {
            console.log('Error occurred:', err); // Debugging line
          },
        });
    } else if (this.selectedRegion && this.searchTerm) {
      this.filterByRegionAndSearch(this.selectedRegion, this.searchTerm);
    } else {
      this.begin();
    }
  }

  filterByRegion(region: any) {
    this.selectedRegion = region;

    if (this.selectedRegion && !this.searchTerm) {
      this.configService
        .getCountriesByRegion(region)
        .pipe(
          timeout(5000),
          catchError((err) => {
            console.error(err);
            alert('No countries in this region!');

            throw err;
          })
        )
        .subscribe({
          next: (countries) => {
            this.currentPage = 1;
            this.filteredCountries = countries.sort((a, b) => {
              const nameA = a.name.common.toUpperCase();
              const nameB = b.name.common.toUpperCase();
              return nameA.localeCompare(nameB);
            });
            this.totalCountries = this.filteredCountries.length;
            this.numOfPages = Math.ceil(this.totalCountries / this.perPage);

            // Initialize pagination
            this.updatePaginatedCountries();
          },
          error: (err) => {
            console.log('Error occurred:', err); // Debugging line
          },
        });
    } else if (this.selectedRegion && this.searchTerm) {
      this.filterByRegionAndSearch(this.selectedRegion, this.searchTerm);
    } else {
      this.begin();
    }
  }

  filterByRegionAndSearch(region: string, searchTerm: string) {
    this.configService
      .getCountryByName(searchTerm)
      .pipe(
        timeout(5000),
        catchError((err) => {
          console.error(err);
          alert('No country exists');
          return of([]);
        })
      )
      .subscribe((countries) => {
        const filteredByRegion = countries.filter(
          (country) => country.region.toLowerCase() === region.toLowerCase()
        );

        this.currentPage = 1;
        this.filteredCountries = filteredByRegion;
        this.totalCountries = this.filteredCountries.length;
        this.numOfPages = Math.ceil(this.totalCountries / this.perPage);
        this.updatePaginatedCountries();
      });
  }

  // Function to change displayed countries based on current page
  changeCountries(n: number) {
    this.currentPage = n;
    this.updatePaginatedCountries();
  }

  goToPrev() {
    if (this.currentPage > 1) {
      this.changeCountries(this.currentPage - 1);
    }
  }

  goToNext() {
    if (this.currentPage < this.numOfPages) {
      this.changeCountries(this.currentPage + 1);
    }
  }
}
