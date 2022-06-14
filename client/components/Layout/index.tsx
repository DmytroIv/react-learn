import { FunctionComponent } from 'react';
import { Header, Footer } from '@/client/components';
import { ILayoutProps } from './Layout.props';
//
import './Layout.css';

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className="wrapper">
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
