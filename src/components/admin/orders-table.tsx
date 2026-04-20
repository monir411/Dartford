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

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
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
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "medium",
                    }).format(new Date(order.createdAt))}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {order.reference}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{order.vehicleType?.replace("_", " ") ?? "Vehicle"}</div>
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
