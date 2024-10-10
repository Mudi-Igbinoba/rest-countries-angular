import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from '../model/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-cards',
  standalone: true,
  imports: [DecimalPipe, CurrencyPipe, RouterLink],
  templateUrl: './country-cards.component.html',
  styleUrl: './country-cards.component.css',
})
export class CountryCardsComponent {
  @Input({
    required: true,
  })
  country!: Country;
}
