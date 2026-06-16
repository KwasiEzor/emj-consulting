import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#1a2f4a] to-[#0B1F3A]">
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader user={session.user} />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
