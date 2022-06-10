import { PropsWithChildren, createContext, useReducer, useCallback } from 'react';
import { getUserDetailsByLogin, getUserReposByLogin, searchUsersByQuery } from '@/api/github';
import { IGithubState } from '@/interfaces/Github.interface';
import { githubReducer } from '@/context/github/github.reducer';
import { GITHUB_ACTIONS } from '@/context/github/github.actions';

const initGithubState: IGithubState = {
  users: null,
  user: null,
  loading: false,
  error: null,
  repos: [],
};

export interface IGithubContext extends IGithubState {
  getUserDetails: (login: string) => void;
  getUserRepos: (login: string) => void;
  searchUsers: (q: string) => void;
  searchUsersError: (errorMessage: string) => void;
  clearUsers: () => void;
}

const initContext: IGithubContext = {
  ...initGithubState,
  getUserDetails: () => {},
  searchUsers: () => {},
  searchUsersError: () => {},
  clearUsers: () => {},
  getUserRepos: () => {},
};

export const GithubContext = createContext<IGithubContext>(initContext);

export const GithubContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [state, dispatch] = useReducer(githubReducer, initGithubState);

  const searchUsers = useCallback(async (q: string) => {
    dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_START });
    const users = await searchUsersByQuery(q);
    dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_USERS, payload: users });
  }, []);

  const searchUsersError = useCallback((errorMessage: string) => {
    dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_START });
    dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_ERROR, payload: { message: errorMessage } });
  }, []);

  const clearUsers = useCallback(() => {
    dispatch({ type: GITHUB_ACTIONS.GITHUB_CLEAR_USERS });
  }, []);

  const getUserRepos = useCallback(async (userLogin: string) => {
    const repos = await getUserReposByLogin(userLogin);
    if (repos) {
      dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_USER_REPOS, payload: repos });
    }
  }, []);

  const getUserDetails = useCallback(async (login: string) => {
    dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_START });
    const user = await getUserDetailsByLogin(login);
    if (user) {
      dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_USER, payload: user });
      await getUserRepos(login);
    } else {
      dispatch({ type: GITHUB_ACTIONS.GITHUB_REQUEST_ERROR, payload: { message: 'User not found or not exists' } });
    }
  }, []);

  return (
    <GithubContext.Provider
      value={{ ...state, searchUsers, searchUsersError, clearUsers, getUserDetails, getUserRepos }}>
      {children}
    </GithubContext.Provider>
  );
};
