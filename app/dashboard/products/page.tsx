'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdDelete, MdSearch } from 'react-icons/md'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function ProductsPage() {
  interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image?: string; // Зураг байхгүй байж болно
}
  const [open, setOpen] = useState(false);
  const [productMNName, setProductMNName] = useState(""); // Монгол нэр
  const [productCHName, setProductCHName] = useState(""); // Хятад нэр
  const [productENName, setProductENName] = useState(""); // Англи нэр
  const [productImg, setProductImg] = useState<File | null>(null);
  const [productPrice, setProductPrice] = useState(""); // Үнэ
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [categoryValue, setCategoryValue] = useState("");  // Сонгосон категорийн утга
  const [products, setProducts] = useState<{ _id: string; name: string; category: string; price: number; image: File }[]>([]);
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImg(e.target.files[0]); // Зураг файл хадгалах
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
  
      // Хариу авахдаа бүх хариултыг шалгах
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text(); // Текст хариу аваад шалга
        throw new Error(`Серверээс ирсэн хариу: ${text}`);
      }
  
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Бүтээгдэхүүн авахад алдаа гарлаа:", error);
    }
  };
  
  
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Өгөгдлийг авах явцад алдаа гарлаа:", err);
    }
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", productMNName);
    formData.append("category", categoryValue);
    formData.append("mn_name", productMNName);
    formData.append("ch_name", productCHName);
    formData.append("en_name", productENName);
    formData.append("price", productPrice);
    if (productImg) {
      formData.append("image", productImg);
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData, // JSON биш FormData ашиглана
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
      }
  
      console.log("Бүтээгдэхүүн амжилттай нэмэгдлээ:", data);
      fetchProducts();
    } catch (error) {
      console.error("Алдаа:", error);
    }
  };
  
  
  

  return (
    <div>
      <div className='flex justify-between w-full'>
        <div className='flex items-center bg-amber-500 p-2 m-2 rounded-lg w-full'>
          <div className='flex items-center w-full max-w-[300px]'>
            <MdSearch className="text-white m-1"/>
            <input 
              type="text" 
              placeholder='Search ...' 
              className='bg-transparent border-none text-white placeholder-amber-400 focus:outline-none w-full' 
            />
          </div>
        </div>
        
        {/* Product нэмэх диалог */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex justify-center text-white bg-black hover:bg-white hover:text-black p-3 m-2 border rounded-lg">
              Product нэмэх
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Нэмэх Product</AlertDialogTitle>
              <div className="">
                <Label htmlFor="category">Бүтээгдэхүүний төрөл</Label>
                <Select value={categoryValue} onValueChange={(value) => setCategoryValue(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((category)=>(
                        <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label htmlFor="productMN">Бүтээгдэхүүний Монгол нэр</Label>
                <Input
                  id="productMN"
                  type="text"
                  className="w-full pr-20"
                  value={productMNName}
                  onChange={(e) => setProductMNName(e.target.value)}
                />

                <Label htmlFor="productCH">Бүтээгдэхүүний Хятад нэр</Label>
                <Input
                  id="productCH"
                  type="text"
                  className="w-full pr-20"
                  value={productCHName}
                  onChange={(e) => setProductCHName(e.target.value)}
                />

                <Label htmlFor="productEN">Бүтээгдэхүүний Англи нэр</Label>
                <Input
                  id="productEN"
                  type="text"
                  className="w-full pr-20"
                  value={productENName}
                  onChange={(e) => setProductENName(e.target.value)}
                />

                <div>
                      <Label htmlFor="productImg">Зураг</Label>
                      <Input
                        id="productImg"
                        type="file" // Зураг авах input
                        className="w-full pr-20"
                        onChange={handleImageChange} // Зураг сонгогдсон үед ажиглах
                      />
                      {productImg && (
                        <div>
                          <p>Зураг сонгогдсон: {productImg.name}</p>
                          {/* Зургийн урт, нэр гэх мэт мэдээлэл гаргах */}
                        </div>
                      )}
                    </div>

                <Label htmlFor="productPrice">Бүтээгдэхүүний үнэ</Label>
                <Input
                  id="productPrice"
                  type="text"
                  className="w-full pr-20"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <AlertDialogDescription>Шинэ бүтээгдэхүүн нэмнэ үү.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Буцах</AlertDialogCancel>
            <AlertDialogAction onClick={addProduct}>Нэмэх</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Table>
  <TableCaption>Таны бүтээгдэхүүнүүд</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>Нэр</TableHead>
      <TableHead>Зураг</TableHead>
      <TableHead>Категори</TableHead>
      <TableHead className="text-right">Үнэ</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products.map((product, index) => (
      <TableRow key={product._id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>
          <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-16 h-16 object-cover" />
        </TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell className="text-right">{product.price}₮</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  )
}
