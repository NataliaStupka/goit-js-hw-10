import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;
// ------------------------------------------------------------------------

const inputRef = document.querySelector('input#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() {
    const textInput = inputRef.value.trim();

    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
    
    fetchCountries(textInput)
        .then(checkDataLength)
        .catch(error => console.log(error));
}

// ---------------------------------------------------------------
function checkDataLength(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    renderCountries(countries);
  } else if (countries.length === 1) {
    renderCountryInfo(countries);
  } else if (countries.status === 404) {
       Notify.failure('Oops, there is no country with that name.');
        return;
  }
    console.log('Найденые страны:', countries.length)
}



// функция - перечень стран
function renderCountries(country) {
    countriesList.innerHTML = '';

    const markup = country.map(country => {
            return `<div class="renderCountryInfo-wrapper">
            <img class="flag-img" src='${country.flag}' alt='${country.name} flag' width='50'/>
            <h2>${country.name}</h2>
        </div>`;
    })
        .join('');
    countryInfo.innerHTML = markup;    
};

//функ,рендерит (разметка) - 1страна +характеристики
function renderCountryInfo(country) {
    countriesList.innerHTML = '';

    const markup = country.map(country => {
    return `<div class="renderCountryInfo-wrapper">
            <img class="flag-img" src='${country.flag}' alt='${country.name} flag' width='50'/>
            <h2>${country.name}</h2>
        </div>
        
        <p class="render-text"><b>Capital:</b> ${country.capital}</p>
        <p class="render-text"><b>Population:</b> ${country.population}</p>
        <p class="render-text"><b>Languages:</b> ${country.languages.map(item => `${item.name}`)}</p>`
    })
        .join("");
    countryInfo.innerHTML = markup;    
};


