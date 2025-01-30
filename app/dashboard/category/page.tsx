'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IoPencilSharp } from "react-icons/io5"
import { MdDelete } from 'react-icons/md'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CategoryPage() {
  const [openAdd, setOpenAdd] = useState(false);  // Категори нэмэх диалог нээх
  const [openUpdate, setOpenUpdate] = useState(false);  // Категори шинэчлэх диалог нээх
  const [categoryName, setCategoryName] = useState(""); // Категори нэрийг хадгалах
  const [updatedName, setUpdatedName] = useState("");  // Шинэ нэрийг хадгалах
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Сонгогдсон категори ID
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Өгөгдлийг авах явцад алдаа гарлаа:", err);
    }
  };

  const addCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        console.log("Категори амжилттай нэмэгдлээ.");
        setCategoryName("");  // Категори нэрийг цэвэрлэх
        fetchCategories();  // Шинэчлэгдсэн жагсаалтыг дахин татаж авах
        setOpenAdd(false);  // Категори нэмэх диалог хаах
      } else {
        console.error("Алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Холболтын алдаа:", error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((category) => category._id !== id));
        console.log("Категори амжилттай устгагдлаа.");
      } else {
        console.error("Устгах явцад алдаа гарлаа.");
      }
    } catch (err) {
      console.error("Категори устгах явцад алдаа гарлаа:", err);
    }
  };

  const updateCategory = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${selectedCategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),  // Шинэ нэрийг илгээж байна
      });

      if (res.ok) {
        console.log("Категори амжилттай шинэчлэгдлээ.");
        setOpenUpdate(false);  // Категори шинэчлэх диалог хаах
        fetchCategories();  // Шинэчлэгдсэн жагсаалтыг дахин татаж авах
      } else {
        console.error("Шинэчлэлтийн явцад алдаа гарлаа.");
      }
    } catch (err) {
      console.error("Шинэчлэлтийн алдаа:", err);
    }
  };

  const handleCategoryUpdate = (categoryId: string, currentName: string) => {
    setSelectedCategoryId(categoryId);  // Сонгогдсон категори ID-ийг хадгалах
    setUpdatedName(currentName);  // Сонгогдсон категориын нэрийг урьдчилан оруулна
    setOpenUpdate(true);  // Категори шинэчлэх диалог нээх
  };

  return (
    <div>
      <div className='flex justify-end'>
      {/* Категори нэмэх диалог */}
      <AlertDialog open={openAdd} onOpenChange={setOpenAdd}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="flex justify-center text-white bg-black hover:bg-white hover:text-black p-3 m-2 border rounded-lg">
            Категори нэмэх
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Нэмэх Категори</AlertDialogTitle>
            <Label htmlFor="category">Категори нэр</Label>
            <Input
              id="category"
              type="text"
              className="w-full pr-20"
              value={categoryName}  // Категори нэр
              onChange={(e) => setCategoryName(e.target.value)}  // Категори нэрийг шинэчлэх
            />
            <AlertDialogDescription>Шинэ категори нэмнэ үү.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={addCategory}>Нэмэх</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
      {/* Категори шинэчлэх диалог */}
      <AlertDialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Категори шинэчлэх</AlertDialogTitle>
            <Label htmlFor="updatedCategory">Категори нэр</Label>
            <Input
              id="updatedCategory"
              type="text"
              className="w-full pr-20"
              value={updatedName}  // Шинэ нэр
              onChange={(e) => setUpdatedName(e.target.value)}  // Шинэ нэрийг шинэчлэх
            />
            <AlertDialogDescription>Шинэ нэр оруулна уу.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={updateCategory}>Шинэчлэх</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Категори хүснэгт */}
      <Table>
        <TableCaption>Бүх категори</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  {/* Категори шинэчлэх */}
                  <IoPencilSharp size={17}
                    className="m-1 cursor-pointer"
                    onClick={() => handleCategoryUpdate(category._id, category.name)}  // Категориоыг шинэчлэх диалогт оруулах
                  />
                  {/* Категори устгах */}
                  <AlertDialog>
                <AlertDialogTrigger asChild>
                <MdDelete size={17} className="m-1 cursor-pointer"/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Энэ категориг устгах уу?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Үгүй</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCategory(category._id)}>Тийм</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
