/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "../type";

interface OrderDetailsProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  selectedOrder: Order | null; // Replace with your order type
}

export function OrderDetailsDialog({
  isDialogOpen,
  closeDialog,
  selectedOrder,
}: OrderDetailsProps) {
  if (!selectedOrder) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Order Details
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 pr-4">
            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="font-mono text-sm">
                  {selectedOrder.order_uuid}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={
                    selectedOrder.status === "failed"
                      ? "destructive"
                      : "default"
                  }
                >
                  {selectedOrder.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {formatCurrency(parseInt(selectedOrder.amount))}
                </span>
              </div>
            </div>

            <Separator />

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Additional Information
              </h3>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Description
                  </label>
                  <p className="mt-1">{selectedOrder.description}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Content
                  </label>
                  <p className="mt-1">{selectedOrder.content}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Payment Method
                  </label>
                  <p className="mt-1 capitalize">{selectedOrder.method}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Notes</label>
                  <p className="mt-1">{selectedOrder.notes}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Products
              </h3>
              <div className="grid gap-6">
                {selectedOrder.order_details.map((detail) => (
                  <div key={detail.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{detail.productId.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {detail.productId.category.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(parseInt(detail.price))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Qty: {detail.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {detail.productId.images.map((image) => (
                        <div
                          key={image.id}
                          className="aspect-square overflow-hidden rounded-lg"
                        >
                          <img
                            src={image.image || "/placeholder.svg"}
                            alt={`${detail.productId.name} preview`}
                            className="h-full w-full object-cover transition-transform hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
