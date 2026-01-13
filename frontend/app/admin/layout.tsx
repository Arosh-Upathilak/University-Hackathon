"use client";
import React from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import PrivateRouter from '@/components/PrivateRouter';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRouter allowedRoles={["Admin"]}>
      <AdminNavbar>
        {children}
      </AdminNavbar>
    </PrivateRouter>
  );
}