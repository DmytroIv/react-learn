import { ILayoutProps } from './Layout.props';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="review-page">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};
