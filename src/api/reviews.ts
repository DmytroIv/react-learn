import { IReview } from '@/interfaces/Review.interface';

const apiReviews = 'http://localhost:3001/reviews';

export const getReviews = async (): Promise<IReview[]> => {
  const res = await fetch(apiReviews);
  return await res.json();
};

export const getReview = async (id: string): Promise<IReview> => {
  const res = await fetch(`${apiReviews}/${id}`);
  return await res.json();
};

export const deleteReview = async (id: string) => {
  return await fetch(`${apiReviews}/${id}`, {
    method: 'DELETE',
  });
};

export const putReview = async (updatedReview: IReview) => {
  const res = await fetch(`${apiReviews}/${updatedReview.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedReview),
  });
  return await res.json();
};

export const postReview = async (newReview: IReview) => {
  const res = await fetch(apiReviews, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  });
  return await res.json();
};
