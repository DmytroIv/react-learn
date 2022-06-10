import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUserRepo } from '@/interfaces/UserDetails.interface';

export interface IRepoProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
  repo: IUserRepo;
}
