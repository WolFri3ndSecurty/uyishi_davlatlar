// API manbalari
const allCountriesURL = 'https://restcountries.com/v3.1/all';
const countryURL = 'https://restcountries.com/v3.1/name/';
const regionURL = 'https://restcountries.com/v3.1/region/';

// Elementlarni tanlash
const continentList = document.getElementById('continentList');
const cardsContainer = document.getElementById('cardsContainer');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const countryName = document.getElementById('countryName');
const population = document.getElementById('population');
const capital = document.getElementById('capital');
const flag = document.getElementById("flag");
const fifa = document.getElementById("fifa");
const hudud = document.getElementById("hudud")
// Modalni yopish uchun funktsiya
function closeModal() {
  modal.style.display = 'none';
}

// Modalni ochish uchun funktsiya
function openModal(country) {
  countryName.textContent = country.name.common;
  population.textContent = `Aholi: ${country.population}`;
  capital.textContent = `Poytaxt: ${country.capital[0]}`;
  flag.src =country.flags.svg;
  flag.className = "bayroq";
  fifa.textContent =  `Fifa: ${country.fifa}`;
   hudud.textContent = `area: ${country.area}`
 
  modal.style.display = 'block';
}

// Davlatga bosganda modalni ochish
function countryClicked(countryName) {
  fetch(countryURL + countryName)
    .then(response => response.json())
    .then(data => {
      const country = data[0];
      openModal(country);
    })
    .catch(error => {
      console.log('Xato yuz berdi:', error);
    });
}

// Qitalar ro'yxatini ko'rsatish
function showCountries(countries) {
  cardsContainer.innerHTML = '';
  cardsContainer.className = "davlatlar"

  countries.forEach(country => {
    const card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', function() {
      countryClicked(country.name.common);
    });
    
    const countryName = document.createElement('h3');
    countryName.textContent = country.name.common;
    countryName.className = "mb-3 fw-bold"

    const countryCapital = document.createElement('p');
    countryCapital.textContent = `Poytaxt: ${country.capital[0]}`;

    card.appendChild(countryName);
    card.appendChild(countryCapital);
    cardsContainer.appendChild(card);
  });
}

// Modalni yopish uchun xususiyat
closeBtn.addEventListener('click', closeModal);

// Qit'a tugmalari bosilganda davlatlar ro'yxatini ko'rsatish
const continentButtons = continentList.querySelectorAll('button');
continentButtons.forEach(button => {
  button.addEventListener('click', function() {
    const continent = button.getAttribute('data-continent');
    fetch(regionURL + continent)
      .then(response => response.json())
      .then(data => {
        const countries = data;
        showCountries(countries);
      })
      .catch(error => {
        console.log('Xato yuz berdi:', error);
      });
  });
});

// Barcha davlatlar ma'lumotlarini olish va asosiy sahifadagi davlatlar ro'yxatini ko'rsatish
fetch(allCountriesURL)
  .then(response => response.json())
  .then(data => {
    const countries = data;
    showCountries(countries);
  })
  .catch(error => {
    console.log('Xato yuz berdi:', error);
  });
