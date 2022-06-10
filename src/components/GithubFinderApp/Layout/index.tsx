import { FunctionComponent } from 'react';
import { ILayoutProps } from './Layout.props';
import { Header } from '@/components/GithubFinderApp/Header';
import { Footer } from '@/components/GithubFinderApp/Footer';
import { Alert } from '@/components/GithubFinderApp/Alert';

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className="github-finder flex flex-col">
      <Alert />
      <Header />
      <main className="main flex-grow">
        <div className="container pb-5">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
