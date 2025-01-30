'use client'
import React, { useEffect, useState } from 'react'
import {
    MdDashboard,
    MdShoppingBag,
    MdLogout
} from "react-icons/md"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MenuLink from './menuLink/menuLink'
import { useRouter } from 'next/navigation'

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Category",
        path: "/dashboard/category",
        icon: <MdDashboard />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
    ],
  },
];

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Хадгалагдсан токеныг авах
        if (!token) {
          alert("Токен байхгүй байна.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Токеныг толгойд дамжуулах
          },
        });

        if (res.ok) {
          const user = await res.json();
          console.log("Хэрэглэгчийн мэдээлэл:", user);
          setUser(user); // Хэрэглэгчийн мэдээллийг state-д хадгалах
        } else {
          const errorData = await res.json();
          alert(errorData.message || "Мэдээлэл авахад алдаа гарлаа.");
        }
      } catch (error) {
        console.error("Хэрэглэгчийн мэдээллийг татахад алдаа гарлаа:", error);
      }
    };

    fetchUser();
  }, []);
  const handleLogout = () =>{
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-5 mb-5">
        <Avatar className="m-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user ? (
          <div className="flex flex-col">
            <span className="font-medium">{user.name || "Нэргүй"}</span>
            <span className="text-sm text-gray-500">{user.email || "И-мэйл алга"}</span>
          </div>
        ) : (
          <p>Таныг нэвтрэхийг хүлээж байна...</p>
        )}
      </div>
      <ul className="list-style-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-gray-500 font-bold text-[13px] my-2">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className="p-5 my-1 flex items-center gap-2.5 cursor-pointer rounded-lg" onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}
