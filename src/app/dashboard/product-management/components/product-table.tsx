"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryService } from "@/lib/axios/category-service";
import { ProductService } from "@/lib/axios/product-service";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Category } from "../../category-management/type";
import type { Product } from "../type";
import ProductForm, { type ProductSchema } from "./product-form";

// ProductDashboard.tsx

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const productService = new ProductService();
  const categoryService = new CategoryService();

  useEffect(() => {
    productService.getAllProducts().then((result) => setProducts(result));
    categoryService.getAllCategory().then((result) => setCategories(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const handleCreateProduct = async (product: ProductSchema) => {
    try {
      await productService.createProduct(product);
      setRefetch(!refetch);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleUpdateProduct = async (product: ProductSchema) => {
    try {
      if (!selectedProduct) return; // Prevent update if no product is selected
      await productService.updateProduct(selectedProduct.id, product);
      setRefetch(!refetch);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleEditClick = (product: Product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEditClick(row.original)} // Pass selected product to form
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                const result = await productService.deleteProduct(
                  row.original.id
                );
                console.log(result);
                setRefetch(!refetch);
              } catch (errors) {
                console.log(errors);
              }
            }}
          >
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
            <Button
              className="bg-black hover:bg-opacity-80"
              onClick={() => {
                setSelectedProduct(null);
                setOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={products} />
          </div>
        </CardContent>
      </Card>
      <ProductForm
        setOpen={setOpen}
        open={open}
        initialData={selectedProduct || undefined} // Pass the selected product for editing
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        categoryList={categories}
      />
    </div>
  );
}
