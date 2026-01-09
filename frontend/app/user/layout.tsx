"use client";
import React from 'react';
import PrivateRouter from '@/components/PrivateRouter';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRouter allowedRoles={["User"]}>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </PrivateRouter>
  );
}