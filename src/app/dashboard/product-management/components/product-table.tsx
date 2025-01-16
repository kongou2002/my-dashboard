"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductService } from "@/lib/axios/product-service";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "../type";
import ProductForm from "./product-form";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 100.0,
    quantity: 10,
    image: "https://unsplash.com/photos/N7XodRrbzS0",
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 200.0,
    quantity: 5,
    image: "https://unsplash.com/photos/LNRyGwIJr5c",
  },
];

export default function ProductDashboard() {
  const [products] = useState<Product[]>(initialProducts);
  const productService = new ProductService();
  useEffect(() => {
    productService.getAllProducts().then((result) => console.log(result));
  });

  const columns: ColumnDef<Product, keyof Product>[] = [
    {
      id: "name",
      header: "Product Name",
      cell: ({ row }) => row.original.name,
    },
    {
      id: "price",
      header: "Price",
      cell: ({ row }) => row.original.price,
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: ({ row }) => row.original.quantity,
    },
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={50}
          height={50}
        />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <Button variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 w-screen">
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="text-2xl font-bold">
            Product Management
          </CardTitle>
          <div className="flex flex-wrap gap-4">
            <ProductForm onSubmit={() => console.log("asd")} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={products} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
