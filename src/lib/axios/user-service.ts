import type { UserSchema } from "@/app/dashboard/user-management/components/user-form";
import axiosClient from ".";
import { UserServer } from "@/app/dashboard/user-management/type";

// export class UserService {
export async function getAllUsers() {
  try {
    const response = await axiosClient.get<UserServer[]>(
      "accounts/manage-accounts"
    );
    console.log("🚀 ~ UserService ~ getAllUsers ~ response:", response.data);

    return response.data;
  } catch (error) {
    console.log("🚀 ~ UserService ~ getAllUsers ~ error:", error);
  }
}

export async function getProductById(userID: string) {
  try {
    const response = await axiosClient.get(
      `/accounts/manage-account/${userID}`
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ UserService ~ getProductById ~ error:", error);
    // throw new Error(`Error fetching product with ID ${userID}: ${error}`);
  }
}

export async function createUser(userData: UserSchema) {
  try {
    const response = await axiosClient.post("/accounts/register/", userData);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ UserService ~ createUser ~ error:", error);
    // throw new Error(`Error creating product: ${error}`);
  }
}

// export async function updateProduct(productId: string, productData: ProductSchema) {
//   try {
//     const response = await axiosClient.patch(
//       `/products/${productId}`,
//       productData
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error(`Error updating product with ID ${productId}: ${error}`);
//   }
// }

export async function deleteUser(userID: number) {
  try {
    const response = await axiosClient.delete(
      `/accounts/manage-account/${userID}/`
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ UserService ~ deleteUser ~ error:", error);
    // throw new Error(`Error deleting product with ID ${userID}: ${error}`);
  }
}
// }
