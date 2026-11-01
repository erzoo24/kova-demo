import { useState } from 'react'
import { Coffee, LayoutDashboard, Package, ScanText, ShoppingCart } from 'lucide-react'
import { orders as initialOrders, param, stock as initialStock } from './data'
import type { Order, OrderStatus, StockItem } from './data'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import InvoiceImport from './pages/InvoiceImport'

type Page = 'dashboard' | 'orders' | 'inventory' | 'import'

const NAV: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'import', label: 'Invoice import', icon: ScanText },
]

const startPage = (param('page') as Page | null) ?? 'dashboard'

export default function App() {
  const [page, setPage] = useState<Page>(NAV.some((n) => n.id === startPage) ? startPage : 'dashboard')
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [stock, setStock] = useState<StockItem[]>(initialStock)

  const setStatus = (id: string, status: OrderStatus) =>
    setOrders((all) => all.map((o) => (o.id === id ? { ...o, status } : o)))

  const addStock = (additions: Record<string, number>) =>
    setStock((all) => all.map((s) => (additions[s.id] ? { ...s, stock: s.stock + additions[s.id] } : s)))

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col bg-brand-900 px-4 py-6 text-brand-100">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            <Coffee size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Kova Coffee</div>
            <div className="text-xs text-brand-100/70">Roasters · Berlin</div>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                page === id ? 'bg-white/10 font-medium text-white' : 'text-brand-100/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-white/5 px-3 py-3 text-xs text-brand-100/70">
          Demo with fictional data
        </div>
      </aside>

      <main className="flex-1 px-8 py-7">
        {page === 'dashboard' && <Dashboard orders={orders} stock={stock} onOpenOrders={() => setPage('orders')} />}
        {page === 'orders' && <Orders orders={orders} onStatusChange={setStatus} />}
        {page === 'inventory' && <Inventory stock={stock} onImport={() => setPage('import')} />}
        {page === 'import' && <InvoiceImport stock={stock} onAddStock={addStock} onDone={() => setPage('inventory')} />}
      </main>
    </div>
  )
}
