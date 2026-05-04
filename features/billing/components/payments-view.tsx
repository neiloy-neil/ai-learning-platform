'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Wallet, Landmark, Globe, Plus } from 'lucide-react';
import { payments, invoices } from '@/lib/db/billing-data';
import type { Payment } from '@/lib/pcdc-types';
import { PaymentMethod } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function PaymentsView() {
  const [showRecordForm, setShowRecordForm] = useState(false);

  const getMethodIcon = (method: PaymentMethod) => {
    const icons = {
      [PaymentMethod.CASH]: Wallet,
      [PaymentMethod.CARD]: CreditCard,
      [PaymentMethod.BANK_TRANSFER]: Landmark,
      [PaymentMethod.ONLINE]: Globe,
    };
    return icons[method];
  };

  const getMethodColor = (method: PaymentMethod) => {
    const colors = {
      [PaymentMethod.CASH]: 'bg-green-500/20 text-green-600 border-green-500/30',
      [PaymentMethod.CARD]: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      [PaymentMethod.BANK_TRANSFER]: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
      [PaymentMethod.ONLINE]: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    };
    return colors[method];
  };

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Recording</h1>
          <p className="mt-2 text-muted-foreground">Record and track all payments</p>
        </div>
        <Button onClick={() => setShowRecordForm(true)} className="gap-2">
          <Plus className="size-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">${totalPayments}</p>
                <p className="text-sm text-muted-foreground">Total Collected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <CreditCard className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{payments.length}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <DollarSign className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  ${Math.round(totalPayments / payments.length)}
                </p>
                <p className="text-sm text-muted-foreground">Average Payment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.values(PaymentMethod).map((method) => {
              const methodPayments = payments.filter(p => p.method === method);
              const total = methodPayments.reduce((sum, p) => sum + p.amount, 0);
              const Icon = getMethodIcon(method);
              const color = getMethodColor(method);

              return (
                <div key={method} className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn('rounded-lg p-2', color)}>
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground capitalize">
                        {method.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">{methodPayments.length} payments</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${total}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Payment ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Invoice</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Method</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((payment) => {
                  const Icon = getMethodIcon(payment.method);
                  const color = getMethodColor(payment.method);

                  return (
                    <tr key={payment.id} className="hover:bg-muted/50">
                      <td className="py-4 font-medium text-foreground">{payment.id}</td>
                      <td className="py-4 text-foreground">{payment.invoiceId}</td>
                      <td className="py-4 text-foreground">{payment.paymentDate.toLocaleDateString()}</td>
                      <td className="py-4 text-center">
                        <Badge className={cn('border gap-1', color)}>
                          <Icon className="size-3" />
                          {payment.method.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 text-right font-bold text-success">${payment.amount}</td>
                      <td className="py-4 text-sm text-muted-foreground font-mono">{payment.reference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
