'use client'
import { useParams } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//import router, { useRouter } from 'next/router';
  
interface Product {
  _id: string;
  name: string;
  en_name:string;
  ch_name:string;  
  category: string;
  price: number;
  image: string;
}

export default function ProductDetailPage() {
    const [open, setOpen] = useState(false);
  const { id } = useParams();
  const productId = typeof id === "string" ? id : id?.[0]; // `id`-г аюулгүй хөрвүүлэх
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productMNName, setProductMNName] = useState(""); // Монгол нэр
    const [productCHName, setProductCHName] = useState(""); // Хятад нэр
    const [productENName, setProductENName] = useState(""); // Англи нэр
    const [productImg, setProductImg] = useState<File | null>(null);
    const [productPrice, setProductPrice] = useState("");
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    fetchCategories();
    fetchProduct();
  }, [productId]);
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/products/${productId}`);
      if (!res.ok) {
        const errorText = await res.text(); // Серверээс ирсэн алдааны хариу
        throw new Error(`Алдаа: ${res.status} - ${errorText}`);
      }
      const data: Product = await res.json();
      console.log("Fetched product:", data); // 🛠 Алдаа шалгах
        console.log("MNname:", data.name);
        console.log("ENname:", data.en_name);
        console.log("CHname:", data.ch_name);
      setProduct(data);
    } catch (error) {
      console.error("Бүтээгдэхүүний мэдээлэл авахад алдаа гарлаа:", error);
      setError(error instanceof Error ? error.message : "Тодорхойгүй алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };
  const updateProduct = async () => {
    const data = {
      name: productMNName,
      category: categoryValue,
      mn_name: productMNName,
      ch_name: productCHName,
      en_name: productENName,
      price: productPrice,
      image: productImg ? productImg : null,
    };
  
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
        console.log(res.status); // Статус код шалгах
        console.log(await res.json()); // Хариуны бие шалгах
      if (!res.ok) throw new Error('Өөрчлөлт хийхэд алдаа гарлаа');
      fetchProduct();
      setOpen(false);
    } catch (err) {
      console.error('Өөрчлөх явцад алдаа гарлаа:', err);
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setProductImg(e.target.files[0]); // Зураг файл хадгалах
      }
    };
  if (loading) return <div>Ачаалж байна...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!product) return <div>Бүтээгдэхүүн олдсонгүй.</div>;

  return (
    <div>
        <div className='flex justify-end'>
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex justify-center text-white bg-black hover:bg-white hover:text-black p-3 m-2 border rounded-lg">
                    Product өөрчлөх
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Бүтээгдэхүүн өөрчлөх</AlertDialogTitle>               
                        <Label htmlFor="category">Бүтээгдэхүүний төрөл</Label>
                            <Select value={categoryValue} onValueChange={(value) => setCategoryValue(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={product.category} />
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
                          placeholder={product.name}
                          value={productMNName}
                          onChange={(e) => setProductMNName(e.target.value)}
                        />
                        <Label htmlFor="productCH">Бүтээгдэхүүний Хятад нэр</Label>
                        <Input
                          id="productCH"
                          type="text"
                          className="w-full pr-20"
                          placeholder={product.ch_name}
                          value={productCHName}
                          onChange={(e) => setProductCHName(e.target.value)}
                        />
                        <Label htmlFor="productEN">Бүтээгдэхүүний Англи нэр</Label>
                        <Input
                          id="productEN"
                          type="text"
                          className="w-full pr-20"
                          placeholder={product.en_name}
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
                          type="number"
                          className="w-full pr-20"
                          placeholder={product.name}
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                    <AlertDialogDescription>Шинэ бүтээгдэхүүн нэмнэ үү.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Буцах</AlertDialogCancel>
                    <AlertDialogAction onClick={updateProduct}>Өөрчлөх</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
        <div className="flex justify-center m-5 p-20 ">
    <div className="max-w-md md:min-w-[600px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 p-6">
        <div className="flex items-center gap-10">
            {/* Зургийн хэсэг */}
            <div className="flex-shrink-0 m-5 p-4">
                <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-cover rounded-lg shadow-sm"
                />
            </div>

            {/* Текстийн хэсэг */}
            <div className="flex flex-col justify-center space-y-2 m-5 p-15">
                <h1 className="font-bold text-2xl text-gray-900">{product.name}</h1>
                <h2 className="text-gray-600 text-sm">{product.ch_name}</h2>
                <h2 className="text-gray-600 text-sm">{product.en_name}</h2>
                <div className="mt-4">
                    <span className="font-semibold text-lg text-gray-500 italic">Үнэ: </span>
                    <span className='p-2'>{product.price}₮</span>
                    </div>
                    <div>
                    <span className="font-semibold text-lg text-gray-500 italic">Категори:                   
                    </span>
                    <span className='p-2'>{product.category}</span>
                </div>
            </div>
        </div>
    </div>
</div>

    </div>
  );
}
