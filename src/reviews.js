import fetch from 'node-fetch';

const API_URL = `https://lernia-kino-cms.herokuapp.com/api/reviews`;

const trimData = (dataArray) => {
  const data = dataArray.data.map((review) => {
    return {
      id: review.id,
      comment: review.attributes.comment,
      rating: review.attributes.rating,
      author: review.attributes.author,
      verified: review.attributes.verified,
    };
  });
  const verifiedReviewData = filterVerified(data);
  return verifiedReviewData;
};

const filterVerified = (dataArray) => {
  const filteredArr = dataArray.filter((review) => {
    if (review.verified) {
      return review;
    }
  });

  return filteredArr;
};

const loadMovieReviews = async (movieId) => {
  const res = await fetch(
    `${API_URL}?filters[movie]=${movieId}&pagination[pageSize]=1000`
  );
  const payload = await res.json();
  const data = {
    data: trimData(payload),
  };

  return data;
};

export default loadMovieReviews;
