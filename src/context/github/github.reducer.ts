import { IGithubReducerAction, IGithubState } from '@/interfaces/Github.interface';
import { GITHUB_ACTIONS } from '@/context/github/github.actions';

export const githubReducer = (state: IGithubState, action: IGithubReducerAction) => {
  switch (action.type) {
    case GITHUB_ACTIONS.GITHUB_REQUEST_START:
      return { ...state, loading: true };
    case GITHUB_ACTIONS.GITHUB_REQUEST_END:
      return { ...state, loading: false };
    case GITHUB_ACTIONS.GITHUB_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GITHUB_ACTIONS.GITHUB_REQUEST_USERS:
      return { ...state, loading: false, users: action.payload, error: null };
    case GITHUB_ACTIONS.GITHUB_REQUEST_USER:
      return { ...state, loading: false, user: action.payload, error: null };
    case GITHUB_ACTIONS.GITHUB_REQUEST_USER_REPOS:
      return { ...state, loading: false, repos: action.payload };
    case GITHUB_ACTIONS.GITHUB_CLEAR_USERS:
      return { ...state, users: [], error: null };
    default:
      return state;
  }
};
