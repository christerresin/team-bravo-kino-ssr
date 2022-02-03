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

  function pagination(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
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
        author.innerHTML = `Lämnad av: ${review.author}`;
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
    li.innerHTML = number;
    li.addEventListener('click', () => {
      selectedMovieRating = li.innerText;
    })
    ratingSelector.appendChild(li);
  });

  const submitButton = document.querySelector('#submitReview');
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const reviewComment = document.querySelector('#reviewComment').value;
    const reviewAuthor = document.querySelector('#reviewAuthor').value;

    if (!reviewComment) {
      alert('Du glömde lämna en kommentar');
    }else if (!reviewAuthor) {
      alert('Du glömde fylla i insändare');
    } else if (!selectedMovieRating) {
      alert('Vänligen välj ett betyg för filmen');
    } else {

      fetch(`/api/reviews/${movieId}`, {
        method: 'POST',
        body: JSON.stringify({
          rating: selectedMovieRating,
          comment: reviewComment,
          author: reviewAuthor
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      document.querySelector('#reviewComment').value = '';
      document.querySelector('#reviewAuthor').value = '';
      selectedMovieRating = null;
    }

  });
}

renderReviewSection();