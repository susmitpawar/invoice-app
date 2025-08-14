import React, { useState } from "react";
import "./App.css";

export default function App() {
  // Company Information
  const [companyInfo, setCompanyInfo] = useState({
    name: "TOPCFACE TECHNOLOGIES PVT. LTD.",
    tagline: "All Types Of Industrial Cutting Oils And Lubricants",
    address: "GT No 627/3, Behind Omega Seiki Mobility Company, Kuruli, Pune",
    phone: "+91 90750 95584",
    email: "topfacetechnologies@gmail.com",
    additionalTagline: "Fluid Technology For Machining",
    gstin: "29AABCT1234D1ZE",
    state: "29-Karnataka",
    cin: "U72900KA2010PTC123456"
  });

  // Invoice Details
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "115",
    date: "14-08-2025",
    placeOfSupply: "27-Maharashtra",
  });

  // Bill To Information
  const [billTo, setBillTo] = useState({
    name: "PreciGem Dental World",
    address: "301, Sai Iconic Tower, Opp Kokilaben Hospital",
    address2: "Four Banglow, Lakhwandala Road, Andheri(W), Mumbai-400053",
    phone: "9028197536",
    state: "27-Maharashtra",
    gstin: ""
  });

  // Bank Details
  const [bankDetails, setBankDetails] = useState({
    name: "ICICI Bank",
    accountNo: "050805005273",
    branch: "CHAKAN Branch",
    ifsc: "ICIC000508",
    accountType: "Current"
  });

  // Items List
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Online Service Charges (XPS OPG Unit Online service charges)",
      hsn: "9033",
      mrp: 2000,
      quantity: 1,
      unit: "Nos",
      price: 2500,
      gst: 18,
    },
  ]);

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    if (["quantity", "price", "mrp", "gst"].includes(field)) {
      newItems[index][field] = Number(value);
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      { 
        id: items.length + 1,
        name: "", 
        hsn: "", 
        mrp: 0, 
        quantity: 1, 
        unit: "Nos", 
        price: 0, 
        gst: 18 
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Calculate amount for each item
  const calculateAmount = (item) => {
    const subtotal = item.price * item.quantity;
    const gstAmount = (subtotal * item.gst) / 100;
    return subtotal + gstAmount;
  };

  // Calculate totals
  const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gstTotal = items.reduce((acc, item) => acc + ((item.price * item.quantity * item.gst) / 100), 0);
  const total = subTotal + gstTotal;

  // Convert number to words
  const numberToWords = (num) => {
    // Simplified implementation - you might want to use a library for full functionality
    const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    if (num === 0) return "Zero";
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
    
    return num.toString();
  };

  // Print invoice
  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoiceDetails.invoiceNo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .company-info h2 { margin: 0 0 5px 0; color: #333; }
            .bill-invoice { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .bill-to, .invoice-details { width: 48%; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals { text-align: right; margin-top: 20px; }
            .footer { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #333; }
            .signature { width: 200px; text-align: center; margin-top: 50px; }
            .signature-line { border-top: 1px solid #000; width: 200px; margin: 0 auto; }
            @media print { body { -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="company-info">
                <h2>${companyInfo.name}</h2>
                <p>${companyInfo.tagline}</p>
                <p>${companyInfo.address}</p>
                <p>Phone: ${companyInfo.phone} | Email: ${companyInfo.email}</p>
                <p>GSTIN: ${companyInfo.gstin} | State: ${companyInfo.state}</p>
                <p>CIN: ${companyInfo.cin}</p>
              </div>
              <div>
                <h1>TAX INVOICE</h1>
              </div>
            </div>

            <div class="bill-invoice">
              <div class="bill-to">
                <h3>Bill To</h3>
                <p><strong>${billTo.name}</strong></p>
                <p>${billTo.address}</p>
                <p>${billTo.address2}</p>
                <p>Phone: ${billTo.phone}</p>
                <p>State: ${billTo.state}</p>
                ${billTo.gstin ? `<p>GSTIN: ${billTo.gstin}</p>` : ''}
              </div>
              <div class="invoice-details">
                <h3>Invoice Details</h3>
                <p>Invoice No.: <strong>${invoiceDetails.invoiceNo}</strong></p>
                <p>Date: ${invoiceDetails.date}</p>
                <p>Place of Supply: ${invoiceDetails.placeOfSupply}</p>
              </div>
            </div>

            <table class="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>HSN/SAC</th>
                  <th>MRP</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price/Unit</th>
                  <th>GST%</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.hsn}</td>
                    <td>₹${item.mrp.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>${item.gst}%</td>
                    <td>₹${calculateAmount(item).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <p>Sub Total: ₹${subTotal.toFixed(2)}</p>
              <p>GST Total: ₹${gstTotal.toFixed(2)}</p>
              <p><strong>Total: ₹${total.toFixed(2)}</strong></p>
              <p>Amount in Words: ${numberToWords(Math.round(total))} Rupees Only</p>
            </div>

            <div class="footer">
              <div class="bank-details">
                <h4>Bank Details</h4>
                <p>Bank Name: ${bankDetails.name}</p>
                <p>A/c No.: ${bankDetails.accountNo}</p>
                <p>Branch & IFSC: ${bankDetails.branch} & ${bankDetails.ifsc}</p>
                <p>Account Type: ${bankDetails.accountType}</p>
              </div>
              <div class="signature">
                <p>For ${companyInfo.name}</p>
                <div class="signature-line"></div>
                <p>Authorized Signatory</p>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="app-container">
      <div className="controls">
        <h1>Invoice Generator</h1>
        <button onClick={printInvoice}>Print Invoice</button>
      </div>

      <div className="editable-invoice">
        {/* Company Info Editor */}
        <div className="section">
          <h2>Company Information</h2>
          <div className="form-group">
            <label>Company Name:</label>
            <input 
              type="text" 
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Tagline:</label>
            <input 
              type="text" 
              value={companyInfo.tagline}
              onChange={(e) => setCompanyInfo({...companyInfo, tagline: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input 
              type="text" 
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input 
              type="text" 
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="text" 
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Additional Tagline:</label>
            <input 
              type="text" 
              value={companyInfo.additionalTagline}
              onChange={(e) => setCompanyInfo({...companyInfo, additionalTagline: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>GSTIN:</label>
            <input 
              type="text" 
              value={companyInfo.gstin}
              onChange={(e) => setCompanyInfo({...companyInfo, gstin: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input 
              type="text" 
              value={companyInfo.state}
              onChange={(e) => setCompanyInfo({...companyInfo, state: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>CIN:</label>
            <input 
              type="text" 
              value={companyInfo.cin}
              onChange={(e) => setCompanyInfo({...companyInfo, cin: e.target.value})}
            />
          </div>
        </div>

        {/* Bill To Editor */}
        <div className="section">
          <h2>Bill To</h2>
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              value={billTo.name}
              onChange={(e) => setBillTo({...billTo, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input 
              type="text" 
              value={billTo.address}
              onChange={(e) => setBillTo({...billTo, address: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Address 2:</label>
            <input 
              type="text" 
              value={billTo.address2}
              onChange={(e) => setBillTo({...billTo, address2: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input 
              type="text" 
              value={billTo.phone}
              onChange={(e) => setBillTo({...billTo, phone: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <input 
              type="text" 
              value={billTo.state}
              onChange={(e) => setBillTo({...billTo, state: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>GSTIN (optional):</label>
            <input 
              type="text" 
              value={billTo.gstin}
              onChange={(e) => setBillTo({...billTo, gstin: e.target.value})}
            />
          </div>
        </div>

        {/* Invoice Details Editor */}
        <div className="section">
          <h2>Invoice Details</h2>
          <div className="form-group">
            <label>Invoice No:</label>
            <input 
              type="text" 
              value={invoiceDetails.invoiceNo}
              onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNo: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              value={invoiceDetails.date}
              onChange={(e) => setInvoiceDetails({...invoiceDetails, date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Place of Supply:</label>
            <input 
              type="text" 
              value={invoiceDetails.placeOfSupply}
              onChange={(e) => setInvoiceDetails({...invoiceDetails, placeOfSupply: e.target.value})}
            />
          </div>
        </div>

        {/* Bank Details Editor */}
        <div className="section">
          <h2>Bank Details</h2>
          <div className="form-group">
            <label>Bank Name:</label>
            <input 
              type="text" 
              value={bankDetails.name}
              onChange={(e) => setBankDetails({...bankDetails, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Account No:</label>
            <input 
              type="text" 
              value={bankDetails.accountNo}
              onChange={(e) => setBankDetails({...bankDetails, accountNo: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Branch:</label>
            <input 
              type="text" 
              value={bankDetails.branch}
              onChange={(e) => setBankDetails({...bankDetails, branch: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>IFSC Code:</label>
            <input 
              type="text" 
              value={bankDetails.ifsc}
              onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Account Type:</label>
            <input 
              type="text" 
              value={bankDetails.accountType}
              onChange={(e) => setBankDetails({...bankDetails, accountType: e.target.value})}
            />
          </div>
        </div>

        {/* Items Editor */}
        <div className="section">
          <h2>Invoice Items</h2>
          <button onClick={addItem}>Add Item</button>
          <table className="items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>HSN/SAC</th>
                <th>MRP</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price</th>
                <th>GST%</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input 
                      type="text" 
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={item.hsn}
                      onChange={(e) => handleItemChange(index, 'hsn', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={item.mrp}
                      onChange={(e) => handleItemChange(index, 'mrp', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={item.gst}
                      onChange={(e) => handleItemChange(index, 'gst', e.target.value)}
                    />
                  </td>
                  <td>₹{calculateAmount(item).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Preview */}
        <div className="section">
          <h2>Invoice Totals</h2>
          <div className="totals-preview">
            <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
            <p>GST Total: ₹{gstTotal.toFixed(2)}</p>
            <p><strong>Grand Total: ₹{total.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}