import { ICardProps } from './Card.props';

export const Card = ({ children, className, ...props }: ICardProps) => {
  return (
    <div className={`card ${className ? className : ''}`} {...props}>
      {children}
    </div>
  );
};
