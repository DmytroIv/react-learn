import { IRadioProps } from './Radio.props';

export const Radio = ({ labelText, ...props }: IRadioProps): JSX.Element => {
  return (
    <label tabIndex={0}>
      <input type="radio" {...props} />
      <span>{labelText}</span>
    </label>
  );
};
