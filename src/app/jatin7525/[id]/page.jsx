'use client';

import React from 'react'
import Sidebar from "@/components/admin/Sidebar";
import { useParams } from 'next/navigation';
import MainPage from "@/components/admin/MainPage";

const page = () => {
  const params = useParams();
  return (
    <main className='flex w-screen h-screen bg-black'>
      <Sidebar selected_option={params.id} />
      <MainPage selected_option={params.id} />
    </main>
  )
}

export default page
