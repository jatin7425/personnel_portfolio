'use client';

import React from 'react'
import Sidebar from "@/components/admin/Sidebar";
import MainPage from "@/components/admin/MainPage";

const page = () => {
  return (
    <main className='flex w-screen h-screen bg-black'>
      <Sidebar />
      <MainPage />
    </main>
  )
}

export default page
