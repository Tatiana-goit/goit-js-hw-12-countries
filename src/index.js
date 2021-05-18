import './sass/main.scss';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import countryListTpl from './templates/render-countries-list.hbs';
import countryTpl from './templates/render-country.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  input: document.querySelector('.input'),
  cardContainer: document.querySelector('.cardContainer'),
};

refs.input.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  const name = event.target.value;
//   console.log(name);
  fetchCountries(name)
    .then(checkingNumberOfCountries)
    .catch(catchError);
    event.target.value = '';
}

function checkingNumberOfCountries(countries) {
//   console.log(countries);
  if (countries.length > 10) {
    clearMarkup();
    tooManyCountries();
  } else if (countries.length <= 10 && countries.length > 1) {
    clearMarkup();
    renderMarkup(countryListTpl, countries);
  } else if (countries.length === 1) {
    clearMarkup();
    renderMarkup(countryTpl, countries[0]);
  } else {
      errorResult()
  }
}

function renderMarkup(countryListTpl, countries) {
  const murkup = countryListTpl(countries);
  refs.cardContainer.insertAdjacentHTML('beforeend', murkup);
}

function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}

function tooManyCountries() {
    error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3500,
        closerHover: true,
      });
}

function errorResult () {
    error({
        text: 'Nothing found. Please enter a valid request',
        delay: 3500,
        closerHover: true,
      });
}

function catchError(error) {
  console.log(error);
}
