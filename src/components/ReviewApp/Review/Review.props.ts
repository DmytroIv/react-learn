import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  reviewId: string;
  rating: number;
}
