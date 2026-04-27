import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

export type VehicleCheckResult = {
  registrationNumber: string;
  make: string;
  colour: string;
  fuelType: string;
  yearOfManufacture: number | null;
  motStatus: string | null;
  taxStatus: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { registrationNumber?: string };
    const registration = (body.registrationNumber ?? "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    if (!registration) {
      return NextResponse.json(
        { ok: false, error: "Registration number is required." },
        { status: 400 },
      );
    }

    const dvlaResponse = await fetch(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.VICHECL_CHECK_API,
        },
        body: JSON.stringify({ registrationNumber: registration }),
      },
    );

    if (dvlaResponse.status === 404) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No vehicle found for this registration. Please check the number and try again.",
        },
        { status: 404 },
      );
    }

    if (!dvlaResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to retrieve vehicle details at this time. Please try again.",
        },
        { status: dvlaResponse.status },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await dvlaResponse.json()) as Record<string, any>;

    const result: VehicleCheckResult = {
      registrationNumber: data.registrationNumber ?? registration,
      make: data.make ?? "",
      colour: data.colour ?? "",
      fuelType: data.fuelType ?? "",
      yearOfManufacture: data.yearOfManufacture ?? null,
      motStatus: data.motStatus ?? null,
      taxStatus: data.taxStatus ?? null,
    };

    return NextResponse.json({ ok: true, vehicle: result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
