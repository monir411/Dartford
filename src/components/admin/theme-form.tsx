import { updateThemeAction } from "@/app/admin/actions";
import type { ThemeConfig } from "@/types";

type ThemeFormProps = {
  theme: ThemeConfig;
  saved?: boolean;
};

export function ThemeForm({ theme, saved = false }: ThemeFormProps) {
  return (
    <form action={updateThemeAction} className="space-y-6">
      {saved ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Theme updated.
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-800">
          Primary color
          <input
            type="color"
            name="primaryColor"
            defaultValue={theme.primaryColor}
            className="mt-3 h-12 w-full rounded-xl border border-slate-300 bg-white px-2"
          />
        </label>
        <label className="block rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-800">
          Button color
          <input
            type="color"
            name="buttonColor"
            defaultValue={theme.buttonColor}
            className="mt-3 h-12 w-full rounded-xl border border-slate-300 bg-white px-2"
          />
        </label>
        <label className="block rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-800">
          Background color
          <input
            type="color"
            name="backgroundColor"
            defaultValue={theme.backgroundColor}
            className="mt-3 h-12 w-full rounded-xl border border-slate-300 bg-white px-2"
          />
        </label>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-medium text-slate-800">Preview</p>
        <div
          className="mt-4 rounded-2xl border p-5"
          style={{
            backgroundColor: theme.backgroundColor,
            borderColor: "#e2e8f0",
          }}
        >
          <p style={{ color: theme.primaryColor }} className="text-lg font-semibold">
            Sample heading
          </p>
          <button
            type="button"
            className="mt-4 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: theme.buttonColor,
              color: theme.primaryColor,
            }}
          >
            Sample button
          </button>
        </div>
      </div>
      <button type="submit" className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold">
        Save theme
      </button>
    </form>
  );
}
