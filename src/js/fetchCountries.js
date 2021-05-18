const baseURL = 'https://restcountries.eu/rest/v2';

export function fetchCountries(name) {
    const url = `${baseURL}/name/${name}`;
    return fetch(url)
            .then(response => {
                if (response.ok) {
                    return (response.json())
                }
                throw new Error (response.statusText)
            })
            
}

