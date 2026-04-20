import { prisma } from "@/lib/prisma";
import { isMissingTableError } from "@/lib/db/safe-query";
import type { CreateOrderInput, OrderRecord } from "@/types";

function buildReference() {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DART-${stamp}-${random}`;
}

export async function createOrderRecord(
  input: CreateOrderInput & { totalAmountPence: number },
): Promise<OrderRecord> {
  try {
    return await prisma.order.create({
      data: {
        reference: buildReference(),
        registrationNumber: input.registrationNumber.trim().toUpperCase(),
        country: input.country,
        email: input.email,
        vehicleClass: input.class,
        vehicleType: input.vehicleType,
        vehicleMake: input.make,
        vehicleColour: input.colour,
        crossings: input.crossings,
        totalAmountPence: input.totalAmountPence,
      },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      throw new Error(
        "The database is not ready yet. Run the Prisma migration or db push to create the Order table.",
      );
    }

    throw error;
  }
}

export async function updateOrderStripeSession(
  orderId: string,
  stripeSessionId: string,
): Promise<OrderRecord> {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId },
  });
}

export async function markOrderPaid(orderId: string): Promise<OrderRecord> {
  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    throw new Error("Order not found.");
  }

  if (existingOrder.status === "PAID") {
    return existingOrder;
  }

  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
      paidAt: existingOrder.paidAt ?? new Date(),
    },
  });
}

export async function markOrderCancelled(orderId: string): Promise<OrderRecord> {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
}

export async function getOrderByReference(
  reference: string,
): Promise<OrderRecord | null> {
  return prisma.order.findUnique({
    where: { reference },
  });
}

export async function getOrderByStripeSessionId(
  stripeSessionId: string,
): Promise<OrderRecord | null> {
  return prisma.order.findUnique({
    where: { stripeSessionId },
  });
}

export async function getOrderById(orderId: string): Promise<OrderRecord | null> {
  try {
    return await prisma.order.findUnique({
      where: { id: orderId },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return null;
    }

    throw error;
  }
}

export async function listPayments(): Promise<OrderRecord[]> {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw error;
  }
}
