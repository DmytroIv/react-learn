import { IButtonProps } from './Button.props';

export const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};
