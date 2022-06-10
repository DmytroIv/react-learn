import { ALERT_ACTIONS } from '@/context/alert/alert.actions';
import { AlertAppearance } from '@/components/GithubFinderApp/Alert/Alert.props';

export interface IAlertState {
  message: string;
  isVisible: boolean;
  appearance: AlertAppearance;
}

export interface IShowAlertArguments {
  appearance: AlertAppearance;
  message: string;
}

export interface IAlertContext extends IAlertState {
  showAlert: ({ appearance, message }: IShowAlertArguments) => void;
  hideAlert: () => void;
}

export interface IAlertReducerAction {
  type: ALERT_ACTIONS;
  payload?: any; // TODO
}
