import { ALERT_ACTIONS } from '@/context/alert/alert.actions';
import { IAlertReducerAction, IAlertState } from '@/interfaces/Alert.interface';

export const alertReducer = (state: IAlertState, action: IAlertReducerAction) => {
  switch (action.type) {
    case ALERT_ACTIONS.ALERT_HIDE:
      return { ...state, isVisible: false };
    case ALERT_ACTIONS.ALERT_SHOW:
      return { ...state, isVisible: true, ...action.payload };
    default:
      return state;
  }
};
