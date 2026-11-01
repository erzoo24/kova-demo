// All data is fictional and exists only for this demo.

export type OrderStatus = 'New' | 'Roasting' | 'Shipped' | 'Delivered'

export const ORDER_STATUSES: OrderStatus[] = ['New', 'Roasting', 'Shipped', 'Delivered']

export interface OrderLine {
  product: string
  qty: number
  price: number
}

export interface Order {
  id: string
  customer: string
  city: string
  date: string
  status: OrderStatus
  lines: OrderLine[]
}

export interface StockItem {
  id: string
  name: string
  kind: 'Green coffee' | 'Retail bag'
  origin: string
  stock: number
  unit: 'kg' | 'bags'
  reorderAt: number
  capacity: number
}

export interface InvoiceLine {
  stockId: string
  description: string
  qty: number
  unitPrice: number
}

export interface SupplierInvoice {
  file: string
  supplier: string
  number: string
  date: string
  lines: InvoiceLine[]
}

export const orders: Order[] = [
  { id: 'K-1048', customer: 'Café Lindgren', city: 'Berlin', date: '2026-11-01', status: 'New', lines: [{ product: 'House Espresso 1 kg', qty: 6, price: 24 }, { product: 'Ethiopia Filter 250 g', qty: 10, price: 9.5 }] },
  { id: 'K-1047', customer: 'Studio Nord Office', city: 'Hamburg', date: '2026-10-31', status: 'New', lines: [{ product: 'House Espresso 1 kg', qty: 4, price: 24 }] },
  { id: 'K-1046', customer: 'Bäckerei Hoffmann', city: 'Potsdam', date: '2026-10-31', status: 'Roasting', lines: [{ product: 'Brazil Crema 1 kg', qty: 8, price: 21 }] },
  { id: 'K-1045', customer: 'Mila & Co. Concept Store', city: 'Leipzig', date: '2026-10-30', status: 'Roasting', lines: [{ product: 'Gift Box Trio', qty: 12, price: 29 }, { product: 'Kenya AA 250 g', qty: 12, price: 11 }] },
  { id: 'K-1044', customer: 'Café Lindgren', city: 'Berlin', date: '2026-10-29', status: 'Shipped', lines: [{ product: 'House Espresso 1 kg', qty: 6, price: 24 }] },
  { id: 'K-1043', customer: 'Hotel Spreeblick', city: 'Berlin', date: '2026-10-28', status: 'Shipped', lines: [{ product: 'Colombia Huila 1 kg', qty: 10, price: 23 }, { product: 'Decaf Mexico 1 kg', qty: 3, price: 22 }] },
  { id: 'K-1042', customer: 'Kaffeebar Ostkreuz', city: 'Berlin', date: '2026-10-27', status: 'Delivered', lines: [{ product: 'House Espresso 1 kg', qty: 10, price: 24 }] },
  { id: 'K-1041', customer: 'Coworking Halle 7', city: 'Dresden', date: '2026-10-25', status: 'Delivered', lines: [{ product: 'Brazil Crema 1 kg', qty: 5, price: 21 }] },
  { id: 'K-1040', customer: 'Studio Nord Office', city: 'Hamburg', date: '2026-10-24', status: 'Delivered', lines: [{ product: 'House Espresso 1 kg', qty: 4, price: 24 }] },
  { id: 'K-1039', customer: 'Feinkost Brandt', city: 'Rostock', date: '2026-10-22', status: 'Delivered', lines: [{ product: 'Ethiopia Filter 250 g', qty: 24, price: 9.5 }, { product: 'Kenya AA 250 g', qty: 12, price: 11 }] },
  { id: 'K-1038', customer: 'Hotel Spreeblick', city: 'Berlin', date: '2026-10-21', status: 'Delivered', lines: [{ product: 'Colombia Huila 1 kg', qty: 10, price: 23 }] },
  { id: 'K-1037', customer: 'Café Lindgren', city: 'Berlin', date: '2026-10-20', status: 'Delivered', lines: [{ product: 'House Espresso 1 kg', qty: 6, price: 24 }] },
]

export const stock: StockItem[] = [
  { id: 'gc-eth', name: 'Ethiopia Yirgacheffe', kind: 'Green coffee', origin: 'Ethiopia', stock: 42, unit: 'kg', reorderAt: 30, capacity: 120 },
  { id: 'gc-col', name: 'Colombia Huila', kind: 'Green coffee', origin: 'Colombia', stock: 18, unit: 'kg', reorderAt: 30, capacity: 120 },
  { id: 'gc-bra', name: 'Brazil Cerrado', kind: 'Green coffee', origin: 'Brazil', stock: 96, unit: 'kg', reorderAt: 40, capacity: 180 },
  { id: 'gc-ken', name: 'Kenya AA', kind: 'Green coffee', origin: 'Kenya', stock: 25, unit: 'kg', reorderAt: 20, capacity: 80 },
  { id: 'gc-mex', name: 'Mexico Decaf', kind: 'Green coffee', origin: 'Mexico', stock: 9, unit: 'kg', reorderAt: 15, capacity: 60 },
  { id: 'rb-esp', name: 'House Espresso 1 kg', kind: 'Retail bag', origin: 'Blend', stock: 34, unit: 'bags', reorderAt: 20, capacity: 80 },
  { id: 'rb-eth', name: 'Ethiopia Filter 250 g', kind: 'Retail bag', origin: 'Ethiopia', stock: 61, unit: 'bags', reorderAt: 40, capacity: 150 },
  { id: 'rb-box', name: 'Gift Box Trio', kind: 'Retail bag', origin: 'Mixed', stock: 7, unit: 'bags', reorderAt: 10, capacity: 40 },
]

export const weeklyRevenue = [
  { week: 'W34', revenue: 1840 }, { week: 'W35', revenue: 2110 }, { week: 'W36', revenue: 1960 },
  { week: 'W37', revenue: 2380 }, { week: 'W38', revenue: 2290 }, { week: 'W39', revenue: 2650 },
  { week: 'W40', revenue: 2520 }, { week: 'W41', revenue: 2870 }, { week: 'W42', revenue: 3010 },
  { week: 'W43', revenue: 2940 }, { week: 'W44', revenue: 3320 },
]

export const sampleInvoices: SupplierInvoice[] = [
  {
    file: 'green-bean-traders_INV-20931.pdf',
    supplier: 'Green Bean Traders GmbH',
    number: 'INV-20931',
    date: '2026-10-30',
    lines: [
      { stockId: 'gc-col', description: 'Colombia Huila, washed, 69 kg sack', qty: 69, unitPrice: 7.8 },
      { stockId: 'gc-mex', description: 'Mexico Decaf (Swiss Water), 30 kg', qty: 30, unitPrice: 9.4 },
    ],
  },
  {
    file: 'origin-direct_2026-1187.pdf',
    supplier: 'Origin Direct Import',
    number: '2026-1187',
    date: '2026-10-27',
    lines: [
      { stockId: 'gc-eth', description: 'Ethiopia Yirgacheffe G1, 60 kg', qty: 60, unitPrice: 8.9 },
      { stockId: 'gc-ken', description: 'Kenya AA Nyeri, 30 kg', qty: 30, unitPrice: 10.2 },
    ],
  },
]

export const orderTotal = (o: Order) => o.lines.reduce((sum, l) => sum + l.qty * l.price, 0)

export const eur = (n: number, digits = n % 1 ? 2 : 0) =>
  n.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: digits, maximumFractionDigits: digits })

// Lets a link open a specific demo state, e.g. ?page=import&invoice=0 (used for portfolio screenshots).
export const param = (name: string) => new URLSearchParams(location.search).get(name)
