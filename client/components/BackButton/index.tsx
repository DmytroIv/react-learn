import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IBackButtonsProps } from './BackButton.props';

export const BackButton = ({ url }: IBackButtonsProps) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Back
    </Link>
  );
};
