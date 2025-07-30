// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMSRoutes from './modules/cms/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CMSRoutes />} />
        {/* Aquí irán los otros módulos */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
