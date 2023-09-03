import { fetchBreeds, fetchBreedsInfo } from './cat-api';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const obj = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
//obj.loader.classList.add('is-hidden');
obj.error.classList.add('is-hidden');
obj.breedSelect.classList.add('is-hidden');
obj.catInfo.classList.add('is-hiden');

obj.breedSelect.innerHTML = '<option value="" selected disabled>Select Breed :</option>';

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      obj.loader.classList.add('is-hidden');
      obj.breedSelect.classList.remove('is-hidden');
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      obj.breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholder : true,
        placeholderText: 'Select Breed',
      }
    });
  })
  .catch(error => {
    console.log(`Error:`, error);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    Loading.remove();
    obj.error.classList.remove('is-hidden');
  });

const changeHandler = e => {
  Loading.circle('Loading data, please wait...');
  const selected = e.target.selectedOptions[0];
  const breedID = selected.value;
  console.log(
    `${e.currentTarget.selectedIndex}, ${selected.text}, ${selected.value}`
  );

  function createStarRating(value) {
    const starCount = Math.round(value);
    const stars = '   🐈 '.repeat(starCount);
    return stars;
  }

  fetchBreedsInfo(breedID)
    .then(breedInfo => {
      const EmergyLevelEmoji = createStarRating(
        breedInfo[0].breeds[0].energy_level
        
      );
      const FriendlyLevelEmoji = createStarRating(
        breedInfo[0].breeds[0].stranger_friendly);

      const catInfoHTML = `
      <div class="group-div">
        <div>
          <img src="${breedInfo[0].url}" alt="${breedInfo[0].breeds[0].name}"/>
        </div>
        <div>
          <h1>${breedInfo[0].breeds[0].name}</h1>
          <p>${breedInfo[0].breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${breedInfo[0].breeds[0].temperament}</p>
          <p><strong>Energy Level: </strong>${breedInfo[0].breeds[0].energy_level} ${EmergyLevelEmoji}</p>
          <p><strong>Stranger Friendly </strong>${breedInfo[0].breeds[0].stranger_friendly} ${FriendlyLevelEmoji} </p>
        </div>
      </div>
    `;
      Loading.remove();
      obj.catInfo.classList.remove('is-hidden');
      obj.catInfo.innerHTML = catInfoHTML;
  
    })
    .catch(error => {
      console.error(`Error:`, error);
      Loading.remove();
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      obj.error.classList.remove('is-hidden');
    });
};

obj.breedSelect.addEventListener('change', changeHandler);
//obj.breedSelect.dispatchEvent(new Event('submit'));
