import { useState, FormEvent, ChangeEvent, useContext, useEffect } from 'react';
import { Card } from '../Card';
import { Radio } from '../Radio';
import { Button } from '../Button';
import { IReviewFormProps } from './Review.props';
import { IReview } from '../../interfaces/Review.interface';
import { ReviewContext } from '../../context/review.context';
import { v4 as uuidV4 } from 'uuid';

export const ReviewForm = ({ ...props }: IReviewFormProps) => {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addReview, updateReview, setEditReview, editReview } = useContext(ReviewContext);

  useEffect(() => {
    if (editReview) {
      setText(editReview.text || '');
      setRating(editReview.rating || null);
    }
  }, [editReview]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    let ratingErr = '';
    let textErr = '';
    if (rating === null) ratingErr = 'Please check rating number.';
    if (!text.trim()) textErr = 'Please write a message for the review.';
    const newErr = `${ratingErr} ${textErr}`;

    if (newErr) setError(newErr);
    if (rating === null || !text.trim()) return;

    const newReview: IReview = {
      id: editReview?.id || uuidV4(),
      text,
      rating,
    };

    if (editReview) {
      updateReview(newReview);
    } else {
      addReview(newReview);
    }

    setText('');
    setRating(null);
    setError(null);
    setEditReview(null);
  };

  const textOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const ratingOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(e.target.value));
  };

  return (
    <Card>
      <form onSubmit={onSubmitHandler} {...props}>
        <h3>How would you rate your service with us?</h3>
        <div className="control-rating">
          {new Array(10).fill(null).map((el, i) => (
            <Radio
              checked={rating === i + 1}
              onChange={ratingOnChangeHandler}
              key={i}
              labelText={i + 1}
              name="rating"
              value={i + 1}
            />
          ))}
        </div>
        <div className="control submit-control">
          <input value={text} onChange={textOnChangeHandler} type="text" />
          <Button type="submit" className="btn">
            Send
          </Button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </Card>
  );
};
