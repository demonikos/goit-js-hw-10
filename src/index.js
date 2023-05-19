import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const countryInput = document.querySelector('#search-box');

// let string ='';

countryInput.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(inputValue) {
    // const newValue = inputValue.trim();
    // checkSpaces(inputValue);
    inputValue.preventDefault();
    // inputValue.trim();
    if (inputValue.target.value === ""){
        return
        // console.log()
    }
    else {
    fetchCountries(inputValue.target.value.trim())
    .then(value => {
            if (value.length === 1) {
                clearMarkups();
                countryInfo.innerHTML = createCountryMarkup(value);
            }
            else if (value.length <= 10 && value.length > 1){
                clearMarkups();
                countryList.innerHTML = createFewCountriesMarkup(value);
            }
            else if (value.length > 10){
                clearMarkups();            
                // console.log("too many countries!")
                Notify.info('Too many matches found. Please enter a more specific name.');
            }
        }
    )

        // {if value.length}
        
        // (countryInfo.innerHTML = createCountryMarkup(value)))
    // .then(value => (console.log(value)))

        .catch(error => {
    if (error.message === 'Not Found') {
        Notify.failure('Oops, there is no country with that name');
        // console.dir(error);
    } else {
        Notify.failure('Oops, something going wrong!');
        console.dir(error);
    }
        });

    // .catch(error => {
    //     Notify.failure('Oops, there is no country with that name');
    //     console.dir(error);        
    // });

}
}

// function trimmed(val){
//     checkSpaces(val);
//     return inputHandler(val);
// }

// function typeOfInput(val){
//     console.log(typeof(val));
//     let newVal = val.toString();
//     console.log(typeof(newVal));
//     let res = {newVal};
//     console.log(typeof(res));
// }


// function checkSpaces(input){
//     let inputString = input.toString();
//     let trimmedString = inputString.trim();
//     let newInput = {trimmedString};
//     // console.log(newInput);
//     return inputHandler(newInput);
//   }

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


// function renderCountries(city) {
//     console.log(`city is - ${city}`);
  
//     const markup = city.map
//         ({
//           capital,
//           name: { official },
//           population,
//           languages,
//           flags: { svg },
//         })
//       .join('');
  
//       console.log(`markup is - ${markup}`)
//   return `<li><img src="${svg}" alt=""><h2>Name - ${official}</h2><h3>Capital - ${capital}</h3><h3>Population - ${population}</h3><h3>Languages - ${languages}</h3></li>`
  
//   //   console.log(markup);
  
//   //   // return countryList.innerHTML = markup;
//   }
//   // countryList.innerHTML = markup;

function createCountryMarkup(obj){
    // fetchCountries(obj);
    return obj.map(({name: {official}, capital, languages, population, flags: {svg},}) => {
        const langValues = Object.values(languages).join(', ');
        return (`
            <div class = "country-wrap">
            <img class = "solo-img" src="${svg}" alt="">
            <h2>${official}</h2>
            </div>
            <ul>
            <li class="country-data"><span>Capital</span>: ${capital}</li>
            <li class="country-data"><span>Population</span>: ${population}</h3>
            <li class="country-data"><span>Languages</span>: ${langValues}</li>
            </ul>
            `)
    }).join('');
}

function createFewCountriesMarkup(obj){
    return obj.map(({name: {official}, flags: {svg},}) => {
        return (`
        <div class = "country-wrap">
        <img class = "solo-img" src="${svg}" alt="">
        <h2>${official}</h2>
        </div>
        `)
    }).join('');      
}

function clearMarkups(){
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}