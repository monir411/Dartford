"use client";

import { useState } from "react";
import type { VehicleClass } from "@/types";

const classOptions = [
  { value: "CLASS_A", label: "Class A" },
  { value: "CLASS_B", label: "Class B" },
  { value: "CLASS_C", label: "Class C" },
  { value: "CLASS_D", label: "Class D" },
] as const;

const vehicleTypeOptions = [
  { value: "CAR", label: "Car" },
  { value: "VAN", label: "Van" },
  { value: "MOTORHOME", label: "Motorhome" },
  { value: "BUS", label: "Bus" },
  { value: "HGV", label: "HGV" },
] as const;

function formatCurrency(amountPence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountPence / 100);
}

type PaymentFormProps = {
  pricing: Record<VehicleClass, number>;
};

export function PaymentForm({ pricing }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    class: "CLASS_A",
    crossings: "1",
    country: "United Kingdom",
    registrationNumber: "",
    confirmRegistration: "",
    email: "",
    make: "",
    colour: "",
    vehicleType: "CAR",
    termsAccepted: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount =
    pricing[formData.class as VehicleClass] *
    Number(formData.crossings || "1");

  const fieldClassName =
    "mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-slate-950";

  function updateField(name: string, value: string | boolean) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          crossings: Number(formData.crossings),
        }),
      });

      const payload = (await response.json()) as
        | { ok: true; checkoutUrl: string }
        | { ok: false; error: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.ok ? "Unable to continue to payment." : payload.error);
      }

      window.location.href = payload.checkoutUrl;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to continue to payment.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Class
          <select
            value={formData.class}
            onChange={(event) => updateField("class", event.target.value)}
            className={fieldClassName}
            name="class"
          >
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-800">
          Crossings
          <select
            value={formData.crossings}
            onChange={(event) => updateField("crossings", event.target.value)}
            className={fieldClassName}
            name="crossings"
          >
            <option value="1">1 crossing</option>
            <option value="2">2 crossings</option>
            <option value="3">3 crossings</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-800">
        Country
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={(event) => updateField("country", event.target.value)}
          className={fieldClassName}
          placeholder="Enter country"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Registration number
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={(event) =>
              updateField("registrationNumber", event.target.value.toUpperCase())
            }
            className={fieldClassName}
            placeholder="Enter registration number"
          />
        </label>

        <label className="block text-sm font-medium text-slate-800">
          Confirm registration
          <input
            type="text"
            name="confirmRegistration"
            value={formData.confirmRegistration}
            onChange={(event) =>
              updateField("confirmRegistration", event.target.value.toUpperCase())
            }
            className={fieldClassName}
            placeholder="Re-enter registration number"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-800">
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={fieldClassName}
          placeholder="Enter email address"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-800">
          Make
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={(event) => updateField("make", event.target.value)}
            className={fieldClassName}
            placeholder="Enter vehicle make"
          />
        </label>

        <label className="block text-sm font-medium text-slate-800">
          Colour
          <input
            type="text"
            name="colour"
            value={formData.colour}
            onChange={(event) => updateField("colour", event.target.value)}
            className={fieldClassName}
            placeholder="Enter vehicle colour"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-800">
        Vehicle type
        <select
          value={formData.vehicleType}
          onChange={(event) => updateField("vehicleType", event.target.value)}
          className={fieldClassName}
          name="vehicleType"
        >
          {vehicleTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={(event) => updateField("termsAccepted", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300"
          name="termsAccepted"
        />
        <span>
          I confirm the vehicle and payment details are correct and I agree to the
          terms.
        </span>
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Total</span>
          <span className="text-2xl font-semibold text-slate-950">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary h-12 w-full rounded-xl px-4 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Redirecting to Stripe..." : "Continue to payment"}
      </button>
    </form>
  );
}
