import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

const clearMarkup = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

function inputHandler() {
  fetchCountries(inputField.value.trim())
    .then(data => {
      showResult(data);
    })
    .catch(error => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    });
}

function showResult(countriesArray) {
  if (countriesArray.length > 10) {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countriesArray.length > 2) {
    Notify.success(`${countriesArray.length} countries found`);
    showCountryList(countriesArray);
  } else if (countriesArray.length === 1) {
    showCountry(countriesArray);
  } else {
    clearMarkup();
  }
}

function showCountry(countriesList) {
  clearMarkup();
  const markup = countriesList.map(
    ({ name, capital, flags, population, languages }) => {
      return `<h1>
        <img src="${flags.svg}" alt="${name.official}" width="60" height="40">
        ${name.official}
      </h1>
      <p><b>Capital</b>: ${capital}</p>
      <p><b>Population</b>: ${population}</p>
      <p><b>Languages</b>: ${Object.values(languages)}</p>`;
    }
  );
  countryInfo.innerHTML = markup;
}

function showCountryList(countriesList) {
  clearMarkup();
  const markup = countriesList
    .map(({ name, flags }) => {
      return `<li>
            <h1>
              <img src="${flags.svg}" alt="${name.official}" width="60" height="40">
              ${name.official}
            </h1>
          </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
