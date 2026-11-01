import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { ORDER_STATUSES, eur, orderTotal, param } from '../data'
import type { Order, OrderStatus } from '../data'
import { Button, Card, PageHeader, StatusBadge } from '../ui'

export default function Orders({ orders, onStatusChange }: { orders: Order[]; onStatusChange: (id: string, s: OrderStatus) => void }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All')
  const [openId, setOpenId] = useState<string | null>(param('order'))

  const q = query.trim().toLowerCase()
  const visible = orders.filter(
    (o) => (filter === 'All' || o.status === filter) && (!q || `${o.id} ${o.customer} ${o.city}`.toLowerCase().includes(q)),
  )
  const selected = orders.find((o) => o.id === openId)

  return (
    <>
      <PageHeader title="Orders" subtitle={`${orders.length} orders · ${orders.filter((o) => o.status !== 'Delivered').length} open`} />

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-xl border border-stone-200 px-3 py-2">
            <Search size={16} className="text-stone-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customer, city or order number" className="w-full text-sm outline-none" />
          </label>
          {(['All', ...ORDER_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-xl px-3 py-2 text-sm ${filter === s ? 'bg-brand-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-stone-500">
            <tr className="border-b border-stone-200">
              <th className="py-2.5 font-medium">Order</th>
              <th className="font-medium">Customer</th>
              <th className="font-medium">Date</th>
              <th className="font-medium">Items</th>
              <th className="text-right font-medium">Total</th>
              <th className="pl-6 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id} onClick={() => setOpenId(o.id)} className="cursor-pointer border-b border-stone-100 hover:bg-brand-50/60">
                <td className="py-3 font-medium text-stone-900">{o.id}</td>
                <td>
                  <div className="text-stone-800">{o.customer}</div>
                  <div className="text-xs text-stone-500">{o.city}</div>
                </td>
                <td className="text-stone-600">{new Date(o.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                <td className="text-stone-600">{o.lines.reduce((n, l) => n + l.qty, 0)}</td>
                <td className="text-right font-medium text-stone-900">{eur(orderTotal(o))}</td>
                <td className="pl-6"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={6} className="py-10 text-center text-stone-500">No orders match your search.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {selected && (
        <div className="fixed inset-0 z-10 flex justify-end bg-stone-900/30" onClick={() => setOpenId(null)}>
          <div className="h-full w-[420px] overflow-y-auto bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="text-xs text-stone-500">{selected.id}</div>
                <h2 className="text-xl font-semibold text-stone-900">{selected.customer}</h2>
                <div className="text-sm text-stone-500">{selected.city}</div>
              </div>
              <button onClick={() => setOpenId(null)} className="rounded-lg p-1 text-stone-500 hover:bg-stone-100"><X size={18} /></button>
            </div>

            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Items</h3>
            <ul className="mb-4 divide-y divide-stone-100 rounded-xl border border-stone-200">
              {selected.lines.map((l) => (
                <li key={l.product} className="flex justify-between px-4 py-3 text-sm">
                  <span>{l.qty} × {l.product}</span>
                  <span className="font-medium">{eur(l.qty * l.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mb-8 flex justify-between text-sm font-semibold">
              <span>Total</span><span>{eur(orderTotal(selected))}</span>
            </div>

            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Status</h3>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((s) => (
                <Button key={s} variant={selected.status === s ? 'primary' : 'ghost'} onClick={() => onStatusChange(selected.id, s)}>{s}</Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
