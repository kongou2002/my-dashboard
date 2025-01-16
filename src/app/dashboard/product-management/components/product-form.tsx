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
import { Trash } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { z } from "zod";
import type { Category } from "../../category-management/type";

// Zod schema for product validation
const productSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  price: z.string().nonempty("Price is required"),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  slug: z.string(),
  category: z.any(),
  images: z.array(
    z.object({
      image: z.string(),
    })
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductSchema; // Expecting the product data for editing
  onSubmit: (data: ProductSchema) => void;
  categoryList: Category[]; // Expecting an array of categories

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductForm = ({
  initialData,
  onSubmit,
  categoryList,
  open,
  setOpen,
}: ProductFormProps) => {
  const [uploading, setUploading] = useState(false);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || "",
      description: initialData?.description || "",
      quantity: initialData?.quantity || 0,
      slug: initialData?.slug || "",
      category: initialData?.category?.id || 0, // Ensure category is properly set
      images: initialData?.images || [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        quantity: initialData.quantity,
        slug: initialData.slug,
        category: initialData.category?.id || 0,
        images: initialData.images || [],
      });
    }
  }, [initialData, form]);

  const handleModalClose = () => {
    setOpen(false);
    form.reset(); // Reset the form on close
  };

  const handleFormSubmit = (data: ProductSchema) => {
    // Ensure category is a number before submitting
    const updatedData = {
      ...data,
      slug: slugify(data.name), // Create slug from product name
      category: data.category, // Category is already a number
    };
    onSubmit(updatedData); // Pass updated data to parent component
    handleModalClose(); // Close the modal after submission
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-dashboard");
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    try {
      setUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const currentImages = form.getValues("images");
      form.setValue("images", [...currentImages, { image: data.secure_url }]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = form
      .getValues("images")
      .filter((_, i) => i !== index);
    form.setValue("images", updatedImages);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "price", label: "Price", type: "text" },
              {
                id: "quantity",
                label: "Quantity",
                type: "number",
                options: { valueAsNumber: true },
              },
              {
                id: "category",
                label: "Category",
                type: "select",
              },
            ].map(({ id, label, type, options }) => (
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                {type === "select" ? (
                  <select
                    id={id}
                    {...form.register(id as keyof ProductSchema, options)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categoryList.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={initialData?.category?.id === category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={id}
                    type={type}
                    {...form.register(id as keyof ProductSchema, options)}
                    placeholder={label}
                  />
                )}
                <p className="text-red-500 text-sm">
                  {form.formState.errors[
                    id as keyof ProductSchema
                  ]?.message?.toString()}
                </p>
              </div>
            ))}
            <div>
              <label htmlFor="images">Images</label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
              {uploading && <p>Uploading...</p>}
              <div className="mt-2 space-y-2">
                {form.getValues("images").map((img, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CldImage
                      src={img.image}
                      width="100"
                      height="100"
                      alt={`Uploaded Image ${index + 1}`}
                      crop="fill"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-red-500 text-white"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
              <Button disabled={uploading}>
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
