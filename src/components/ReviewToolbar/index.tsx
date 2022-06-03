import { Card } from '../Card';
import { IReviewToolbarProps } from './ReviewToolbar.props';

export const ReviewToolbar = ({ reviews, ...props }: IReviewToolbarProps) => {
  let average;
  if (reviews.length) {
    average = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  }

  return (
    <Card {...props}>
      <span>
        Review count: <b>{reviews.length}</b>
      </span>
      <span>
        Average rating: <b>{average}</b>
      </span>
    </Card>
  );
};
