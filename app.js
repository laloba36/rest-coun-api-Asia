
const countriesList = document.getElementById("country_name");
let countries; 

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/region/asia")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";

  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
 
  countriesList.innerHTML = options;
 
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#Country_flag img").src = countryData.flag;
  document.querySelector("#Country_flag img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("borders").innerHTML = countryData.borders;
  document.getElementById("languages").innerHTML = countryData.languages.filter(l=>l.name).map(l=>`${l.name} (${l.nativeName})`).join(" ,");
}