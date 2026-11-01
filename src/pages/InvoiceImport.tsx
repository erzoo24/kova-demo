import { useEffect, useState } from 'react'
import { Check, FileText, Sparkles } from 'lucide-react'
import { eur, param, sampleInvoices } from '../data'
import type { StockItem, SupplierInvoice } from '../data'
import { Button, Card, PageHeader } from '../ui'

type Step = 'pick' | 'reading' | 'review' | 'done'

const READ_STEPS = ['Reading document', 'Detecting supplier and invoice number', 'Extracting line items', 'Matching items to inventory']

export default function InvoiceImport({ stock, onAddStock, onDone }: { stock: StockItem[]; onAddStock: (a: Record<string, number>) => void; onDone: () => void }) {
  const preset = sampleInvoices[Number(param('invoice'))]
  const [step, setStep] = useState<Step>(preset ? 'review' : 'pick')
  const [invoice, setInvoice] = useState<SupplierInvoice | null>(preset ?? null)
  const [progress, setProgress] = useState(0)

  // Simulated extraction: in a real project this is the call to the AI model.
  useEffect(() => {
    if (step !== 'reading') return
    if (progress >= READ_STEPS.length) {
      setStep('review')
      return
    }
    const t = setTimeout(() => setProgress((p) => p + 1), 650)
    return () => clearTimeout(t)
  }, [step, progress])

  const start = (inv: SupplierInvoice) => {
    setInvoice(inv)
    setProgress(0)
    setStep('reading')
  }

  const confirm = () => {
    if (!invoice) return
    onAddStock(Object.fromEntries(invoice.lines.map((l) => [l.stockId, l.qty])))
    setStep('done')
  }

  const nameOf = (id: string) => stock.find((s) => s.id === id)?.name ?? id

  return (
    <>
      <PageHeader title="Invoice import" subtitle="Drop a supplier invoice. AI reads it and updates your stock — no more typing." />

      {step === 'pick' && (
        <Card>
          <div className="rounded-2xl border-2 border-dashed border-brand-100 bg-brand-50/50 px-6 py-10 text-center">
            <Sparkles className="mx-auto mb-3 text-brand-500" size={28} />
            <div className="font-medium text-stone-800">Drop a PDF invoice here</div>
            <div className="mb-6 text-sm text-stone-500">or pick one of the sample invoices below</div>
            <div className="mx-auto flex max-w-xl flex-col gap-2">
              {sampleInvoices.map((inv) => (
                <button key={inv.file} onClick={() => start(inv)} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left hover:border-brand-500">
                  <FileText size={20} className="text-brand-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-800">{inv.file}</div>
                    <div className="text-xs text-stone-500">{inv.supplier}</div>
                  </div>
                  <span className="text-xs font-medium text-brand-600">Import</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 'reading' && invoice && (
        <Card>
          <div className="mx-auto max-w-md py-8">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="animate-pulse text-brand-500" size={22} />
              <div className="font-medium text-stone-800">Analysing {invoice.file}</div>
            </div>
            <ul className="flex flex-col gap-3">
              {READ_STEPS.map((label, i) => (
                <li key={label} className={`flex items-center gap-3 text-sm ${i < progress ? 'text-stone-800' : i === progress ? 'text-brand-600' : 'text-stone-400'}`}>
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${i < progress ? 'bg-emerald-500 text-white' : 'bg-stone-100'}`}>
                    {i < progress && <Check size={12} />}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {step === 'review' && invoice && (
        <Card title="Extracted data — please review" action={<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"><Sparkles size={12} /> 98% confidence</span>}>
          <div className="mb-5 grid grid-cols-3 gap-4 text-sm">
            <div><div className="text-xs text-stone-500">Supplier</div><div className="font-medium">{invoice.supplier}</div></div>
            <div><div className="text-xs text-stone-500">Invoice number</div><div className="font-medium">{invoice.number}</div></div>
            <div><div className="text-xs text-stone-500">Date</div><div className="font-medium">{new Date(invoice.date).toLocaleDateString('en-GB')}</div></div>
          </div>
          <table className="mb-5 w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-stone-500">
              <tr className="border-b border-stone-200">
                <th className="py-2 font-medium">Invoice line</th>
                <th className="font-medium">Matched item</th>
                <th className="text-right font-medium">Qty</th>
                <th className="text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lines.map((l) => (
                <tr key={l.stockId} className="border-b border-stone-100">
                  <td className="py-3 text-stone-700">{l.description}</td>
                  <td><span className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{nameOf(l.stockId)}</span></td>
                  <td className="text-right">{l.qty} kg</td>
                  <td className="text-right font-medium">{eur(l.qty * l.unitPrice, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setStep('pick')}>Cancel</Button>
            <Button onClick={confirm}><Check size={16} /> Add to inventory</Button>
          </div>
        </Card>
      )}

      {step === 'done' && invoice && (
        <Card>
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={24} /></div>
            <div className="text-lg font-semibold text-stone-900">Stock updated</div>
            <div className="mb-6 text-sm text-stone-500">
              {invoice.lines.map((l) => `+${l.qty} kg ${nameOf(l.stockId)}`).join(' · ')}
            </div>
            <Button onClick={onDone}>Go to inventory</Button>
          </div>
        </Card>
      )}
    </>
  )
}
