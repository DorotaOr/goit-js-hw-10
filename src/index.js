import './sass/_common.scss';
import './sass/_example.scss';
import './sass/index.scss';

const countryList = document.querySelector('ul.country-list');
const getUrl = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
const displayCountries = ({ flags, name, capital, population, languages }) => {
  const country = document.createElement('div');
  const countryLanguages = languages.map(language => language.name).join(', ');
  country.innerHTML = `<h1><img src="${flags.svg}" alt="${name} flag" width="24px"/>
  ${name} </h1>
  <div><b>Capital:</b> ${capital}</div>
  <div><b>Population:</b> ${population}</div>
  <div><b>Languages:</b> ${countryLanguages}</div>`;
  countryList.append(country);
};
const displayCountriesList = countries => {
  const listOfCountries = countries.map(({ flags, name }) => {
    const list = document.createElement('div');
    list.innerHTML = `<h1><img src="${flags.svg}" alt="${name} flag" width="24px"/>
    ${name} </h1>`;
    return list;
  });
  countryList.append(...listOfCountries);
};
const fetchCountries = name => {
  const trimName = name.trim();
  if (trimName.length === 0) return;
  return fetch(getUrl(trimName))
    .then(response => response.json())
    .then(countries => {
      if (countries.length > 10) {
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.status === 404) {
        console.log('Oops, there is no country with that name');
        return;
      }
      if ((countries.length <= 10) & (countries.length >= 2)) {
        return displayCountriesList(countries);
      }
      if (countries.length === 1) {
        return displayCountries(countries[0]);
      }
    });
};
const input = document.querySelector('input#search-box');
const inputStyle = (input.onkeydown = event => {
  if (/[a-z\s]/i.test(event.key) === true) {
    return /[a-z\s]/i.test(event.key);
  } else {
    console.log('Sorry! You can use only letters and spaces!');
    return false;
  }
});
const selectCountries = event => {
  const countryRemove = document
    .querySelectorAll('ul.country-list>div')
    .forEach(country => country.remove());
  fetchCountries(event.target.value);
};
input.addEventListener('input', selectCountries);
