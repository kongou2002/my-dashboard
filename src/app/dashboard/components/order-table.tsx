"use client";

import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderService } from "@/lib/axios/order-service";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Order } from "../type";
import { OrderDetailsDialog } from "./details";

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await OrderService.getOrderService();
      setOrders(result);
      setError(null);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
    setIsDialogOpen(false);
  };

  // Calculate summary statistics
  const totalOrders = orders.length;
  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.amount),
    0
  );
  const failedOrders = orders.filter(
    (order) => order.status === "failed"
  ).length;

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Number(amount));
  };

  const formatOrderId = (id: string) => {
    return id.slice(0, 8) + "..." + id.slice(-4);
  };

  const columns: ColumnDef<Order, keyof Order>[] = [
    {
      id: "order_uuid",
      header: "Order ID",
      cell: ({ row }) => (
        <button
          onClick={() => openDialog(row.original)}
          className="font-mono text-sm text-primary hover:underline"
        >
          {formatOrderId(row.original.order_uuid)}
        </button>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={status === "paid" ? "default" : "destructive"}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-mono">{formatCurrency(row.original.amount)}</span>
      ),
    },
  ];

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">
          View and manage your orders in one place
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20" />
            ) : (
              <div className="text-2xl font-bold">{totalOrders}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <div className="text-2xl font-bold">
                {formatCurrency(totalAmount)}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Orders</CardTitle>
            {failedOrders > 0 ? (
              <ArrowUp className="h-4 w-4 text-destructive" />
            ) : (
              <ArrowDown className="h-4 w-4 text-success" />
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{failedOrders}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <div className="rounded-md border">
              <DataTable columns={columns} data={orders} />
            </div>
          )}
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
