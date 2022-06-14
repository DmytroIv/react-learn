import { Route, Routes } from 'react-router-dom';
import { withLayout } from '@/client/components';
import HomePage from '@/client/pages/HomePage';
import RegisterPage from '@/client/pages/RegisterPage';
import LoginPage from '@/client/pages/LoginPage';
import { PrivateRoute } from '@/client/components/PrivateRoute';
import NewTicketPage from '@/client/pages/NewTicketPage';
import TicketsPage from '@/client/pages/TicketsPage';
import TicketPage from '@/client/pages/TicketPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/new-ticket" element={<PrivateRoute />}>
        <Route path="/new-ticket" element={<NewTicketPage />} />
      </Route>
      <Route path="/tickets" element={<PrivateRoute />}>
        <Route path="/tickets" element={<TicketsPage />} />
      </Route>
      <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
        <Route path="/ticket/:ticketId" element={<TicketPage />} />
      </Route>
    </Routes>
  );
};

export default withLayout(AppRoutes);
