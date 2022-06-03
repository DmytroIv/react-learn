import { ReactNode, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface IRadioProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  labelText: string | number;
}
