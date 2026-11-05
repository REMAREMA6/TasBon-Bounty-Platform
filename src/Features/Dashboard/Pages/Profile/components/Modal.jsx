import { X } from 'lucide-react'

/**
 * Reusable modal dialog.
 * - Backdrop click closes the modal.
 * - Esc key is not handled here — add it if you need keyboard dismiss.
 * - The close (X) button is rendered in the header.
 */
export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="modal-title" className="text-base font-bold text-slate-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
