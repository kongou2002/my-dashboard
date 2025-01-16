"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

// Define Zod schema for the category form
const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  slug: z.string().nonempty("Slug is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });

  const handleCategorySubmit = (data: CategoryFormValues) => {
    console.log("Category Data:", data);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        <Pencil className="mr-2 h-4 w-4" />
        Manage Categories
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add/Edit Category</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={categoryForm.handleSubmit(handleCategorySubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                {...categoryForm.register("name")}
                placeholder="Enter category name"
              />
              <p className="text-red-500 text-sm">
                {categoryForm.formState.errors.name?.message}
              </p>
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                {...categoryForm.register("slug")}
                placeholder="Enter slug"
              />
              <p className="text-red-500 text-sm">
                {categoryForm.formState.errors.slug?.message}
              </p>
            </div>
            <Button type="submit">Save Category</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryForm;
