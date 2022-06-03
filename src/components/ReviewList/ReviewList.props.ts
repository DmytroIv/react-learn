import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReview } from '../../interfaces/Review.interface';

export interface IReviewListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  reviews: IReview[];
}
