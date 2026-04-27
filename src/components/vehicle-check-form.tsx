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
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <label className="block text-left">
        <span className="text-sm font-semibold text-slate-800">
          Vehicle registration
        </span>

        <input
          id="hero-reg-input"
          type="text"
          value={reg}
          onChange={handleChange}
          placeholder="Enter registration number"
          maxLength={8}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`mt-3 h-14 w-full rounded-2xl border bg-white px-4 font-mono text-base font-semibold tracking-widest text-slate-900 outline-none transition placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:ring-4 ${
            checkState.status === "error"
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : reg && !isValid
                ? "border-amber-400 focus:border-amber-500 focus:ring-amber-500/10"
                : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/5"
          }`}
        />
      </label>

      {/* Inline validation hint */}
      {reg && !isValid && checkState.status !== "error" && (
        <p className="text-xs text-amber-600">
          This doesn&apos;t look like a valid UK registration. Please check and
          try again.
        </p>
      )}

      {/* API error */}
      {checkState.status === "error" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {checkState.message}
        </div>
      )}

      <button
        id="hero-check-vehicle-btn"
        type="submit"
        disabled={!isValid || isLoading}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 text-base font-semibold text-slate-950 shadow-[0_12px_24px_rgba(250,204,21,0.35)] transition hover:-translate-y-0.5 hover:bg-yellow-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {isLoading ? (
          <>
            {/* Simple CSS spinner — no extra deps */}
            <span
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950"
              aria-hidden="true"
            />
            Checking vehicle…
          </>
        ) : (
          "Check Vehicle"
        )}
      </button>
    </form>
  );
}
