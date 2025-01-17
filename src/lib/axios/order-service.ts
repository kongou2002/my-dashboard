import axiosClient from ".";

export class OrderService {
  static async getOrderService() {
    try {
      const response = await axiosClient.get("/orders/manage-orders/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
