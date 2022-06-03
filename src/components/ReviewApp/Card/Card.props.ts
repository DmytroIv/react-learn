import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
