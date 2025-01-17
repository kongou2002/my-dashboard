"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderService } from "@/lib/axios/order-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Order } from "../type";
import { OrderDetailsDialog } from "./details";

export default function OrderTable() {
  const [order, setOrder] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const result = await OrderService.getOrderService();
    setOrder(result);
  };

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<Order, keyof Order>[] = [
    {
      id: "order_uuid",
      header: "Order ID",
      cell: ({ row }) => (
        <button
          onClick={() => openDialog(row.original)} // Open the dialog on click
          className="text-blue-500 underline"
        >
          {row.original.order_uuid}
        </button>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => row.original.status,
    },
    {
      id: "amount",
      header: "Amount",
      cell: ({ row }) => row.original.amount,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 w-screen">
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="text-2xl font-bold">Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <DataTable columns={columns} data={order} />
          </div>
        </CardContent>
      </Card>

      <OrderDetailsDialog
        closeDialog={closeDialog}
        isDialogOpen={isDialogOpen}
        selectedOrder={selectedOrder}
      />
    </div>
  );
}
