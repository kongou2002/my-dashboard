"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { z } from "zod";

// Define Zod schema for the category form
const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  slug: z.string(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  initialData?: CategoryFormValues;
  onSubmit: (data: CategoryFormValues) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  open,
  setOpen,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });

  // Update the form values when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData); // Reset the form with initialData
    }
  }, [initialData, reset]);

  const handleCategorySubmit = (data: CategoryFormValues) => {
    data.slug = slugify(data.name);
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleCategorySubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter category name"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <Button type="submit">
              {initialData ? "Update Category" : "Save Category"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryForm;
