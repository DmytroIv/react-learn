import { withLayout } from '@/components/GithubFinderApp/Layout';
import { UserSearch, UserResults } from '@/components/GithubFinderApp';

const FinderPage = () => {
  return (
    <div className="">
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default withLayout(FinderPage);
