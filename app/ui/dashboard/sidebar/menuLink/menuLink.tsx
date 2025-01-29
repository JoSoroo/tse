'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuLink({ item }) {
  const pathname = usePathname();
  
  // Apply active class conditionally
  const isActive = pathname === item.path ? 'bg-amber-500' : '';

  return (
    <Link
      href={item.path}
      className={`p-[12px] flex items-center gap-[5px] m-[5px] rounded-[10px] hover:bg-amber-400 ${isActive}`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
}
