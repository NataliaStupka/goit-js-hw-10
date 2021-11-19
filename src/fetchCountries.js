const BASE_URL = 'https://restcountries.com/v2'

//эта функция фетчит (Забираем с сервера Данные -> распарсить их -> вернуть промис)
export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flag,languages`)
        .then(response => response.json());
}

