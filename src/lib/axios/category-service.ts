import axiosClient from ".";

export class CategoryService {
  getAllCategory = async () => {
    try {
      const response = await axiosClient.get("/categories/manage-categories/");
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  };
}
