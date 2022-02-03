import { raw, request } from 'express';
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

const calcVerifiedRating = (dataArray) => {
  if (dataArray.length >= 5) {
    let rating = 0;

    dataArray.map((review) => {
      rating += review.rating;
    });

    return Math.round(rating / dataArray.length);
  }
};

export const filterVerified = (dataArray) => {
  const filteredArr = dataArray.filter((review) => {
    if (review.verified) {
      return review;
    }
  });

  return filteredArr;
};

export const loadMovieReviews = async (movieId) => {
  const res = await fetch(
    `${API_URL}?filters[movie]=${movieId}&pagination[pageSize]=100`
  );
  const payload = await res.json();
  const data = {
    data: trimData(payload),
    rating: calcVerifiedRating(trimData(payload)),
  };

  return data;
};

export const postNewReview = async (review) => {
  const data = JSON.stringify(review);

  try {
    const res = await fetch('https://lernia-kino-cms.herokuapp.com/api/reviews/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });
    console.log(res.status)
  } catch (error) {
    console.log(error);
  }

}