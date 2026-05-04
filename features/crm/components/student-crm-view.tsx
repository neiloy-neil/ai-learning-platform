'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Users, UserCircle2, Phone, Mail, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { students, families, parents, leads, searchStudents } from '@/lib/db/crm-data';
import { StudentStatus, LearningMode, LeadStatus, ContactPreference } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function StudentCRMView() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'families', label: 'Families', icon: UserCircle2 },
    { id: 'leads', label: 'Leads', icon: Users },
  ];

  const filteredStudents = searchQuery
    ? searchStudents(searchQuery)
    : students.filter(s => {
        const matchesGrade = selectedGrade === 'all' || s.grade === selectedGrade;
        const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
        return matchesGrade && matchesStatus;
      });

  const getStatusBadge = (status: StudentStatus) => {
    const config = {
      [StudentStatus.ACTIVE]: { label: 'Active', color: 'bg-success/20 text-success border-success/30' },
      [StudentStatus.INACTIVE]: { label: 'Inactive', color: 'bg-muted text-muted-foreground border-border' },
      [StudentStatus.GRADUATED]: { label: 'Graduated', color: 'bg-primary/20 text-primary border-primary/30' },
      [StudentStatus.TRIAL]: { label: 'Trial', color: 'bg-warning/20 text-warning border-warning/30' },
    };
    const { label, color } = config[status];
    return <Badge className={color}>{label}</Badge>;
  };

  const getLearningModeBadge = (mode: LearningMode) => {
    const config = {
      [LearningMode.CENTRE]: { label: 'Centre', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
      [LearningMode.HOME]: { label: 'Home', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30' },
      [LearningMode.AI]: { label: 'AI', color: 'bg-cyan-500/20 text-cyan-600 border-cyan-500/30' },
      [LearningMode.TUTOR]: { label: 'Tutor', color: 'bg-orange-500/20 text-orange-600 border-orange-500/30' },
    };
    const { label, color } = config[mode];
    return <Badge className={color}>{label}</Badge>;
  };

  const getLeadStatusBadge = (status: LeadStatus) => {
    const config = {
      [LeadStatus.NEW]: { label: 'New', color: 'bg-blue-500/20 text-blue-600' },
      [LeadStatus.CONTACTED]: { label: 'Contacted', color: 'bg-purple-500/20 text-purple-600' },
      [LeadStatus.DIAGNOSTIC_BOOKED]: { label: 'Diagnostic Booked', color: 'bg-cyan-500/20 text-cyan-600' },
      [LeadStatus.DIAGNOSTIC_COMPLETED]: { label: 'Diagnostic Done', color: 'bg-orange-500/20 text-orange-600' },
      [LeadStatus.ENROLLED]: { label: 'Enrolled', color: 'bg-success/20 text-success' },
      [LeadStatus.NOT_ENROLLED]: { label: 'Not Enrolled', color: 'bg-muted text-muted-foreground' },
    };
    const { label, color } = config[status];
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Student & Family CRM</span>
            <h1 className="text-3xl font-semibold">Student Management</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage student profiles, family accounts, and enquiries
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="size-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="glass-panel-strong p-4">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="mt-2 text-3xl font-semibold">{students.length}</p>
          <p className="mt-1 text-xs text-success">+2 this month</p>
        </div>
        <div className="glass-panel-strong p-4">
          <p className="text-sm text-muted-foreground">Active Families</p>
          <p className="mt-2 text-3xl font-semibold">{families.filter(f => f.isActive).length}</p>
          <p className="mt-1 text-xs text-muted-foreground">{students.length} students</p>
        </div>
        <div className="glass-panel-strong p-4">
          <p className="text-sm text-muted-foreground">Pending Leads</p>
          <p className="mt-2 text-3xl font-semibold">{leads.filter(l => l.status === LeadStatus.NEW || l.status === LeadStatus.CONTACTED).length}</p>
          <p className="mt-1 text-xs text-warning">Needs follow-up</p>
        </div>
        <div className="glass-panel-strong p-4">
          <p className="text-sm text-muted-foreground">Diagnostic Bookings</p>
          <p className="mt-2 text-3xl font-semibold">{leads.filter(l => l.status === LeadStatus.DIAGNOSTIC_BOOKED).length}</p>
          <p className="mt-1 text-xs text-muted-foreground">This week</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={cn(
                'flex items-center gap-2 pb-3 border-b-2 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              <option value="Kindy">Kindy</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
              <option value="Year 5">Year 5</option>
              <option value="Year 6">Year 6</option>
            </select>
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="trial">Trial</option>
            </select>
          </div>

          {/* Students Table */}
          <div className="glass-panel-strong overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Grade</th>
                    <th className="px-4 py-3 text-left font-medium">Learning Mode</th>
                    <th className="px-4 py-3 text-left font-medium">Family</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Enrolled</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const family = families.find(f => f.id === student.familyId);
                    return (
                      <tr key={student.id} className="border-t border-border/50">
                        <td className="px-4 py-3">
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-muted-foreground">{student.school}</p>
                        </td>
                        <td className="px-4 py-3">{student.grade}</td>
                        <td className="px-4 py-3">{getLearningModeBadge(student.learningMode)}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{family?.familyName || 'N/A'}</p>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                        <td className="px-4 py-3 text-xs">
                          {student.enrolledDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="size-3" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Edit className="size-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Families Tab */}
      {activeTab === 'families' && (
        <div className="grid gap-4 md:grid-cols-2">
          {families.map((family) => {
            const familyStudents = students.filter(s => family.studentIds.includes(s.id));
            const familyParents = parents.filter(p => family.parentIds.includes(p.id));
            return (
              <div key={family.id} className="glass-panel-strong overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{family.familyName}</h3>
                      <p className="text-sm text-muted-foreground">{family.studentIds.length} students</p>
                    </div>
                    <Badge className={family.isActive ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>
                      {family.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-muted-foreground" />
                      <span>{family.primaryEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-muted-foreground" />
                      <span>{family.primaryPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="size-4 text-muted-foreground mt-0.5" />
                      <span>{family.address.city}, {family.address.state}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Students</p>
                    {familyStudents.map(student => (
                      <div key={student.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-2">
                        <span className="text-sm font-medium">{student.firstName} {student.lastName}</span>
                        <Badge variant="secondary" className="text-xs">{student.grade}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Parents</p>
                    {familyParents.map(parent => (
                      <div key={parent.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-2">
                        <span className="text-sm">{parent.firstName} {parent.lastName}</span>
                        <Badge variant="secondary" className="text-xs">
                          {parent.preferredContact === ContactPreference.EMAIL ? 'Email' : 
                           parent.preferredContact === ContactPreference.SMS ? 'SMS' : 'Both'}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">View Details</Button>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="glass-panel-strong overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Student</th>
                    <th className="px-4 py-3 text-left font-medium">Parent</th>
                    <th className="px-4 py-3 text-left font-medium">Grade</th>
                    <th className="px-4 py-3 text-left font-medium">Source</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Created</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-border/50">
                      <td className="px-4 py-3 font-medium">{lead.studentName}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{lead.parentName}</p>
                        <p className="text-xs text-muted-foreground">{lead.parentEmail}</p>
                      </td>
                      <td className="px-4 py-3">{lead.studentGrade}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="capitalize">{lead.source.replace('_', ' ')}</Badge>
                      </td>
                      <td className="px-4 py-3">{getLeadStatusBadge(lead.status)}</td>
                      <td className="px-4 py-3 text-xs">{lead.createdDate.toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="secondary">
                          <Eye className="size-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
