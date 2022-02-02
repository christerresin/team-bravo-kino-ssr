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

const movieScreeningsList = document.querySelector('.movieScreeningsList');

if (data) {
  data.map((screening) => {
    const startDate = screening.attributes.start_time.substring(10, 0);
    const startTime = screening.attributes.start_time.substring(11, 16);

    const li = document.createElement('li');
    li.style.paddingTop = '0.5rem';
    li.style.paddingBottom = '0.5rem';

    const screeningCardInformation = document.createElement('div');
    screeningCardInformation.classList.add('screeningCardInformation');

    const screeningCardMovieRoom = document.createElement('p');
    screeningCardMovieRoom.classList.add('screeningCardMovieRoom');
    screeningCardMovieRoom.innerHTML = `Salong: ${screening.attributes.room}`;

    const screeningCardMovieTime = document.createElement('p');
    screeningCardMovieTime.classList.add('screeningCardMovieTime');
    screeningCardMovieTime.innerHTML = `Tid: ${startDate} - ${startTime}`;

    li.appendChild(screeningCardInformation);
    li.appendChild(screeningCardMovieRoom);
    li.appendChild(screeningCardMovieTime);

    movieScreeningsList.appendChild(li);
  });
}
