import { Link } from 'react-router-dom';
import { ITicketItemProps } from '@/client/components/TicketItem/TicketItem.props';

export const TicketItem = ({ ticket }: ITicketItemProps) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
};
