import type { ProductSchema } from "@/app/dashboard/product-management/components/product-form";
import axiosClient from ".";

export class ProductService {
  async getAllProducts() {
    try {
      const response = await axiosClient.get("products/manage-products");
      return response.data;
    } catch (error) {
      console.log("🚀 ~ ProductService ~ getAllProducts ~ error:", error);
      // throw new Error(`Error fetching products: ${error}`);
    }
  }

  async getProductById(productId: string) {
    try {
      const response = await axiosClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ ProductService ~ getProductById ~ error:", error);
      // throw new Error(`Error fetching product with ID ${productId}: ${error}`);
    }
  }

  async createProduct(productData: ProductSchema) {
    try {
      const response = await axiosClient.post("/products", productData);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ ProductService ~ createProduct ~ error:", error);
      // throw new Error(`Error creating product: ${error}`);
    }
  }

  async updateProduct(productId: string, productData: ProductSchema) {
    try {
      const response = await axiosClient.patch(
        `/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log("🚀 ~ ProductService ~ updateProduct ~ error:", error);
      // throw new Error(`Error updating product with ID ${productId}: ${error}`);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const response = await axiosClient.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ ProductService ~ deleteProduct ~ error:", error);
      // throw new Error(`Error deleting product with ID ${productId}: ${error}`);
    }
  }
}
