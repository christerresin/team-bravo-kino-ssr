import pagination from './pagination.js'

const renderReviewsList = async () => {
  const url = window.location.href;
  const urlArr = url.split('/');
  const movieId = urlArr[urlArr.length - 1];

  const loadReviws = async () => {
    try {
      const URL = `/api/movies/${movieId}/reviews`;
      const response = await fetch(URL);
      const payload = await response.json();
      return payload.data;
    } catch (error) {
      console.log(error);
    }
  };

  const loadVerifiedRating = async () => {
    try {
      const URL = `/api/movies/${movieId}/reviews`;
      const response = await fetch(URL);
      const payload = await response.json();
      return payload.rating;
    } catch (error) {
      console.log(error);
    }
  };

  // Load reviews buttons
  const paginationButtonBack = document.querySelector('.paginationButtonBack');
  paginationButtonBack.addEventListener('click', async () => {
    renderReviews('back');
    if (page_number < 2) {
      paginationButtonBack.disabled = true;
    }
    paginationButtonForward.disabled = false;
  });
  paginationButtonBack.disabled = true;

  const paginationButtonForward = document.querySelector(
    '.paginationButtonForward'
  );

  paginationButtonForward.addEventListener('click', async () => {
    renderReviews('forward');
    paginationButtonBack.disabled = false;

    if (reviewsData.length <= page_number * page_size) {
      paginationButtonForward.disabled = true;
    }
  });

  // List element
  const reviewsList = document.querySelector('.movieReviewsList');

  // Reviews array, pagination vars
  const reviewsData = await loadReviws();
  const page_size = 5;
  let page_number = 0;

  // If no reviews remove buttons
  if (reviewsData.length < 1) {
    paginationButtonBack.style.display = 'none';
    paginationButtonForward.style.display = 'none';
  }

  // Disable forward button onload ? reviews < 5
  if (reviewsData.length <= 1 * page_size) {
    paginationButtonForward.disabled = true;
  }

  const renderReviews = (direction) => {
    if (direction === 'forward') {
      page_number++;
    } else if (direction === 'back') {
      page_number--;
    }

    const data = pagination(reviewsData, page_size, page_number);

    reviewsList.innerHTML = '';

    data.forEach((review) => {
      const li = document.createElement('li');

      const rating = document.createElement('div');
      rating.innerHTML = `Betyg: ${review.rating}`;
      li.appendChild(rating);

      if (review.comment) {
        const comment = document.createElement('div');
        comment.innerHTML = `Kommenter: ${review.comment}`;
        li.appendChild(comment);
      }

      if (review.author) {
        const author = document.createElement('div');
        author.innerHTML = `L??mnad av: ${review.author}`;
        li.appendChild(author);
      }

      li.style.paddingTop = '0.5rem';
      li.style.paddingBottom = '0.5rem';
      reviewsList.appendChild(li);
    });
  };

  const verifiedRating = await loadVerifiedRating();
  const ratingSection = document.querySelector('.imdbBtn');
  if (verifiedRating) {
    ratingSection.innerHTML = `Betyg: ${verifiedRating}`;
  }

  renderReviews('forward');
};

renderReviewsList();

// Leave review
const renderReviewSection = () => {
  const url = window.location.href;
  const urlArr = url.split('/');
  const movieId = urlArr[urlArr.length - 1];

  const ratingSelector = document.querySelector('.reviewRating');
  const ratingRange = [0, 1, 2, 3, 4, 5];
  let selectedMovieRating = null

  ratingRange.forEach((number) => {
    const li = document.createElement('li');
    li.className = 'reviewNumber';
    li.innerHTML = number;
    li.addEventListener('click', () => {
      selectedMovieRating = li.innerText;
      const allNumbers = document.querySelectorAll('.reviewNumber');
      const allItems = Array.from(allNumbers);
      allItems.map((item) => {
        item.classList.remove('selected');
      });
      li.classList.add('selected')
    })
    ratingSelector.appendChild(li);
  });

  // Leave review input logic
  const submitButton = document.querySelector('#submitReview');
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const reviewComment = document.querySelector('#reviewComment').value;
    const reviewAuthor = document.querySelector('#reviewAuthor').value;

    if (!reviewComment) {
      alert('Du gl??mde l??mna en kommentar');
    } else if (!reviewAuthor) {
      alert('Du gl??mde fylla i ins??ndare');
    } else if (!selectedMovieRating) {
      alert('V??nligen v??lj ett betyg f??r filmen');
    } else {

      fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          "data": {
            "rating": parseInt(selectedMovieRating),
            "comment": reviewComment,
            "author": reviewAuthor,
            "movie": parseInt(movieId)
          }
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Cleares review section of inputs/selections
      document.querySelector('#reviewComment').value = '';
      document.querySelector('#reviewAuthor').value = '';
      selectedMovieRating = null;
      const allNumbers = document.querySelectorAll('.reviewNumber');
      const allItems = Array.from(allNumbers);
      allItems.map((item) => {
        item.classList.remove('selected');
      });
    };

  });
}

renderReviewSection();
