import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryListTpl from '../templates/render-countries-list.hbs';
import countryTpl from '../templates/render-country.hbs';
import {  msgTooManyCountries } from './pnotify';


const refs = {
  input: document.querySelector('.input'),
  cardContainer: document.querySelector('.cardContainer'),
};


function checkingNumberOfCountries(countries) {
  if (countries.length === 1) {
  renderMarkup(countryTpl, countries[0])}

  if (countries.length <= 10 && countries.length > 1) {
    renderMarkup(countryListTpl, countries)}
    
  if (countries.length > 10) {
    msgTooManyCountries()}
}

function renderMarkup(countryListTpl, countries) {
  const murkup = countryListTpl(countries);
  refs.cardContainer.insertAdjacentHTML('beforeend', murkup);
}

function reset() {
  refs.cardContainer.innerHTML = '';
}


function onInputSearch() {
    reset();
  
    const name = refs.input.value;
  
    fetchCountries(name)
      .then(checkingNumberOfCountries)
      .catch(console.log);
    
  }

refs.input.addEventListener('input', debounce(onInputSearch, 500));
