"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VehicleCheckResult } from "@/app/api/vehicle-check/route";

/** UK registration regex: covers all modern formats (new-style, old-style, dateless, etc.) */
const UK_REG_REGEX =
  /^([A-Z]{2}[0-9]{2}[A-Z]{3}|[A-Z][0-9]{1,3}[A-Z]{3}|[A-Z]{3}[0-9]{1,3}[A-Z]|[0-9]{1,4}[A-Z]{1,3}|[A-Z]{1,3}[0-9]{1,4}|[A-Z]{2}[0-9]{2,3}[A-Z]|[A-Z][0-9]{1,4})$/;

function isValidUkReg(reg: string): boolean {
  return UK_REG_REGEX.test(reg.replace(/\s/g, "").toUpperCase());
}

function formatReg(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

type CheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

export function VehicleCheckForm() {
  const router = useRouter();
  const [reg, setReg] = useState("");
  const [checkState, setCheckState] = useState<CheckState>({ status: "idle" });

  const cleaned = formatReg(reg);
  const isValid = isValidUkReg(cleaned);
  const isLoading = checkState.status === "loading";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckState({ status: "idle" });
    setReg(formatReg(event.target.value));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isLoading) return;

    setCheckState({ status: "loading" });

    try {
      const response = await fetch("/api/vehicle-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber: cleaned }),
      });

      const payload = (await response.json()) as
        | { ok: true; vehicle: VehicleCheckResult }
        | { ok: false; error: string };

      if (!payload.ok) {
        setCheckState({ status: "error", message: payload.error });
        return;
      }

      // Encode vehicle data as URL search params and navigate to payment page
      const params = new URLSearchParams({
        reg: payload.vehicle.registrationNumber,
        make: payload.vehicle.make,
        colour: payload.vehicle.colour,
        fuelType: payload.vehicle.fuelType,
        year: payload.vehicle.yearOfManufacture?.toString() ?? "",
        motStatus: payload.vehicle.motStatus ?? "",
        taxStatus: payload.vehicle.taxStatus ?? "",
      });

      router.push(`/payment?${params.toString()}`);
    } catch {
      setCheckState({
        status: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <form className="mx-auto max-w-xl w-[95%] sm:w-full" onSubmit={handleSubmit} noValidate>
      <div className="relative flex flex-row items-center bg-white/70 backdrop-blur-xl rounded-full border border-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <label htmlFor="hero-reg-input" className="sr-only">Vehicle Registration</label>
        <input
          id="hero-reg-input"
          type="text"
          value={reg}
          onChange={handleChange}
          placeholder="Vehicle Registration"
          maxLength={8}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`flex-1 w-full bg-transparent h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-lg font-medium outline-none placeholder:text-slate-600 ${
            checkState.status === "error"
              ? "text-red-600"
              : reg && !isValid
                ? "text-amber-600"
                : "text-slate-900"
          }`}
        />
        <button
          id="hero-check-vehicle-btn"
          type="submit"
          disabled={!isValid || isLoading}
          className="flex h-12 sm:h-14 items-center justify-center gap-2 rounded-full bg-[#0052cc] px-5 sm:px-8 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#0047b3] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {isLoading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" aria-hidden="true" />
              Checking…
            </>
          ) : (
            "Check Vehicle"
          )}
        </button>
      </div>

      {/* Inline validation hint */}
      {reg && !isValid && checkState.status !== "error" && (
        <p className="mt-3 text-sm text-amber-600 text-center font-medium">
          This doesn't look like a valid UK registration.
        </p>
      )}

      {/* API error */}
      {checkState.status === "error" && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
          {checkState.message}
        </div>
      )}
    </form>
  );
}
