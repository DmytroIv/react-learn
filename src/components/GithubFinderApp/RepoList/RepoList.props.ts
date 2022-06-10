import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUserRepo } from '@/interfaces/UserDetails.interface';

export interface IRepoListProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
  repos: IUserRepo[];
}
