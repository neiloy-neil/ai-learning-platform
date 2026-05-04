'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, DollarSign, Mail, Phone, TrendingUp } from 'lucide-react';
import { invoices, getOverdueInvoices, billingReminders } from '@/lib/db/billing-data';
import { InvoiceStatus } from '@/lib/pcdc-types';

export default function OverdueDashboard() {
  const overdueInvoices = getOverdueInvoices();
  const totalOverdue = overdueInvoices.reduce((sum, inv) => sum + inv.outstandingAmount, 0);
  const totalReminders = billingReminders.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overdue Invoices & Reminders</h1>
        <p className="mt-2 text-muted-foreground">Track outstanding payments and send reminders</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-500/10 p-2">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{overdueInvoices.length}</p>
                <p className="text-sm text-muted-foreground">Overdue Invoices</p>
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
                <p className="text-2xl font-semibold text-foreground">${totalOverdue}</p>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Mail className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{totalReminders}</p>
                <p className="text-sm text-muted-foreground">Reminders Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <TrendingUp className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {Math.round((invoices.filter(i => i.status === InvoiceStatus.PAID).length / invoices.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-danger" />
            Overdue Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {overdueInvoices.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No overdue invoices</p>
          ) : (
            <div className="space-y-4">
              {overdueInvoices.map((invoice) => (
                <div key={invoice.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-muted-foreground">Family: {invoice.familyId}</p>
                    </div>
                    <Badge className="bg-danger/20 text-danger border-danger/30">
                      Overdue
                    </Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Issue Date</p>
                      <p className="font-medium text-foreground">{invoice.issueDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-medium text-danger">{invoice.dueDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Outstanding</p>
                      <p className="font-bold text-danger">${invoice.outstandingAmount}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-2">
                      <Mail className="size-3" />
                      Send Reminder
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-2">
                      <Phone className="size-3" />
                      Call Parent
                    </Button>
                    <Button size="sm" variant="secondary">
                      View Invoice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reminder History */}
      <Card>
        <CardHeader>
          <CardTitle>Reminder History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Invoice</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Sent</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Via</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {billingReminders.map((reminder) => (
                  <tr key={reminder.id} className="hover:bg-muted/50">
                    <td className="py-4 font-medium text-foreground">{reminder.invoiceId}</td>
                    <td className="py-4">
                      <Badge variant="secondary" className="capitalize">
                        {reminder.reminderType.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 text-foreground">{reminder.sentAt.toLocaleDateString()}</td>
                    <td className="py-4 text-center text-foreground capitalize">{reminder.sentVia}</td>
                    <td className="py-4 text-center">
                      <Badge className={
                        reminder.status === 'sent'
                          ? 'bg-success/20 text-success border-success/30'
                          : 'bg-danger/20 text-danger border-danger/30'
                      }>
                        {reminder.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
