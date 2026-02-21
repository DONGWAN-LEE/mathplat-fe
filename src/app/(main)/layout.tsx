'use client';

import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { AuthGuard } from '@/features/auth';
import { RealtimeProvider } from '@/features/realtime';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <RealtimeProvider>
        <div className="flex min-h-screen flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex flex-1">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 bg-gradient-sidebar lg:block">
              <Sidebar />
            </aside>

            {/* Mobile sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="w-64 p-0 bg-gradient-sidebar border-sidebar-border">
                <div className="mt-4">
                  <Sidebar />
                </div>
              </SheetContent>
            </Sheet>

            {/* Main content */}
            <main className="flex-1 bg-background p-6">
              {children}
            </main>
          </div>
        </div>
      </RealtimeProvider>
    </AuthGuard>
  );
}
