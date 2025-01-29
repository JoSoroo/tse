'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'

export default function navbar() {
    const pathname = usePathname();
  return (
    <div className='p-5 rounded-[10px]  flex items-center justify-between'>
        <div className=' text-[25px] font-bold capitalize'>{pathname.split("/").pop()}</div>
        
    </div>
  )
}
