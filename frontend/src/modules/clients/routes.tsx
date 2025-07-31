import { Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import ClientDashboard from './pages/ClientDashboard';
import ClientProjects from './pages/ClientProjects';

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="portal" element={<ClientDashboard />} />
        <Route path="proyectos" element={<ClientProjects />} />
      </Route>
    </Routes>
  );
}