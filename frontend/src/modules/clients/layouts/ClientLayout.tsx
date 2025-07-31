import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';
import ClientSidebar from './ClientSidebar';
import ClientBottomBar from './ClientBottomBar';

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar Desktop - Siempre visible en desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <ClientSidebar 
            isOpen={true}
            onClose={() => {}}
          />
        </div>
      </div>

      {/* Sidebar Mobile - Solo cuando está abierto */}
      <ClientSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Navbar */}
        <ClientNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom Navigation Mobile */}
      <ClientBottomBar />
    </div>
  );
}