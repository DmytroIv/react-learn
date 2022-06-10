import { useContext } from 'react';
import { Loader, UserItem } from '@/components/GithubFinderApp';
import { GithubContext } from '@/context/github/github.context';

export const UserResults = () => {
  const { users, loading, error } = useContext(GithubContext);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-3xl">{error.message}</p>;
  }

  if (!users) {
    return <h1 className="text-center text-3xl">Try to search users.</h1>;
  }

  if (!users.length) {
    return <h1 className="text-center text-3xl">No users</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((u) => (
        <UserItem key={u.id} avatar={u.avatar_url} login={u.login} />
      ))}
    </div>
  );
};
