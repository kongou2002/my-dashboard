"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryService } from "@/lib/axios/category-service";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Category } from "../type";
import CategoryForm, { type CategoryFormValues } from "./category-form";

export default function CategoryTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );
  const categoryService = new CategoryService();

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    const result = await categoryService.getAllCategory();
    setCategories(result);
  };

  const handleCreateOrUpdate = async (data: CategoryFormValues) => {
    if (editingCategory) {
      // Update category
      await categoryService.updateCategory(editingCategory.id, data);
    } else {
      // Create category
      await categoryService.createCategory(data);
    }
    setEditingCategory(undefined);
    await fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await categoryService.deleteCategory(id);
    await fetchCategories();
  };

  const columns: ColumnDef<Category, keyof Category>[] = [
    {
      id: "name",
      header: "Category Name",
      cell: ({ row }) => row.original.name,
    },
    {
      id: "is_deleted",
      header: "Deleted",
      cell: ({ row }) => (
        <div>
          {row.original.is_deleted ? (
            <span className="text-red-500">Deleted</span>
          ) : (
            <span className="text-green-500">Active</span>
          )}
        </div>
      ),
    },
    {
      id: "slug",
      header: "Slug",
      cell: ({ row }) => row.original.slug,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(true);
              setEditingCategory(row.original);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(row.original.id)}
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
            Category Management
          </CardTitle>
          <div className="flex flex-wrap gap-4">
            <CategoryForm
              open={open}
              setOpen={setOpen}
              initialData={editingCategory || undefined}
              onSubmit={handleCreateOrUpdate}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={categories} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
