import { filterVerified } from '../src/reviews';
import pagination from '../static/pagination.js'

test('if only verified reviews is returned', async () => {
  const verifiedReviewsArr = filterVerified(data);
  if (verifiedReviewsArr) {
    verifiedReviewsArr.map((review) => {
      expect(review.verified).toBeTruthy();
    });
  }
});

test('If pagination is only showing 5 reviews at once per page', async () => {
  const page_size = 5;
  let page_number = 1;

  const reviewsArr = pagination(data, page_size, page_number);
  expect(reviewsArr.length <= 5).toBeTruthy();

  page_number++;
  const reviewsArr2 = pagination(data, page_size, page_number);
  expect(reviewsArr2.length <= 5).toBeTruthy();

  page_number--;
  const reviewsArr3 = pagination(data, page_size, page_number);
  expect(reviewsArr3.length <= 5).toBeTruthy();

  // Check if pagination works forward and backward, compare page1 and page3
  const isEqualArr = reviewsArr3.filter((review1) => reviewsArr.find(review2 => review1.id === review2.id));
  expect(isEqualArr).toEqual(reviewsArr3);
  expect(reviewsArr).toEqual(reviewsArr3);

  // Check if page1 and page3 has same ids on objs
  let idIsEqual = false;
  for (let i = 0; i < 5; i++) {
    if (reviewsArr.find(review => reviewsArr3[i].id === review.id)) {
      idIsEqual = true;
    } else {
      idIsEqual = false;
      break;
    }
  };
  expect(idIsEqual).toBeTruthy();

  // Check if page1 and page3 has same comments on objs
  let commentIsEqual = false;
  for (let i = 0; i < 5; i++) {
    if (reviewsArr.find(review => reviewsArr3[i].comment === review.comment)) {
      commentIsEqual = true;
    } else {
      commentIsEqual = false;
      break;
    }
  };
  expect(commentIsEqual).toBeTruthy();

  // Check if page1 and page3 has same authors on objs
  let authorIsEqual = false;
  for (let i = 0; i < 5; i++) {
    if (reviewsArr.find(review => reviewsArr3[i].author === review.author)) {
      authorIsEqual = true;
    } else {
      authorIsEqual = false;
      break;
    }
  };
  expect(authorIsEqual).toBeTruthy();

  //Check if page1 and page2 is not equal
  let isNotEqual = false;
  for (let i = 0; i < 5; i++) {
    if (reviewsArr.find(review => reviewsArr2[i].id === review.id)) {
      isNotEqual = true;
    } else {
      isNotEqual = false;
      break;
    }
  };
  expect(isNotEqual).toBeFalsy();

});

// MOCK data
const data = [
  {
    id: 66,
    comment: 'Test',
    rating: 4,
    author: 'Test',
    verified: null,
  },
  {
    id: 67,
    comment: 'Test',
    rating: 4,
    author: 'Test',
    verified: null,
  },
  {
    id: 68,
    comment: 'Good movie',
    rating: 5,
    author: 'Johan',
    verified: true,
  },
  {
    id: 101,
    comment: '123',
    rating: 1,
    author: '123',
    verified: null,
  },
  {
    id: 108,
    comment: 'Intense',
    rating: 5,
    author: 'Olaf',
    verified: null,
  },
  {
    id: 109,
    comment: "No way that I'm going to watch it again. Sucks.",
    rating: 1,
    author: 'Alex',
    verified: null,
  },
  {
    id: 111,
    comment: 'Nice',
    rating: 5,
    author: 'Lena',
    verified: null,
  },
  {
    id: 164,
    comment: "I'm so proud of my dad",
    rating: 5,
    author: 'Son',
    verified: true,
  },
  {
    id: 264,
    comment: "I'm so proud of my dad",
    rating: 5,
    author: 'Son',
    verified: true,
  },
  {
    id: 364,
    comment: "I'm so proud of my dad",
    rating: 5,
    author: 'Son',
    verified: true,
  },
  {
    id: 464,
    comment: "I'm so proud of my dad",
    rating: 5,
    author: 'Son',
    verified: true,
  },
  {
    id: 564,
    comment: "I'm so proud of my dad",
    rating: 5,
    author: 'Son',
    verified: true,
  },
];
