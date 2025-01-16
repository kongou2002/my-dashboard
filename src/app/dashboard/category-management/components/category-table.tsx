"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductService } from "@/lib/axios/product-service";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "../../product-management/type";
import type { Category } from "../type";
import CategoryForm from "./category-form";

const InitialCategory: Category[] = [
  {
    id: 1,
    name: "Sample Product 1",
    is_delete: false,
    products: [] as Product[],
    slug: "asd",
  },
];

export default function CategoryTable() {
  const [Category] = useState<Category[]>(InitialCategory);
  const productService = new ProductService();
  useEffect(() => {
    productService.getAllProducts().then((result) => console.log(result));
  });

  const columns: ColumnDef<Category, keyof Category>[] = [
    {
      id: "name",
      header: "Category Name",
      cell: ({ row }) => row.original.name,
    },
    {
      id: "is_delete",
      header: "Delete",
      cell: ({ row }) => row.original.is_delete,
    },
    {
      id: "slug",
      header: "Slug",
      cell: ({ row }) => row.original.slug,
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
            <CategoryForm />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={Category} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
