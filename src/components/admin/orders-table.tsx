import Link from "next/link";
import type { OrderRecord } from "@/types";

type OrdersTableProps = {
  orders: OrderRecord[];
};

function formatCurrency(amountPence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountPence / 100);
}

function formatOrderDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatVehicleType(value: string | null | undefined) {
  if (!value) {
    return "Vehicle";
  }

  return value === "HGV" ? "Lorry" : value.replace("_", " ");
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="divide-y divide-slate-200 md:hidden">
        {orders.length === 0 ? (
          <div className="px-4 py-6 text-sm text-slate-500">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {formatOrderDate(order.createdAt)}
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-950">
                    {order.reference}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {order.status}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    Vehicle
                  </p>
                  <p>{formatVehicleType(order.vehicleType)}</p>
                  <p className="text-xs text-slate-500">
                    {order.vehicleMake ?? "Unknown make"} •{" "}
                    {order.vehicleColour ?? "Unknown colour"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    Registration
                  </p>
                  <p>{order.registrationNumber}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    Email
                  </p>
                  <p className="break-all">{order.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    Price
                  </p>
                  <p>{formatCurrency(order.totalAmountPence)}</p>
                </div>
              </div>

              <Link
                href={`/admin/orders/${order.id}`}
                className="inline-flex text-sm font-medium text-slate-900 underline underline-offset-4"
              >
                View details
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Vehicle details</th>
              <th className="px-4 py-3 font-medium">Registration</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">View</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={8}>
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 text-slate-700">
                    {formatOrderDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {order.reference}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{formatVehicleType(order.vehicleType)}</div>
                    <div className="text-xs text-slate-500">
                      {order.vehicleMake ?? "Unknown make"} •{" "}
                      {order.vehicleColour ?? "Unknown colour"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.registrationNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{order.email}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {formatCurrency(order.totalAmountPence)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-slate-900 underline underline-offset-4"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
