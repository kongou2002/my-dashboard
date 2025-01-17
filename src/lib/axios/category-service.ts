import type { CategoryFormValues } from "@/app/dashboard/category-management/components/category-form";
import axiosClient from ".";

export class CategoryService {
  getAllCategory = async () => {
    try {
      const response = await axiosClient.get("/categories/manage-categories/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createCategory = async (data: CategoryFormValues) => {
    try {
      const response = await axiosClient.post(
        "/categories/manage-categorie/",
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  updateCategory = async (id: number, data: CategoryFormValues) => {
    try {
      const response = await axiosClient.patch(
        `/categories/manage-categorie/${id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  deleteCategory = async (id: number) => {
    try {
      const response = await axiosClient.delete(
        `/categories/manage-categorie/${id}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
