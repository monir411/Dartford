import { createPaymentSchema } from "@/lib/validators";
import { getPricingForVehicleType } from "@/services/pricing.service";
import {
  createOrderRecord,
  getOrderById,
  getOrderByReference,
  getOrderByStripeSessionId,
  markOrderCancelled,
  markOrderPaid,
  updateOrderStripeSession,
} from "@/server";
import type { CreateOrderInput } from "@/types";

export async function createPendingPayment(input: CreateOrderInput) {
  const validatedInput = createPaymentSchema.parse(input);
  const basePrice = await getPricingForVehicleType(validatedInput.vehicleType);
  const amountPence = basePrice * validatedInput.crossings;

  return createOrderRecord({
    ...validatedInput,
    totalAmountPence: amountPence,
  });
}

export async function attachStripeSessionToOrder(
  orderId: string,
  stripeSessionId: string,
) {
  return updateOrderStripeSession(orderId, stripeSessionId);
}

export async function findOrderByReference(reference: string) {
  return getOrderByReference(reference);
}

export async function completeOrder(orderId: string) {
  return markOrderPaid(orderId);
}

export async function cancelOrder(orderId: string) {
  return markOrderCancelled(orderId);
}

export async function findOrderById(orderId: string) {
  return getOrderById(orderId);
}

export async function findOrderBySessionId(sessionId: string) {
  return getOrderByStripeSessionId(sessionId);
}
