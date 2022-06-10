import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AlertAppearance = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface IAlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}
