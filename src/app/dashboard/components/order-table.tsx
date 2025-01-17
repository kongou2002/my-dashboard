"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderService } from "@/lib/axios/order-service";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Order } from "../type";

export default function OrderTable() {
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await OrderService.getOrderService();
    setOrder(result);
  };

  const columns: ColumnDef<Order, keyof Order>[] = [
    {
      id: "order_uuid",
      header: "Order ID",
      cell: ({ row }) => row.original.order_uuid,
    },
    // {
    //   id: "is_deleted",
    //   header: "Deleted",
    //   cell: ({ row }) => (
    //     <div>
    //       {row.original. ? (
    //         <span className="text-red-500">Deleted</span>
    //       ) : (
    //         <span className="text-green-500">Active</span>
    //       )}
    //     </div>
    //   ),
    // },
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
    </div>
  );
}
