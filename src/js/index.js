import {fetchBreeds,fetchBreedsInfo} from './cat-api';
const obj = {
breedSelect: document.querySelector('.breed-select'),
loader: document.querySelector('.loader'),
error: document.querySelector('.error'),
catInfo: document.querySelector('.description')

};

 fetchBreeds().then(breeds=>{
breeds.forEach((breed)=>{
  //console.log(breed)
  const option = document.createElement('option');
  option.value = breed.id; // Ustaw wartość opcji na ID rasy
  option.textContent = breed.name; // Ustaw tekst opcji na nazwę rasy
  obj.breedSelect.appendChild(option); // Dodaj opcję do <select>
});

 })
 // --------tu ERROR
 .catch(error => {
  new Error('Oops! Something went wrong! Try reloading the page!');
  console.error(`Error :`, error)
});
