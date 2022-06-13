import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { DocumentData } from 'firebase/firestore';

export interface IListingItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  listing: DocumentData;
  id: string;
  onDelete?: (id: string, name: string) => void;
  onEdit?: (id: string) => void;
}
