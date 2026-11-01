import { useState } from 'react'
import { Check, ScanText, TriangleAlert } from 'lucide-react'
import type { StockItem } from '../data'
import { Button, Card, PageHeader } from '../ui'

export default function Inventory({ stock, onImport }: { stock: StockItem[]; onImport: () => void }) {
  const [requested, setRequested] = useState<string[]>([])

  const section = (kind: StockItem['kind']) => (
    <Card title={kind === 'Green coffee' ? 'Green coffee' : 'Retail products'}>
      <div className="divide-y divide-stone-100">
        {stock.filter((s) => s.kind === kind).map((s) => {
          const low = s.stock <= s.reorderAt
          const pct = Math.min(100, Math.round((s.stock / s.capacity) * 100))
          return (
            <div key={s.id} className="flex items-center gap-6 py-3.5">
              <div className="w-56">
                <div className="text-sm font-medium text-stone-900">{s.name}</div>
                <div className="text-xs text-stone-500">{s.origin} · reorder at {s.reorderAt} {s.unit}</div>
              </div>
              <div className="flex-1">
                <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
                  <div className={`h-full rounded-full ${low ? 'bg-rose-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="w-24 text-right text-sm font-semibold text-stone-900">{s.stock} {s.unit}</div>
              <div className="w-40 text-right">
                {requested.includes(s.id) ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700"><Check size={14} /> Reorder requested</span>
                ) : low ? (
                  <button onClick={() => setRequested((r) => [...r, s.id])} className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100">
                    <TriangleAlert size={13} /> Reorder
                  </button>
                ) : (
                  <span className="text-xs text-stone-400">In stock</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle="Live stock levels instead of the old spreadsheet."
        action={<Button onClick={onImport}><ScanText size={16} /> Import supplier invoice</Button>}
      />
      <div className="flex flex-col gap-4">
        {section('Green coffee')}
        {section('Retail bag')}
      </div>
    </>
  )
}
