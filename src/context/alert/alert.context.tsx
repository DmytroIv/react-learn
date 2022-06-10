import { PropsWithChildren, createContext, useReducer, useCallback } from 'react';
import { IAlertContext, IAlertState, IShowAlertArguments } from '@/interfaces/Alert.interface';
import { alertReducer } from '@/context/alert/alert.reducer';
import { ALERT_ACTIONS } from '@/context/alert/alert.actions';

const initAlertState: IAlertState = {
  message: '',
  appearance: 'default',
  isVisible: false,
};

const initContext: IAlertContext = {
  ...initAlertState,
  showAlert: () => {},
  hideAlert: () => {},
};

export const AlertContext = createContext<IAlertContext>(initContext);

export const AlertContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [state, dispatch] = useReducer(alertReducer, initAlertState);

  const showAlert = useCallback(({ message, appearance }: IShowAlertArguments) => {
    dispatch({ type: ALERT_ACTIONS.ALERT_SHOW, payload: { message, appearance } });
  }, []);

  const hideAlert = useCallback(() => {
    dispatch({ type: ALERT_ACTIONS.ALERT_HIDE });
  }, []);

  return <AlertContext.Provider value={{ ...state, showAlert, hideAlert }}>{children}</AlertContext.Provider>;
};
