import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import UIShowcase from '../../components/ui/Showcase';

export default function CMSRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/showcase" element={<UIShowcase />} />
    </Routes>
  );
} 