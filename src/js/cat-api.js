import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_THhvGlPVf7TmHxqeARMtqpJQU8Py3GxaCsCHrcbtydYuUFyD360SuIUQN7g9Q7tH';
  
  const apiUrl = 'https://api.thecatapi.com/v1';
  //wysyła żądanie (GET DO API) HTTP i zwraca obietnicę z tablicą ras - wynikiem żądania. Za pomocą TRY CATCH 

const fetchBreeds = async () => {
    try{
    return axios
      .get(`${apiUrl}/breeds`)
      .then(response => {
        console.log(response.data);
        return response.data;
      });
    }catch(error) {
        new Error('Oops! Something went wrong! Try reloading the page!');
      }};
  // ---------errrprp zmienic z uzyciem biblioteki. 

const fetchBreedsInfo = async (breedId) => {
    try{
        return axios
          .get(`${apiUrl}/images/search?breed_ids=${breedId}`)
          .then(response => {
            console.log(response.data);
            return response.data;
          });
        }catch(error) {
            new Error('Oops! Something went wrong! Try reloading the page!');
          }};
      // ---------errrprp zmienic z uzyciem biblioteki. 


  export{fetchBreeds, fetchBreedsInfo}

