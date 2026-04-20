import { updateContentAction } from "@/app/admin/actions";
import type { HomepageContent } from "@/types";

type ContentFormProps = {
  content: HomepageContent;
  saved?: boolean;
};

export function ContentForm({ content, saved = false }: ContentFormProps) {
  return (
    <form action={updateContentAction} className="space-y-6">
      {saved ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Homepage content updated.
        </div>
      ) : null}

      <label className="block rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-800">
        Homepage title
        <input
          name="homepageTitle"
          defaultValue={content.homepageTitle}
          className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4"
        />
      </label>

      <label className="block rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-800">
        Homepage description
        <textarea
          name="homepageDescription"
          defaultValue={content.homepageDescription}
          rows={3}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">
            <input
              type="checkbox"
              name="whoNeedsToPayVisible"
              defaultChecked={content.whoNeedsToPayVisible}
            />
            Show "Who needs to pay" section
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-800">
            Who needs to pay title
            <input
              name="whoNeedsToPayTitle"
              defaultValue={content.whoNeedsToPayTitle}
              className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-800">
            Who needs to pay body
            <textarea
              name="whoNeedsToPayBody"
              defaultValue={content.whoNeedsToPayBody}
              rows={7}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </label>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">
            <input
              type="checkbox"
              name="whenToPayVisible"
              defaultChecked={content.whenToPayVisible}
            />
            Show "When to pay" section
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-800">
            When to pay title
            <input
              name="whenToPayTitle"
              defaultValue={content.whenToPayTitle}
              className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-4"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-800">
            When to pay body
            <textarea
              name="whenToPayBody"
              defaultValue={content.whenToPayBody}
              rows={7}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
      >
        Save content
      </button>
    </form>
  );
}
