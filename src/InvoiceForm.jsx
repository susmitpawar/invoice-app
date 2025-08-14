import React, { useState } from 'react'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function InvoiceForm(){
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState([{ description: '', qty: 1, price: 0 }])
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')

  function addItem(){
    setItems([...items, { description: '', qty: 1, price: 0 }])
  }

  function updateItem(i, field, value){
    const copy = items.slice();
    copy[i][field] = field === 'qty' || field === 'price' ? Number(value) : value;
    setItems(copy);
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const payload = { customer_name: customer, date: new Date().toISOString(), items };
    try{
      const res = await fetch(`${API}/api/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.pdf) setPdfUrl(`${API}${data.pdf}`)
    }catch(err){
      console.error(err);
      alert('Error creating invoice')
    }finally{ setLoading(false) }
  }

  const total = items.reduce((s, it) => s + (it.qty * it.price), 0)

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <label>
        Customer name
        <input value={customer} onChange={e=>setCustomer(e.target.value)} required />
      </label>

      <div className="items">
        {items.map((it, idx) => (
          <div className="item" key={idx}>
            <input placeholder="Description" value={it.description} onChange={e=>updateItem(idx,'description', e.target.value)} required />
            <input type="number" min="1" value={it.qty} onChange={e=>updateItem(idx,'qty', e.target.value)} />
            <input type="number" step="0.01" value={it.price} onChange={e=>updateItem(idx,'price', e.target.value)} />
          </div>
        ))}
      </div>

      <button type="button" onClick={addItem}>Add item</button>

      <div className="total">Total: ₹ {total.toFixed(2)}</div>

      <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate PDF'}</button>

      {pdfUrl && (
        <div className="pdf">
          <a href={pdfUrl} target="_blank" rel="noreferrer">Open generated PDF</a>
        </div>
      )}
    </form>
  )
}
