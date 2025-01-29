"use client";
import React, { useState } from 'react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      if (!name || !email || !password) {
        alert("Нэр, имэйл, нууц үг бөглөх шаардлагатай!");
        return;
      }
  
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Амжилттай бүртгэгдлээ!");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Алдаа гарлаа:", error);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Бүртгүүлэх</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Нэр"
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Имэйл"
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Нууц үг"
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full p-3 mt-4 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
        >
          Бүртгүүлэх
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
