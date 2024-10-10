# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).
## Table of contents

- [Frontend Mentor - REST Countries API with color theme switcher solution](#frontend-mentor---rest-countries-api-with-color-theme-switcher-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_

### Screenshot
- Homepage
![FireShot Capture 002 - Countries of the World - rest-countries-angular-ten vercel app](https://github.com/user-attachments/assets/230b01f2-436d-48e9-add1-cfcb2364ab0e)
- Detail Page
![FireShot Capture 003 - Countries of the World - rest-countries-angular-ten vercel app](https://github.com/user-attachments/assets/0948f73e-605c-406a-80f2-942b930dea17)


### Links

- Solution URL: [https://github.com/Mudi-Igbinoba/rest-countries-angular](https://github.com/Mudi-Igbinoba/rest-countries-angular)
- Live Site URL: [https://rest-countries-angular-ten.vercel.app/](https://rest-countries-angular-ten.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- [Angular](https://angular.dev/) - JS library
- [Angular icons](https://ng-icons.github.io/ng-icons/#/) - JS library
- [Tailwind](https://tailwindcss.com/) - For styles

### What I learned

I used this project to strengthen my Angular lessons, particularly using services, observables and the async pipe to handle asynchronous requests.

```html
 @if(countries$ | async; as countries ){ @for (country of
      paginatedCountries; track country.name.common) {
      <app-country-cards [country]="country" />
      } } 
```

```ts
countries$!: Observable<Country[]>;
countries!: <Country[]>;

configService = inject(ConfigService);

ngOnInit(){
  this.countries$ = this.configService.getAllCountries()
  this.countries$.subscribe(country => {
    this.countries = country
  })
}
```

## Author

- Website - [Mudi Igbinoba](https://mudee.carrd.co/)
- Twitter - [@Mudi_Igbinoba](https://www.twitter.com/mudi_igbinoba)
- Github - [@mudi-igbinoba](https://github.com/mudi-igbinoba)
- LinkedIn - [Osamudiame Igbinoba](https://www.linkedin.com/in/osamudiame-igbinoba/)



