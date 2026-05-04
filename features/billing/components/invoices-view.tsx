'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Send, Download, Plus, DollarSign, Calendar } from 'lucide-react';
import { invoices, getInvoiceStats } from '@/lib/db/billing-data';
import type { Invoice } from '@/lib/pcdc-types';
import { InvoiceStatus } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function InvoicesView() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const stats = getInvoiceStats();

  const getStatusBadge = (status: InvoiceStatus) => {
    const config: Record<InvoiceStatus, { label: string; color: string }> = {
      [InvoiceStatus.DRAFT]: { label: 'Draft', color: 'bg-muted text-muted-foreground' },
      [InvoiceStatus.SENT]: { label: 'Sent', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
      [InvoiceStatus.PAID]: { label: 'Paid', color: 'bg-success/20 text-success border-success/30' },
      [InvoiceStatus.OVERDUE]: { label: 'Overdue', color: 'bg-danger/20 text-danger border-danger/30' },
      [InvoiceStatus.PARTIALLY_PAID]: { label: 'Partial', color: 'bg-warning/20 text-warning border-warning/30' },
      [InvoiceStatus.CANCELLED]: { label: 'Cancelled', color: 'bg-muted' },
    };
    const { label, color } = config[status];
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Management</h1>
          <p className="mt-2 text-muted-foreground">Generate, send, and track invoices</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <DollarSign className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">${stats.totalInvoiced}</p>
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">${stats.totalPaid}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2">
                <DollarSign className="size-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">${stats.totalOutstanding}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-2">
                <FileText className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Invoice #</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Due Date</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Paid</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Balance</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/50">
                    <td className="py-4 font-medium text-foreground">{invoice.invoiceNumber}</td>
                    <td className="py-4 text-foreground">{invoice.issueDate.toLocaleDateString()}</td>
                    <td className="py-4 text-foreground">{invoice.dueDate.toLocaleDateString()}</td>
                    <td className="py-4 text-right font-semibold text-foreground">${invoice.totalAmount}</td>
                    <td className="py-4 text-right text-success">${invoice.paidAmount}</td>
                    <td className="py-4 text-right text-danger">${invoice.outstandingAmount}</td>
                    <td className="py-4 text-center">{getStatusBadge(invoice.status)}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowPreview(true);
                          }}
                        >
                          <Eye className="size-3" />
                        </Button>
                        {invoice.status === InvoiceStatus.DRAFT && (
                          <Button size="sm" variant="secondary">
                            <Send className="size-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="secondary">
                          <Download className="size-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview Modal */}
      {showPreview && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Invoice Preview</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{selectedInvoice.invoiceNumber}</p>
                </div>
                <Button variant="secondary" onClick={() => setShowPreview(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header */}
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">Pioneer Coaching Centre</h3>
                  <p className="text-sm text-muted-foreground">123 Education Street</p>
                  <p className="text-sm text-muted-foreground">contact@pcdc.edu.au</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Issue Date: {selectedInvoice.issueDate.toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Due Date: {selectedInvoice.dueDate.toLocaleDateString()}</p>
                  {getStatusBadge(selectedInvoice.status)}
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h4 className="font-semibold mb-3">Line Items</h4>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 text-left text-sm text-muted-foreground">Description</th>
                      <th className="pb-2 text-right text-sm text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.lineItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-foreground">{item.description}</td>
                        <td className="py-2 text-right font-medium text-foreground">${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${selectedInvoice.subtotal}</span>
                </div>
                {selectedInvoice.discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${selectedInvoice.discountAmount}</span>
                  </div>
                )}
                {selectedInvoice.creditAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Credits Applied</span>
                    <span>-${selectedInvoice.creditAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                  <span>Total</span>
                  <span>${selectedInvoice.totalAmount}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Paid</span>
                  <span>-${selectedInvoice.paidAmount}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-danger">
                  <span>Outstanding</span>
                  <span>${selectedInvoice.outstandingAmount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 gap-2">
                  <Send className="size-4" />
                  Send Invoice
                </Button>
                <Button variant="secondary" className="flex-1 gap-2">
                  <Download className="size-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
