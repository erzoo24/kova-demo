import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Clock, Euro, PackageOpen, TriangleAlert } from 'lucide-react'
import { eur, orderTotal, weeklyRevenue } from '../data'
import type { Order, StockItem } from '../data'
import { Card, PageHeader, StatusBadge } from '../ui'

export default function Dashboard({ orders, stock, onOpenOrders }: { orders: Order[]; stock: StockItem[]; onOpenOrders: () => void }) {
  const open = orders.filter((o) => o.status !== 'Delivered')
  const sumWeeks = (from: number, to?: number) => weeklyRevenue.slice(from, to).reduce((sum, w) => sum + w.revenue, 0)
  const last4 = sumWeeks(-4)
  const prev4 = sumWeeks(-8, -4)
  const low = stock.filter((s) => s.stock <= s.reorderAt)

  const kpis = [
    { label: 'Open orders', value: String(open.length), hint: `${orders.filter((o) => o.status === 'New').length} new today`, icon: PackageOpen },
    { label: 'Revenue, 4 weeks', value: eur(last4), hint: `+${Math.round((last4 / prev4 - 1) * 100)}% vs. previous 4 weeks`, icon: Euro },
    { label: 'Low stock items', value: String(low.length), hint: low.map((s) => s.name.split(' ')[0]).join(', '), icon: TriangleAlert },
    { label: 'Avg. time to ship', value: '1.8 days', hint: 'Target: 2 days', icon: Clock },
  ]

  return (
    <>
      <PageHeader title="Good morning, Lena" subtitle="Here is what happens at the roastery today." />

      <div className="mb-6 grid grid-cols-4 gap-4">
        {kpis.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</div>
                <div className="mt-2 text-2xl font-semibold text-stone-900">{value}</div>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={18} />
              </div>
            </div>
            <div className="mt-2 truncate text-xs text-stone-500">{hint}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card title="Weekly revenue" className="col-span-3">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRevenue} margin={{ left: -10, right: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a0613a" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#a0613a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v: number) => `€${v / 1000}k`} />
                <Tooltip formatter={(v) => eur(Number(v))} />
                <Area type="monotone" dataKey="revenue" stroke="#8a4f2c" strokeWidth={2.5} fill="url(#rev)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card
          title="Latest orders"
          className="col-span-2"
          action={<button onClick={onOpenOrders} className="text-xs font-medium text-brand-600 hover:underline">View all</button>}
        >
          <ul className="divide-y divide-stone-100">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-sm font-medium text-stone-800">{o.customer}</div>
                  <div className="text-xs text-stone-500">{o.id} · {eur(orderTotal(o))}</div>
                </div>
                <StatusBadge status={o.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
