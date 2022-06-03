import { useContext } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { IReviewProps } from './Review.props';
import { ReviewContext } from '../../context/review.context';

export const Review = ({ reviewId, rating, text, ...props }: IReviewProps) => {
  const { removeReview, setEditReview } = useContext(ReviewContext);

  return (
    <Card {...props}>
      <span className="rating-number">{rating}</span>
      <Button onClick={() => removeReview(reviewId)} className="btn-ico btn-remove">
        ⤫
      </Button>
      <Button onClick={() => setEditReview({ id: reviewId, rating, text })} className="btn-ico btn-edit">
        ✏️
      </Button>
      <div>
        <p>{text}</p>
      </div>
    </Card>
  );
};
