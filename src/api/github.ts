import { IUserItem } from '@/interfaces/UserItem.interface';
import { IUserDetails, IUserRepo } from '@/interfaces/UserDetails.interface';

export const searchUsersByQuery = async (q: string): Promise<IUserItem[]> => {
  const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/search/users?q=${q}`, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });

  if (res.status !== 200) return [];

  const { items } = await res.json();
  return items;
};

export const getUserDetailsByLogin = async (u: string): Promise<IUserDetails | null> => {
  const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${u}`, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });

  if (res.status !== 200) return null;

  return await res.json();
};

export const getUserReposByLogin = async (u: string): Promise<IUserRepo | null> => {
  const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${u}/repos`, {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  });

  if (res.status !== 200) return null;

  return await res.json();
};
