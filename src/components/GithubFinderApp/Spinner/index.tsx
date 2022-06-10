import { BiLoaderAlt } from 'react-icons/bi';
import { ISpinnerProps } from '@/components/GithubFinderApp/Spinner/Spinner.props';

export const Spinner = ({ className, ...props }: ISpinnerProps) => {
  return <BiLoaderAlt className={`animate-spin ${className}`} {...props} />;
};
