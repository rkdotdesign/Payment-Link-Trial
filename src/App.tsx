import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Agentation } from 'agentation';
import { DashboardLayout } from './components/DashboardLayout';
import { PaymentLinksPage } from './pages/PaymentLinksPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/payment-links" replace />} />
          <Route path="payment-links" element={<PaymentLinksPage />} />
        </Route>
      </Routes>
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  );
};

export default App;
