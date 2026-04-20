import type { OrderRecord } from "@/types";

type OrderDetailCardProps = {
  order: OrderRecord;
};

function formatCurrency(amountPence: number, currency: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountPence / 100);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-slate-200 py-3 first:border-t-0 first:pt-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-950">{value}</span>
    </div>
  );
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-slate-950">Order summary</h3>
        <div className="mt-4">
          <DetailRow label="Reference" value={order.reference} />
          <DetailRow label="Status" value={order.status} />
          <DetailRow
            label="Price"
            value={formatCurrency(order.totalAmountPence, order.currency)}
          />
          <DetailRow label="Created" value={formatDate(order.createdAt)} />
          <DetailRow
            label="Paid at"
            value={order.paidAt ? formatDate(order.paidAt) : "Not paid"}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-slate-950">Vehicle and contact</h3>
        <div className="mt-4">
          <DetailRow label="Email" value={order.email} />
          <DetailRow label="Registration" value={order.registrationNumber} />
          <DetailRow label="Country" value={order.country} />
          <DetailRow label="Vehicle class" value={order.vehicleClass.replace("_", " ")} />
          <DetailRow
            label="Vehicle type"
            value={order.vehicleType?.replace("_", " ") ?? "Not set"}
          />
          <DetailRow label="Make" value={order.vehicleMake ?? "Not set"} />
          <DetailRow label="Colour" value={order.vehicleColour ?? "Not set"} />
          <DetailRow label="Crossings" value={String(order.crossings)} />
        </div>
      </div>
    </div>
  );
}
