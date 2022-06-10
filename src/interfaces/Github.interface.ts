import { IUserItem } from '@/interfaces/UserItem.interface';
import { GITHUB_ACTIONS } from '@/context/github/github.actions';
import { IUserDetails, IUserRepo } from '@/interfaces/UserDetails.interface';

export interface IGithubError {
  message: string;
}

export interface IGithubState {
  users: IUserItem[] | null;
  user: IUserDetails | null;
  loading: boolean;
  error: null | IGithubError;
  repos: IUserRepo[];
}

export type GithubReducerActionPayload = null | IGithubError | IUserItem[];

export interface IGithubReducerAction {
  type: GITHUB_ACTIONS;
  payload?: any | GithubReducerActionPayload; // TODO
}
