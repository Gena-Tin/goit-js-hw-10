// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const SEARCH_FIELDS = '?fields=name,capital,population,flags,languages';

export function fetchCountries(country) {
  return fetch(`${BASE_URL}${country}${SEARCH_FIELDS}`)
    .then(response => {
      if (response.status === 404) {
        throw new Error(response.status);
        //console.log(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
