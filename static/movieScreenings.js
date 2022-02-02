// Load screenings data from API
const loadScreenings = async () => {
  const url = window.location.href;
  const urlArr = url.split('/');
  const movieId = urlArr[urlArr.length - 1];

  const API = `/api/screenings/${movieId}`;
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const data = await loadScreenings();
console.log(data);
