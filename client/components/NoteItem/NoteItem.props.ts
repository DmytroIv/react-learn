import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { INote } from '@/client/interfaces/Note.interface';

export interface INoteItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  note: INote;
}
