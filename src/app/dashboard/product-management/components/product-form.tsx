"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Plus } from "lucide-react";

// Zod schema for product validation
const productSchema = z.object({
  images: z.array(z.object({ image: z.string().url("Invalid URL") })),
  name: z.string().nonempty("Product name is required"),
  price: z.string().nonempty("Price is required"),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  slug: z.string().nonempty("Slug is required"),
  category: z.number().min(1, "Category ID is required"),
});

export type ProductSchema = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductSchema;
  onSubmit: (data: ProductSchema) => void;
}

const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      images: [{ image: "" }],
      name: "",
      price: "",
      description: "",
      quantity: 0,
      slug: "",
      category: 0,
    },
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.reset(); // Reset the form when closing the modal
  };

  const handleFormSubmit = (data: ProductSchema) => {
    onSubmit(data);
    handleModalClose(); // Close modal after submission
  };

  return (
    <>
      <Button
        className="bg-black hover:bg-black hover:bg-opacity-80"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Product
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Product Name"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.name?.message}
              </p>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <Input
                id="price"
                {...form.register("price")}
                placeholder="Product Price"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.price?.message}
              </p>
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <Input
                id="quantity"
                type="number"
                {...form.register("quantity", { valueAsNumber: true })}
                placeholder="Quantity"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.quantity?.message}
              </p>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                type="number"
                {...form.register("category", { valueAsNumber: true })}
                placeholder="Category ID"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.category?.message}
              </p>
            </div>
            <div>
              <label htmlFor="images">Image URL</label>
              <Input
                id="images"
                {...form.register("images.0.image")}
                placeholder="Image URL"
              />
              <p className="text-red-500 text-sm">
                {form.formState.errors.images?.[0]?.image?.message}
              </p>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Product Description"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">
                {initialData ? "Update Product" : "Add Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductForm;
