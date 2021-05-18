const BASE_URL = `https://restcountries.eu/rest/v2`

function fetchCountriesByNames(countryName) {
   return fetch(`${BASE_URL}/name/${countryName}`)
      .then(responce => responce.json());
};

export default { fetchCountriesByNames };  