'use client';

import { useState } from 'react';
import { Send, CheckCircle, User, Mail, Phone, GraduationCap, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/cn';

interface EnquiryFormData {
  studentName: string;
  studentGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentConcern: string;
  source: string;
  honeypot: string;
}

const gradeOptions = [
  'Kindy',
  'Prep',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
];

export default function EnquiryForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    studentName: '',
    studentGrade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentConcern: '',
    source: 'website',
    honeypot: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.studentGrade) {
      newErrors.studentGrade = 'Please select a grade';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email address';
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Phone number is required';
    }

    if (!formData.parentConcern.trim()) {
      newErrors.parentConcern = 'Please tell us about your concerns';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.honeypot) {
      console.log('Bot detected');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, this would POST to /api/leads
    console.log('Lead submitted:', {
      studentName: formData.studentName,
      studentGrade: formData.studentGrade,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
      source: formData.source,
      parentConcern: formData.parentConcern,
      pipeline: 'new',
      status: 'new',
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof EnquiryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <Card className={cn('rounded-2xl border-success/30 bg-success/5', className)}>
        <CardContent className="p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
            <CheckCircle className="size-10 text-success" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-white">Enquiry Submitted!</h3>
          <p className="mt-3 text-slate-300">
            Thank you for your interest! Our team will contact you within 24 hours to discuss your child's learning needs.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-400">
            <p>📞 We'll call you to schedule a free diagnostic assessment</p>
            <p>📧 You'll receive a confirmation email shortly</p>
          </div>
          <Button className="mt-6" onClick={() => setSubmitted(false)} variant="secondary">
            Submit Another Enquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl', className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          Book a Free Diagnostic Assessment
        </CardTitle>
        <p className="text-sm text-slate-400">
          Fill out the form below and we'll contact you to schedule your child's assessment
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot for spam protection */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={e => handleChange('honeypot', e.target.value)}
            className="hidden"
          />

          {/* Student Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Student Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                value={formData.studentName}
                onChange={e => handleChange('studentName', e.target.value)}
                className={cn(
                  'pl-10',
                  errors.studentName && 'border-danger focus-visible:ring-danger'
                )}
                placeholder="Enter student's full name"
              />
            </div>
            {errors.studentName && (
              <p className="mt-1 text-xs text-danger">{errors.studentName}</p>
            )}
          </div>

          {/* Student Grade */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Student Grade <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select
                value={formData.studentGrade}
                onChange={e => handleChange('studentGrade', e.target.value)}
                className={cn(
                  'flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-10 py-2 text-sm text-white placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50',
                  errors.studentGrade && 'border-danger focus-visible:ring-danger'
                )}
              >
                <option value="" className="bg-slate-900">Select grade</option>
                {gradeOptions.map(grade => (
                  <option key={grade} value={grade} className="bg-slate-900">
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            {errors.studentGrade && (
              <p className="mt-1 text-xs text-danger">{errors.studentGrade}</p>
            )}
          </div>

          {/* Parent Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Parent/Guardian Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                value={formData.parentName}
                onChange={e => handleChange('parentName', e.target.value)}
                className={cn(
                  'pl-10',
                  errors.parentName && 'border-danger focus-visible:ring-danger'
                )}
                placeholder="Enter your full name"
              />
            </div>
            {errors.parentName && (
              <p className="mt-1 text-xs text-danger">{errors.parentName}</p>
            )}
          </div>

          {/* Parent Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="email"
                value={formData.parentEmail}
                onChange={e => handleChange('parentEmail', e.target.value)}
                className={cn(
                  'pl-10',
                  errors.parentEmail && 'border-danger focus-visible:ring-danger'
                )}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.parentEmail && (
              <p className="mt-1 text-xs text-danger">{errors.parentEmail}</p>
            )}
          </div>

          {/* Parent Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Phone Number <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="tel"
                value={formData.parentPhone}
                onChange={e => handleChange('parentPhone', e.target.value)}
                className={cn(
                  'pl-10',
                  errors.parentPhone && 'border-danger focus-visible:ring-danger'
                )}
                placeholder="+61 4XX XXX XXX"
              />
            </div>
            {errors.parentPhone && (
              <p className="mt-1 text-xs text-danger">{errors.parentPhone}</p>
            )}
          </div>

          {/* Parent Concern */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              How can we help? <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 size-4 text-slate-400" />
              <textarea
                value={formData.parentConcern}
                onChange={e => handleChange('parentConcern', e.target.value)}
                className={cn(
                  'flex min-h-[100px] w-full rounded-md border border-white/10 bg-white/5 px-10 py-2 text-sm text-white placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50',
                  errors.parentConcern && 'border-danger focus-visible:ring-danger'
                )}
                placeholder="Tell us about your child's learning needs, challenges, or goals..."
              />
            </div>
            {errors.parentConcern && (
              <p className="mt-1 text-xs text-danger">{errors.parentConcern}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Submitting...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Submit Enquiry & Book Free Assessment
              </>
            )}
          </Button>

          <p className="text-center text-xs text-slate-400">
            🔒 Your information is secure and will never be shared
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
