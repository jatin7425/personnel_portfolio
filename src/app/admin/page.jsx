'use client';

import Sidebar from "@/components/admin/Sidebar";
import MainPage from "@/components/admin/MainPage";

const page = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('admin_verified') !== 'true') {
    window.location.href = `/admin/verify/?next=${window.location.pathname}`;
  }
  return (
    <main className='flex w-screen h-screen bg-black'>
      <Sidebar />
      <MainPage />
    </main>
  )
}

export default page
