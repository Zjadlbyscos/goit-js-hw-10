import { fetchBreeds, fetchBreedsInfo } from './cat-api';

const obj = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
obj.loader.classList.add('is-hidden');
obj.error.classList.add('is-hidden');

const changeHandler = (e) => {
  const selected = e.target.selectedOptions[0];
  const breedID = selected.value;
  console.log(
    `${e.currentTarget.selectedIndex}, ${selected.text}, ${selected.value}`
  );

  fetchBreedsInfo(breedID)
    .then((breedInfo) => {
      const catInfoHTML = `
      <div class="group-div">
        <div>
          <img src="${breedInfo[0].url}" alt="${breedInfo[0].breeds[0].name}" width="400"/>
        </div>
        <div>
          <h1>${breedInfo[0].breeds[0].name}</h1>
          <p>${breedInfo[0].breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${breedInfo[0].breeds[0].temperament}</p>
        </div>
      </div>
    `;
      obj.catInfo.innerHTML = catInfoHTML;
    })
    .catch((error) => {
      console.error(`Error:`, error);
      obj.error.textContent = 'Oops! Something went wrong! Try reloading the page!';
    });
};

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      obj.breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error(`Error:`, error);
    obj.error.textContent = 'Oops! Something went wrong! Try reloading the page!';
  });


  
obj.breedSelect.addEventListener('change', changeHandler);
obj.breedSelect.dispatchEvent(new Event('submit'));
