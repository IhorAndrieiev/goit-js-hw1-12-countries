// import debounce from 'node_modules/lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

var debounce = require('lodash.debounce');
import './css/common.css';
import countryCard from './templates/card-countries.hbs';
import countriesOfList from './templates/list-of-countries.hbs'
import API from './js/api-servise';
import getRefs from './js/get-refs';

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onImputSearch, 500));


      
function onImputSearch(e) {
    const searchQuery = e.target.value; //searchQuery callback countryName
    //console.log(searchQuery)
    if (!searchQuery.trim()) {
        refs.cardContainer.innerHTML = '';
        return
    }
    API.fetchCountriesByNames(searchQuery.trim())
        .then(renderCountriesCard)
        .catch(onFetchError)
        
};



    function renderCountriesCard(countries) {
        // const markup = countryCard(countries);
        if (countries.length > 10) {
            refs.cardContainer.innerHTML = '';
            onFetchError();
            error({
                title: 'Uh Oh!',
                text: 'Too many matches found. Please enter a more specific query!',
                delay: 2500,
                closerHover: true,
            });
        } else if (countries.length <= 10 && countries.length > 1) {
            refs.cardContainer.innerHTML = '';
            refs.cardContainer.insertAdjacentHTML('beforeend', countriesOfList(countries));
        } else if (countries.length === 1) {
            refs.cardContainer.innerHTML = '';
            refs.cardContainer.insertAdjacentHTML('beforeend', countryCard(countries));
        } else {
            
           refs.cardContainer.innerHTML = '';
    
               }
        
    }

     function onFetchError(error) {
         //alert('error набери больше букв')
     } 