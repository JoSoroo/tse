"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Email:', email);  // email-ийн утгыг шалгах
    console.log('Password:', password);  // password-ийн утгыг шалгах
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      localStorage.setItem("token", data.token); // Токеныг хадгалах
      console.log("Response data:", data.token);  // Хариу өгөгдлийг шалгах

      if (res.ok) {
        alert("Амжилттай нэвтэрлээ!");
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Алдаа гарлаа:", error);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };
  
  
  
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-7 md:flex-row rounded-2xl bg-white shadow-2xl min-h-screen">
      {/* Left Section */}
      <article className="flex-shrink-0">
        <Image
          className="w-48 h-48 shadow-xl rounded-md"
          src="/tse.png"
          alt="Illustrative Graphic"
          width={192}
          height={192}
        />
      </article>

      {/* Right Section */}
      <article className="flex flex-col gap-4 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-medium text-center text-gray-900 dark:text-white">Нэвтрэх хэсэг</h1>
        <span className="text-gray-600 dark:text-gray-400 text-center">Admini erheer newtreh</span>

        {/* Input Fields */}
        <div className="grid gap-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Checkbox and Forgot Password */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-yellow-600 focus:ring-yellow-500"
          />
          <label htmlFor="remember" className="cursor-pointer">Сануулах</label>
          <a href="#" className="ml-auto text-yellow-500 hover:underline">Нууц үгээ мартсан уу?</a>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleLogin}
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-yellow-600 text-white h-12 px-5 font-medium hover:bg-yellow-700 transition"
          >
            Нэвтрэх
          </button>
          <a
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 h-12 px-5 font-medium hover:bg-yellow-200 dark:hover:bg-gray-700 transition"
          >
            Бүртгүүлэх
          </a>
        </div>
      </article>
    </div>
  );
};

export default LoginPage;
