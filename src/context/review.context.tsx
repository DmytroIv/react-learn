import { PropsWithChildren, createContext, useState, useEffect, useCallback } from 'react';
import { IReview } from '@/interfaces/Review.interface';
import { postReview, getReviews, putReview, deleteReview } from '../api/reviews';

const initReviews: IReview[] = [];

export interface IReviewContext {
  reviews: IReview[];
  editReview: IReview | null;
  removeReview: (id: string) => void;
  setEditReview: (review: IReview | null) => void;
  addReview: (review: IReview) => void;
  updateReview: (editedReview: IReview) => void;
}

const initContext: IReviewContext = {
  reviews: initReviews,
  editReview: null,
  removeReview: () => {},
  addReview: () => {},
  updateReview: () => {},
  setEditReview: () => {},
};

export const ReviewContext = createContext<IReviewContext>(initContext);

export const ReviewContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [reviews, setReviews] = useState<IReview[]>(initReviews);
  const [editReview, setEditReview] = useState<IReview | null>(null);

  const getInitialReviews = useCallback(async (): Promise<void> => {
    const initialReviews = await getReviews();
    setReviews(initialReviews?.length ? initialReviews : []);
  }, []);

  useEffect(() => {
    getInitialReviews();
  }, [getInitialReviews]);

  const removeReview = async (id: string) => {
    const res = await deleteReview(id);

    if (res?.status === 200) {
      const newReviews = reviews.filter((r: IReview) => r.id !== id);
      setReviews(newReviews);
    }
  };

  const addReview = async (newReview: IReview) => {
    const resReview = await postReview(newReview);

    if (resReview) {
      const newReviews = [resReview, ...reviews];
      setReviews(newReviews);
    }
  };

  const updateReview = async (editedReview: IReview) => {
    const resReview = await putReview(editedReview);

    if (resReview) {
      const updatedReviews = reviews.map((r: IReview) => (r.id === resReview.id ? resReview : r));
      setReviews(updatedReviews);
    }
  };

  return (
    <ReviewContext.Provider value={{ editReview, reviews, removeReview, addReview, updateReview, setEditReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
