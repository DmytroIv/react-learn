import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ITicket } from '@/client/interfaces/Ticket.interface';

export interface ITicketItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  ticket: ITicket;
}
