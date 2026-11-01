import type { ReactNode } from 'react'
import type { OrderStatus } from './data'

export function Card({ title, action, children, className = '' }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-700">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <header className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">{title}</h1>
        <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      </div>
      {action}
    </header>
  )
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  New: 'bg-sky-50 text-sky-700 ring-sky-200',
  Roasting: 'bg-amber-50 text-amber-700 ring-amber-200',
  Shipped: 'bg-violet-50 text-violet-700 ring-violet-200',
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${STATUS_STYLE[status]}`}>{status}</span>
}

export function Button({ children, onClick, variant = 'primary', disabled }: { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'ghost'; disabled?: boolean }) {
  const style =
    variant === 'primary'
      ? 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-stone-300'
      : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
  return (
    <button onClick={onClick} disabled={disabled} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${style}`}>
      {children}
    </button>
  )
}
