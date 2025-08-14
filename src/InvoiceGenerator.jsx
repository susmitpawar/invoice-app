import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FiTrash2, FiPlus, FiPrinter, FiDownload } from "react-icons/fi";
import "./InvoiceGenerator.css"; // <-- added CSS import

export default function InvoiceGenerator() {
  // Fixed company info
  const companyInfo = {
    name: "TOPFACE TECHNOLOGIES PVT. LTD.",
    tag1: "MICRO AUTHORIZED DEALER",
    tag2: "All Types Of Industrial Cutting Oils And Lubricants",
    tag3: "COOL™ Fluid Technology For Machining",
    address:
      "Ground Floor, G.No.627, Shed No.02, Kuruli, Pune Nashik Highway, Behind Omega Seiki Mobility Company, Pune",
    contact: "SACHIN CHAVAN - +91 9075095584",
    email: "topfacetechnologies@gmail.com",
    gstin: "27AAJCT2528E1ZD",
    state: "27-Maharashtra",
    bank: {
      name: "ICICI BANK LIMITED, PUNE - CHAKAN",
      account: "050805005273",
      ifsc: "ICIC0000508",
      holder: "Topface Technologies Pvt Ltd",
    },
  };

  // Buyer & Consignee
  const [buyer, setBuyer] = useState({
    name: "",
    address: "",
    contact: "",
    gstin: "",
    state: "",
  });
  const [consignee, setConsignee] = useState({
    name: "",
    address: "",
    contact: "",
    gstin: "",
    state: "",
  });

  // Invoice meta
  const [invoice, setInvoice] = useState({
    number: `INV-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
    date: new Date().toISOString().split("T")[0],
    mode: "",
    terms: "",
    buyerOrder: "",
  });

  // Items
  const [items, setItems] = useState([]);

  const addEmptyRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        description: "",
        hsn: "",
        qty: "",
        unit: "",
        rate: "",
        cgst: "",
        sgst: "",
      },
    ]);
  };

  const updateItem = (id, key, value) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [key]: value } : it))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const toNum = (v) => (v === "" || isNaN(Number(v)) ? 0 : Number(v));

  const computed = useMemo(() => {
    let subtotal = 0;
    let totalCGST = 0;
    let totalSGST = 0;

    const rows = items.map((it) => {
      const qty = toNum(it.qty);
      const rate = toNum(it.rate);
      const cgstP = toNum(it.cgst);
      const sgstP = toNum(it.sgst);

      const taxable = qty * rate;
      const cgstAmt = (taxable * cgstP) / 100;
      const sgstAmt = (taxable * sgstP) / 100;
      const lineTotal = taxable + cgstAmt + sgstAmt;

      subtotal += taxable;
      totalCGST += cgstAmt;
      totalSGST += sgstAmt;

      return { ...it, taxable, cgstAmt, sgstAmt, lineTotal };
    });

    const grandTotal = subtotal + totalCGST + totalSGST;
    return { rows, subtotal, totalCGST, totalSGST, grandTotal };
  }, [items]);

  const inWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
      "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
      "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const n = Math.round(num);
    if (n === 0) return "Zero Rupees only";

    const numToWords = (x) => {
      if (x < 20) return a[x];
      if (x < 100) return `${b[Math.floor(x / 10)]}${x % 10 ? " " + a[x % 10] : ""}`;
      if (x < 1000) return `${a[Math.floor(x / 100)]} Hundred${x % 100 ? " " + numToWords(x % 100) : ""}`;
      return "";
    };

    const crore = Math.floor(n / 10000000);
    const lakh = Math.floor((n / 100000) % 100);
    const thousand = Math.floor((n / 1000) % 100);
    const hundred = Math.floor((n / 100) % 10);
    const rest = n % 100;

    let str = "";
    if (crore) str += numToWords(crore) + " Crore ";
    if (lakh) str += numToWords(lakh) + " Lakh ";
    if (thousand) str += numToWords(thousand) + " Thousand ";
    if (hundred) str += a[hundred] + " Hundred ";
    if (rest) str += numToWords(rest) + " ";
    return (str + "Rupees only").replace(/\s+/g, " ").trim();
  };

  const currency = (n) => `₹${Number(n || 0).toFixed(2)}`;

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.text("Invoice PDF Coming Soon", 10, 10);
    doc.save(`${invoice.number}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white invoice-container">
        {/* Company header */}
        <div className="border-b p-4 text-center">
          <h1 className="text-xl font-extrabold text-blue-700">{companyInfo.name}</h1>
          <div className="text-sm font-semibold">{companyInfo.tag1}</div>
          <div className="text-xs">{companyInfo.tag2}</div>
          <div className="text-xs">{companyInfo.tag3}</div>
          <div className="text-xs mt-2">{companyInfo.address}</div>
          <div className="text-xs">{companyInfo.contact}</div>
          <div className="text-xs">{companyInfo.email}</div>
          <div className="text-xs">GST No: {companyInfo.gstin}</div>
        </div>

        {/* Rest of your existing JSX here (unchanged except borders now bold via CSS) */}
        {/* ... */}
      </div>
    </div>
  );
}
