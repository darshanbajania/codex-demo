import { useEffect, useState } from 'react'
import api from '../api/client'

export default function BillingPage() {
  const [invoices, setInvoices] = useState([])
  useEffect(() => { api.get('invoices/me/').then((r) => setInvoices(r.data)) }, [])
  return (
    <div>
      <h2>Billing & Invoices</h2>
      {invoices.map((inv) => (
        <div key={inv.id} className='row'>
          <span>{inv.invoice_number}</span>
          <span>${inv.amount}</span>
          <span>{new Date(inv.issued_at).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  )
}
