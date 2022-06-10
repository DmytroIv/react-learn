import { IUserItemProps } from '@/components/GithubFinderApp/UserItem/UserItem.props';
import { Link } from 'react-router-dom';

export const UserItem = ({ login, avatar, className, ...props }: IUserItemProps) => {
  return (
    <div className={`card shadow-md compact side bg-base-100 ${className}`} {...props}>
      <div className="flex-row items-center space-x-4 card-body">
        <div className="avatar">
          <div className="rounded-full shadow w-14 h-14">
            <img src={avatar} alt="avatar" />
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link to={`/users/${login}`} className="text-base-content text-opacity-40">
            Visit profile
          </Link>
        </div>
      </div>
    </div>
  );
};
