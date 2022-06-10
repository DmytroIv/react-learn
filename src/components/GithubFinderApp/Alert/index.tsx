import { useContext } from 'react';
import {
  IoInformationCircleOutline,
  IoWarningOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { AlertAppearance, IAlertProps } from '@/components/GithubFinderApp/Alert/Alert.props';
import { IconType } from 'react-icons/lib';
import { AlertContext } from '@/context/alert/alert.context';

export const Alert = (props: IAlertProps): JSX.Element => {
  const { message, appearance, isVisible, hideAlert } = useContext(AlertContext);

  let AlertIcon: IconType = IoInformationCircleOutline;
  let alertClassName: AlertAppearance = 'default';
  switch (appearance) {
    case 'success':
      AlertIcon = IoCheckmarkCircleOutline;
      alertClassName = 'success';
      break;
    case 'info':
      AlertIcon = IoInformationCircleOutline;
      alertClassName = 'info';
      break;
    case 'warning':
      AlertIcon = IoWarningOutline;
      alertClassName = 'warning';
      break;
    case 'error':
      AlertIcon = IoCloseCircleOutline;
      alertClassName = 'error';
      break;
    case 'default':
    default:
  }

  if (!isVisible) return <></>;

  return (
    <div className={`alert shadow-lg fixed z-10 w-80 top-15 right-10 alert-${alertClassName}`}>
      <div>
        {<AlertIcon className="text-4xl mr-3" />}
        <div>
          <h3 className="font-medium text-xl capitalize">{appearance}</h3>
          <div className="text-sm">{message}</div>
        </div>
      </div>
      <div className="flex-none">
        <button onClick={hideAlert} className="btn btn-sm btn-ghost text-3xl p-0">
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};
