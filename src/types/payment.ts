export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
export type VehicleClass = "CLASS_A" | "CLASS_B" | "CLASS_C" | "CLASS_D";
export type VehicleType = "CAR" | "VAN" | "MOTORHOME" | "BUS" | "HGV";

export type OrderRecord = {
  id: string;
  reference: string;
  registrationNumber: string;
  email: string;
  country: string;
  vehicleClass: VehicleClass;
  vehicleType?: VehicleType | null;
  vehicleMake?: string | null;
  vehicleColour?: string | null;
  crossings: number;
  totalAmountPence: number;
  currency: string;
  status: OrderStatus;
  stripeSessionId?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrderInput = {
  class: VehicleClass;
  crossings: number;
  country: string;
  registrationNumber: string;
  confirmRegistration: string;
  email: string;
  make: string;
  colour: string;
  vehicleType: VehicleType;
  termsAccepted: boolean;
};
