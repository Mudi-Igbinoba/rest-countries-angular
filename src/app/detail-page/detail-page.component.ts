import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Country } from '../model/country';
import { ConfigService } from '../services/config.service';
import {
  AsyncPipe,
  DecimalPipe,
  KeyValuePipe,
  Location,
} from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLongLeft } from '@ng-icons/heroicons/outline';
import { heroArrowLongLeftSolid } from '@ng-icons/heroicons/solid';
import { LoadingSkeletonComponent } from '../loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    DecimalPipe,
    KeyValuePipe,
    LoadingSkeletonComponent,
    AsyncPipe,
  ],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css',
  viewProviders: provideIcons({ heroArrowLongLeftSolid }),
})
export class DetailPageComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    private _location: Location
  ) {
    route.params.subscribe((val) => {
      this.countries$ = this.configService.getAllCountries();
      this.countries$.subscribe((country) => {
        this.countries = country;
      });

      this.country$ = this.configService.getCountryDetails(val['id']);
      this.country$.subscribe((country) => {
        this.country = country[0];
      });
    });
  }
  countries$!: Observable<Country[]>;
  countries!: Country[];
  country$!: Observable<Country[]>;
  country!: Country;

  ngOnInit() {
    const count = signal(0);
    count.set(3);
    // Increment the count by 1.
    count.update((value) => value + 1);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is: ' + count());
    this.countries$ = this.configService.getAllCountries();
    this.countries$.subscribe((country) => {
      this.countries = country;
    });

    const heroId = this.route.snapshot.paramMap.get('id');
    this.country$ = this.configService.getCountryDetails(heroId);
    this.country$.subscribe((country) => {
      this.country = country[0];
    });

    console.log(this.country);
  }

  goBack() {
    this._location.back();
  }

  getLanguagesList(country: any): string {
    if (country.languages) {
      return Object.values(country.languages).join(', ');
    }
    return 'None';
  }

  getCurrencies(country: any) {
    if (country.currencies) {
      let arr: any[] = [];
      Object.keys(country.currencies).map((curr) =>
        arr.push(country.currencies[curr].name)
      );
      return arr.join(', ');
    }
    return 'None';
  }

  getNativeName(country: any) {
    if (country.name.nativeName) {
      let arr: any[] = [];
      Object.keys(country.name.nativeName).map((lang) => arr.push(lang));
      return arr
        .map(
          (lang) =>
            country.name.nativeName[lang].common +
            ' (' +
            country.languages[lang] +
            ')'
        )
        .join(', ');
    }
    return 'None';
  }

  getBorderCountries() {
    if (this.country.borders && this.countries) {
      let arr: string[] = [];
      this.country.borders?.forEach((bd) => {
        let found = this.countries.filter(
          (count) => count.cioc === bd || count.cca3 === bd
        );
        arr.push(found[0].name.common);
      });

      return arr;
    }

    return null;
  }
}
