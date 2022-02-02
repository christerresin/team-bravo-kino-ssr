import { filterVerified } from '../src/reviews';

test('if only verified reviews is returned', async () => {
  const verifiedReviewsArr = filterVerified(data);
  if (verifiedReviewsArr) {
    verifiedReviewsArr.map((review) => {
      expect(review.verified).toBeTruthy();
    });
  }
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
];
