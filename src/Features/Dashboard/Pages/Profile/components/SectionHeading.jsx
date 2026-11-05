/**
 * Small section heading with an optional action on the right
 * (e.g. "View all →").
 */
export default function SectionHeading({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      {action}
    </div>
  )
}
