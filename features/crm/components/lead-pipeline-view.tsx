'use client';

import { useState } from 'react';
import {
  Plus, Search, Filter, Phone, Mail, Calendar, Eye,
  ChevronRight, TrendingUp, Users, Target, Clock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { leads } from '@/lib/db/crm-data';
import { Lead, LeadPipeline, LeadStatus } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

const pipelineStages = [
  { id: LeadPipeline.NEW, label: 'New', color: 'bg-blue-500', icon: '🆕' },
  { id: LeadPipeline.CONTACTED, label: 'Contacted', color: 'bg-purple-500', icon: '📞' },
  { id: LeadPipeline.DIAGNOSTIC_BOOKED, label: 'Diagnostic Booked', color: 'bg-yellow-500', icon: '📅' },
  { id: LeadPipeline.DIAGNOSTIC_COMPLETED, label: 'Diagnostic Done', color: 'bg-orange-500', icon: '✅' },
  { id: LeadPipeline.PROPOSAL_SENT, label: 'Proposal Sent', color: 'bg-indigo-500', icon: '📄' },
  { id: LeadPipeline.ENROLLED, label: 'Enrolled', color: 'bg-green-500', icon: '🎉' },
];

export default function LeadPipelineView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = searchQuery
    ? leads.filter(
        l =>
          l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.parentEmail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : leads;

  const getLeadsByPipeline = (pipeline: LeadPipeline) =>
    filteredLeads.filter(l => l.pipeline === pipeline);

  const getPipelineColor = (pipeline: LeadPipeline) => {
    const stage = pipelineStages.find(s => s.id === pipeline);
    return stage?.color || 'bg-gray-500';
  };

  const getPipelineBadge = (lead: Lead) => {
    const colorMap: Record<LeadPipeline, string> = {
      [LeadPipeline.NEW]: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      [LeadPipeline.CONTACTED]: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
      [LeadPipeline.DIAGNOSTIC_BOOKED]: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
      [LeadPipeline.DIAGNOSTIC_COMPLETED]: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
      [LeadPipeline.PROPOSAL_SENT]: 'bg-indigo-500/20 text-indigo-600 border-indigo-500/30',
      [LeadPipeline.ENROLLED]: 'bg-green-500/20 text-green-600 border-green-500/30',
      [LeadPipeline.LOST]: 'bg-red-500/20 text-red-600 border-red-500/30',
    };
    return (
      <Badge className={cn('border', colorMap[lead.pipeline])}>
        {pipelineStages.find(s => s.id === lead.pipeline)?.label || lead.pipeline}
      </Badge>
    );
  };

  const getSourceBadge = (source: string) => {
    const config: Record<string, string> = {
      website: 'bg-blue-500/20 text-blue-600',
      referral: 'bg-green-500/20 text-green-600',
      social: 'bg-pink-500/20 text-pink-600',
      phone: 'bg-purple-500/20 text-purple-600',
      'walk-in': 'bg-orange-500/20 text-orange-600',
    };
    return <Badge className={cn(config[source] || 'bg-muted')}>{source}</Badge>;
  };

  // Calculate metrics
  const totalLeads = leads.length;
  const enrolledCount = leads.filter(l => l.pipeline === LeadPipeline.ENROLLED).length;
  const conversionRate = totalLeads > 0 ? ((enrolledCount / totalLeads) * 100).toFixed(1) : '0';
  const pendingDiagnostics = leads.filter(
    l => l.pipeline === LeadPipeline.DIAGNOSTIC_BOOKED
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Lead Management</span>
            <h1 className="text-3xl font-semibold">Lead Pipeline</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Track enquiries from initial contact to enrollment
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Plus className="size-4" />
              Add Lead
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="mt-2 text-3xl font-semibold">{totalLeads}</p>
                <p className="mt-1 text-xs text-muted-foreground">This month</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Users className="size-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="mt-2 text-3xl font-semibold">{conversionRate}%</p>
                <p className="mt-1 text-xs text-success">+5.2% vs last month</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <Target className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Diagnostics</p>
                <p className="mt-2 text-3xl font-semibold">{pendingDiagnostics}</p>
                <p className="mt-1 text-xs text-warning">Scheduled</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <Calendar className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enrolled</p>
                <p className="mt-2 text-3xl font-semibold">{enrolledCount}</p>
                <p className="mt-1 text-xs text-success">+2 this week</p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <TrendingUp className="size-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leads by name, email, or phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="secondary" className="gap-2">
          <Filter className="size-4" />
          Filters
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {pipelineStages.map(stage => {
          const stageLeads = getLeadsByPipeline(stage.id);

          return (
            <div key={stage.id} className="space-y-3">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{stage.icon}</span>
                  <h3 className="font-semibold text-sm">{stage.label}</h3>
                </div>
                <Badge variant="outline">{stageLeads.length}</Badge>
              </div>

              {/* Stage Cards */}
              <div className="space-y-2">
                {stageLeads.map(lead => (
                  <Card
                    key={lead.id}
                    className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-sm">{lead.studentName}</p>
                          <p className="text-xs text-muted-foreground">{lead.studentGrade}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{lead.parentName}</p>
                          <p className="text-xs text-muted-foreground">{lead.parentEmail}</p>
                          <p className="text-xs text-muted-foreground">{lead.parentPhone}</p>
                        </div>

                        <div className="flex items-center justify-between gap-1">
                          {getSourceBadge(lead.source)}
                          <ChevronRight className="size-3 text-muted-foreground" />
                        </div>

                        {lead.nextFollowUp && (
                          <div className="flex items-center gap-1 text-xs text-warning">
                            <Clock className="size-3" />
                            <span>
                              Follow-up: {lead.nextFollowUp.toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="flex gap-1 pt-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Phone className="size-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Mail className="size-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Calendar className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {stageLeads.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                    <p className="text-xs text-muted-foreground">No leads</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Panel (Modal) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{selectedLead.studentName}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedLead.studentGrade} • Lead #{selectedLead.id}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedLead(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Pipeline Stage */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Pipeline Stage
                </h3>
                {getPipelineBadge(selectedLead)}
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Contact Information
                </h3>
                <div className="grid gap-2">
                  <p className="text-sm">
                    <span className="font-medium">Parent:</span> {selectedLead.parentName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedLead.parentEmail}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {selectedLead.parentPhone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Source:</span> {selectedLead.source}
                  </p>
                </div>
              </div>

              {/* Parent Concern */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Parent Concern
                </h3>
                <p className="text-sm">{selectedLead.parentConcern}</p>
              </div>

              {/* Notes */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Notes
                </h3>
                <ul className="space-y-1">
                  {selectedLead.notes.map((note, index) => (
                    <li key={index} className="text-sm">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow-up */}
              {selectedLead.nextFollowUp && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                    Next Follow-up
                  </h3>
                  <p className="text-sm">
                    {selectedLead.nextFollowUp.toLocaleDateString('en-AU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 gap-2">
                  <Phone className="size-4" />
                  Call Parent
                </Button>
                <Button className="flex-1 gap-2">
                  <Mail className="size-4" />
                  Send Email
                </Button>
                <Button className="flex-1 gap-2">
                  <Calendar className="size-4" />
                  Book Diagnostic
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
