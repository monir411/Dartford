import { createPaymentSchema } from "@/lib/validators";
import { getPricingForVehicleClass } from "@/services/pricing.service";
import {
  createOrderRecord,
  getOrderById,
  getOrderByReference,
  getOrderByStripeSessionId,
  markOrderCancelled,
  markOrderPaid,
  updateOrderStripeSession,
} from "@/server";
import type { CreateOrderInput, VehicleClass } from "@/types";

const basePricing: Record<VehicleClass, number> = {
  CLASS_A: 250,
  CLASS_B: 300,
  CLASS_C: 350,
  CLASS_D: 600,
};

export function calculatePaymentAmount(input: CreateOrderInput) {
  return basePricing[input.class] * input.crossings;
}

export async function createPendingPayment(input: CreateOrderInput) {
  const validatedInput = createPaymentSchema.parse(input);
  const basePrice = await getPricingForVehicleClass(validatedInput.class);
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
