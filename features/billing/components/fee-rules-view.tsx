'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Edit, Trash2, Plus, Calculator } from 'lucide-react';
import { feeRules } from '@/lib/db/billing-data';
import type { FeeRule } from '@/lib/pcdc-types';
import { ProRataCalculation } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function FeeRulesView() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRule, setEditingRule] = useState<FeeRule | null>(null);

  const getProRataLabel = (calc: ProRataCalculation) => {
    const labels = {
      [ProRataCalculation.PER_WEEK]: 'Per Week',
      [ProRataCalculation.PER_CLASS]: 'Per Class',
      [ProRataCalculation.DAILY]: 'Daily',
    };
    return labels[calc];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Rules Configuration</h1>
          <p className="mt-2 text-muted-foreground">Set up fee structures by level and class type</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="size-4" />
          Add Fee Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <DollarSign className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{feeRules.length}</p>
                <p className="text-sm text-muted-foreground">Active Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Calculator className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {feeRules.filter(r => r.proRataEnabled).length}
                </p>
                <p className="text-sm text-muted-foreground">Pro-rata Enabled</p>
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
                  ${Math.round(feeRules.reduce((sum, r) => sum + r.standardFee, 0) / feeRules.length)}
                </p>
                <p className="text-sm text-muted-foreground">Average Fee</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Level</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Standard Fee</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Term Length</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Pro-rata</th>
                  <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {feeRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-muted/50">
                    <td className="py-4 font-medium text-foreground">{rule.level}</td>
                    <td className="py-4">
                      <Badge variant="secondary">{rule.classType}</Badge>
                    </td>
                    <td className="py-4 text-right font-semibold text-foreground">${rule.standardFee}</td>
                    <td className="py-4 text-center text-foreground">{rule.termLength} weeks</td>
                    <td className="py-4 text-center">
                      {rule.proRataEnabled ? (
                        <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                          {getProRataLabel(rule.proRataCalculation)}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      <Badge className={cn(
                        rule.isActive ? 'bg-success/20 text-success border-success/30' : 'bg-muted'
                      )}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditingRule(rule)}
                        >
                          <Edit className="size-3" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Trash2 className="size-3" />
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
    </div>
  );
}
