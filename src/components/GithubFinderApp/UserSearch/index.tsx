import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { GithubContext } from '@/context/github/github.context';
import { AlertContext } from '@/context/alert/alert.context';

export const UserSearch = () => {
  const { users, searchUsers, searchUsersError, clearUsers } = useContext(GithubContext);
  const [q, setQ] = useState<string>('');
  const { showAlert } = useContext(AlertContext);

  const submitFormHandle = (e: FormEvent) => {
    e.preventDefault();

    if (!q) {
      searchUsersError('Write smt in to Search field');
      showAlert({
        message: 'Write smt in to Search field',
        appearance: 'error',
      });
    } else {
      searchUsers(q);
      setQ('');
    }
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-4">
      <form onSubmit={submitFormHandle}>
        <div className="form-control">
          <div className="relative">
            <input
              value={q}
              type="text"
              className="w-full pr-40 bg-gray-200 input input-md text-black text-lg"
              placeholder="Search"
              onChange={onChangeHandle}
            />
            <button type="submit" className="absolute text-lg top-0 right-0 rounded-l-none btn btn-md w-36">
              Go
            </button>
          </div>
        </div>
      </form>
      {users && !!users.length && (
        <div>
          <button onClick={clearUsers} className="btn btn-accent btn-md">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
