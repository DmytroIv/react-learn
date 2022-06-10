import { Spinner } from '@/components/GithubFinderApp';

export const Loader = () => {
  return (
    <h1 className="flex justify-center items-center my-3 text-3xl">
      <Spinner className="mr-3 text-5xl" />
      <span>Loading...</span>
    </h1>
  );
};
