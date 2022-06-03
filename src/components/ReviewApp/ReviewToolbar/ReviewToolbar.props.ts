import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReview } from '../../../interfaces/Review.interface';

export interface IReviewToolbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IReview[];
}
