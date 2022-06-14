import { Route, Routes } from 'react-router-dom';
import { withLayout } from '@/client/components';
import HomePage from '@/client/pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default withLayout(AppRoutes);
