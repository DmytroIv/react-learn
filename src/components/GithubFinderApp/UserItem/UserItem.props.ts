import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IUserItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  avatar: string;
  login: string;
}
