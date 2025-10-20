'use client';

import Sidebar from "@/components/admin/Sidebar";
import { useParams } from 'next/navigation';
import MainPage from "@/components/admin/MainPage";
import AdminVerifyPage from "@/components/admin/AdminVerifyPage";

const page = () => {
  const params = useParams();
  if (typeof window !== 'undefined' && localStorage.getItem('admin_verified') !== 'true' && params.id !== 'verify') {
    window.location.href = `/admin/verify/?next=${window.location.pathname}`;
  }
  if (params.id === 'verify') {
    return <AdminVerifyPage />
  }
  return (
    <main className='flex w-screen h-screen bg-black'>
      <Sidebar selected_option={params.id} />
      <MainPage selected_option={params.id} />
    </main>
  )
}

export default page
