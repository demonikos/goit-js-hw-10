import { Notify } from "notiflix";

export function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const params = new URLSearchParams ({
        fields: 'name,capital,population,flags,languages',
    })
    return fetch(`${BASE_URL}/${name}?${params}`)
    // return fetch(`https://istio.com/`)

      .then(response => {
        //   console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
    //   .then(data => data)
    //   .catch(error => 
    //     {
    //         // Notify.failure(error.message);
    //         console.log(error.message);
    //     }
    //     );
}