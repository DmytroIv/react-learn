import { Route, Routes } from 'react-router-dom';
import { withLayout, PrivateRoute } from '@/components';
import ExplorePage from '@/pages/ExplorePage';
import OffersPage from '@/pages/OffersPage';
import ProfilePage from '@/pages/ProfilePage';
import SignUpPage from '@/pages/SignUpPage';
import SignInPage from '@/pages/SignInPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import NotFoundFinderPage from '@/pages/NotFoundFinderPage';
import ListingPage from '@/pages/ListingPage';
import EditListingPage from '@/pages/EditListingPage';
import CategoryPage from '@/pages/CategoryPage';
import CreateListingPage from '@/pages/CreateListingPage';
import ContactPage from '@/pages/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/profile" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/edit-listing/:listingId" element={<EditListingPage />} />
      <Route path="/create-listing" element={<CreateListingPage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/category/:categoryName/:listingId" element={<ListingPage />} />
      <Route path="/contact/:landlordId" element={<ContactPage />} />
      <Route path="/*" element={<NotFoundFinderPage />} />
    </Routes>
  );
};

export default withLayout(AppRoutes);
