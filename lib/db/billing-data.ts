import { 
  FeeRule, 
  Discount, 
  Invoice, 
  Payment, 
  ReferralCredit,
  BillingReminder,
  InvoiceStatus,
  PaymentMethod,
  DiscountType,
  ProRataCalculation
} from '@/lib/pcdc-types';

// =================================================================
// FEE RULES
// =================================================================

export const feeRules: FeeRule[] = [
  {
    id: 'fee-1',
    level: 'Kindy',
    classType: 'regular',
    standardFee: 180,
    termLength: 10,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_WEEK,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'Standard Kindy fee - 1 hour per week',
  },
  {
    id: 'fee-2',
    level: 'Year 1-2',
    classType: 'regular',
    standardFee: 200,
    termLength: 10,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_WEEK,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'Years 1-2 standard fee - 1.5 hours per week',
  },
  {
    id: 'fee-3',
    level: 'Year 3-4',
    classType: 'regular',
    standardFee: 220,
    termLength: 10,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_WEEK,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'Years 3-4 standard fee - 1.5 hours per week',
  },
  {
    id: 'fee-4',
    level: 'Year 5-6',
    classType: 'regular',
    standardFee: 240,
    termLength: 10,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_WEEK,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'Years 5-6 standard fee - 2 hours per week',
  },
  {
    id: 'fee-5',
    level: 'Year 5-6',
    classType: 'advanced',
    standardFee: 280,
    termLength: 10,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_WEEK,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'Years 5-6 advanced - 2.5 hours per week',
  },
  {
    id: 'fee-6',
    level: 'NAPLAN Prep',
    classType: 'intensive',
    standardFee: 320,
    termLength: 8,
    proRataEnabled: true,
    proRataCalculation: ProRataCalculation.PER_CLASS,
    isActive: true,
    effectiveFrom: new Date('2026-01-01'),
    notes: 'NAPLAN preparation intensive course',
  },
];

// =================================================================
// DISCOUNTS
// =================================================================

export const discounts: Discount[] = [
  {
    id: 'disc-1',
    type: DiscountType.SIBLING,
    name: 'Sibling Discount - 2nd Child',
    description: '10% discount for second child from same family',
    valueType: 'percentage',
    value: 10,
    usedCount: 12,
    isActive: true,
    validFrom: new Date('2026-01-01'),
    notes: 'Automatically applied when 2+ siblings enrolled',
  },
  {
    id: 'disc-2',
    type: DiscountType.SIBLING,
    name: 'Sibling Discount - 3rd+ Child',
    description: '15% discount for third and subsequent children',
    valueType: 'percentage',
    value: 15,
    usedCount: 4,
    isActive: true,
    validFrom: new Date('2026-01-01'),
    notes: 'Automatically applied when 3+ siblings enrolled',
  },
  {
    id: 'disc-3',
    type: DiscountType.REFERRAL,
    name: 'Referral Credit',
    description: '$50 credit for referring a new family',
    valueType: 'fixed',
    value: 50,
    maxUses: 100,
    usedCount: 23,
    isActive: true,
    validFrom: new Date('2026-01-01'),
    notes: 'Applied after referred family completes first term',
  },
  {
    id: 'disc-4',
    type: DiscountType.EARLY_PAYMENT,
    name: 'Early Bird - Full Term',
    description: '5% discount for paying full term in advance',
    valueType: 'percentage',
    value: 5,
    usedCount: 34,
    isActive: true,
    validFrom: new Date('2026-01-01'),
    notes: 'Must be paid before term starts',
  },
];

// =================================================================
// INVOICES
// =================================================================

export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    familyId: 'fam-1',
    studentIds: ['stu-1', 'stu-2'],
    invoiceNumber: 'INV-2026-001',
    issueDate: new Date('2026-04-01'),
    dueDate: new Date('2026-04-15'),
    subtotal: 400,
    discountAmount: 40,
    creditAmount: 0,
    totalAmount: 360,
    paidAmount: 360,
    outstandingAmount: 0,
    status: InvoiceStatus.PAID,
    lineItems: [
      { description: 'Year 3 Mathematics - Term 2', amount: 220, enrolmentId: 'enr-1', termStart: new Date('2026-04-01'), termEnd: new Date('2026-06-30') },
      { description: 'Year 1 Literacy - Term 2', amount: 180, enrolmentId: 'enr-2', termStart: new Date('2026-04-01'), termEnd: new Date('2026-06-30') },
    ],
    appliedDiscounts: ['disc-1'],
    notes: 'Sibling discount applied',
    sentAt: new Date('2026-04-01'),
    paidAt: new Date('2026-04-10'),
    createdBy: 'admin-1',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-10'),
  },
  {
    id: 'inv-2',
    familyId: 'fam-2',
    studentIds: ['stu-3'],
    invoiceNumber: 'INV-2026-002',
    issueDate: new Date('2026-04-01'),
    dueDate: new Date('2026-04-15'),
    subtotal: 240,
    discountAmount: 0,
    creditAmount: 0,
    totalAmount: 240,
    paidAmount: 120,
    outstandingAmount: 120,
    status: InvoiceStatus.PARTIALLY_PAID,
    lineItems: [
      { description: 'Year 6 NAPLAN Preparation - Term 2', amount: 240, enrolmentId: 'enr-3', termStart: new Date('2026-04-01'), termEnd: new Date('2026-06-30') },
    ],
    appliedDiscounts: [],
    sentAt: new Date('2026-04-01'),
    createdBy: 'admin-1',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-12'),
  },
  {
    id: 'inv-3',
    familyId: 'fam-3',
    studentIds: ['stu-4'],
    invoiceNumber: 'INV-2026-003',
    issueDate: new Date('2026-04-01'),
    dueDate: new Date('2026-04-15'),
    subtotal: 220,
    discountAmount: 0,
    creditAmount: 0,
    totalAmount: 220,
    paidAmount: 0,
    outstandingAmount: 220,
    status: InvoiceStatus.OVERDUE,
    lineItems: [
      { description: 'Year 3 Mathematics - Term 2', amount: 220, enrolmentId: 'enr-4', termStart: new Date('2026-04-01'), termEnd: new Date('2026-06-30') },
    ],
    appliedDiscounts: [],
    sentAt: new Date('2026-04-01'),
    createdBy: 'admin-1',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-16'),
  },
  {
    id: 'inv-4',
    familyId: 'fam-4',
    studentIds: ['stu-5'],
    invoiceNumber: 'INV-2026-004',
    issueDate: new Date('2026-04-01'),
    dueDate: new Date('2026-04-15'),
    subtotal: 280,
    discountAmount: 14,
    creditAmount: 50,
    totalAmount: 216,
    paidAmount: 216,
    outstandingAmount: 0,
    status: InvoiceStatus.PAID,
    lineItems: [
      { description: 'Year 5 Advanced Mathematics - Term 2', amount: 280, enrolmentId: 'enr-5', termStart: new Date('2026-04-01'), termEnd: new Date('2026-06-30') },
    ],
    appliedDiscounts: ['disc-3', 'disc-4'],
    notes: 'Early bird discount + referral credit applied',
    sentAt: new Date('2026-04-01'),
    paidAt: new Date('2026-04-05'),
    createdBy: 'admin-1',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-05'),
  },
  {
    id: 'inv-5',
    familyId: 'fam-5',
    studentIds: ['stu-6'],
    invoiceNumber: 'INV-2026-005',
    issueDate: new Date('2026-05-01'),
    dueDate: new Date('2026-05-15'),
    subtotal: 240,
    discountAmount: 0,
    creditAmount: 0,
    totalAmount: 240,
    paidAmount: 0,
    outstandingAmount: 240,
    status: InvoiceStatus.SENT,
    lineItems: [
      { description: 'Year 5 Advanced Mathematics - Term 2', amount: 240, enrolmentId: 'enr-6', termStart: new Date('2026-05-01'), termEnd: new Date('2026-06-30') },
    ],
    appliedDiscounts: [],
    sentAt: new Date('2026-05-01'),
    createdBy: 'admin-1',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
  },
];

// =================================================================
// PAYMENTS
// =================================================================

export const payments: Payment[] = [
  {
    id: 'pay-1',
    invoiceId: 'inv-1',
    familyId: 'fam-1',
    studentIds: ['stu-1', 'stu-2'],
    amount: 360,
    method: PaymentMethod.BANK_TRANSFER,
    paymentDate: new Date('2026-04-10'),
    recordedBy: 'admin-1',
    reference: 'TXN-20260410-001',
    notes: 'Full payment received via bank transfer',
    createdAt: new Date('2026-04-10'),
  },
  {
    id: 'pay-2',
    invoiceId: 'inv-2',
    familyId: 'fam-2',
    studentIds: ['stu-3'],
    amount: 120,
    method: PaymentMethod.CARD,
    paymentDate: new Date('2026-04-12'),
    recordedBy: 'admin-1',
    reference: 'TXN-20260412-002',
    notes: 'Partial payment - remaining $120 due',
    createdAt: new Date('2026-04-12'),
  },
  {
    id: 'pay-3',
    invoiceId: 'inv-4',
    familyId: 'fam-4',
    studentIds: ['stu-5'],
    amount: 216,
    method: PaymentMethod.ONLINE,
    paymentDate: new Date('2026-04-05'),
    recordedBy: 'admin-1',
    reference: 'TXN-20260405-003',
    notes: 'Early payment with discount',
    createdAt: new Date('2026-04-05'),
  },
];

// =================================================================
// REFERRAL CREDITS
// =================================================================

export const referralCredits: ReferralCredit[] = [
  {
    id: 'ref-1',
    referrerFamilyId: 'fam-4',
    referredFamilyId: 'fam-5',
    creditAmount: 50,
    status: 'applied',
    issuedAt: new Date('2026-03-15'),
    appliedToInvoiceId: 'inv-4',
    notes: 'Family 4 referred Family 5',
  },
  {
    id: 'ref-2',
    referrerFamilyId: 'fam-1',
    referredFamilyId: 'fam-6',
    creditAmount: 50,
    status: 'pending',
    issuedAt: new Date('2026-04-20'),
    expiresAt: new Date('2026-07-20'),
    notes: 'Awaiting completion of first term',
  },
];

// =================================================================
// BILLING REMINDERS
// =================================================================

export const billingReminders: BillingReminder[] = [
  {
    id: 'rem-1',
    invoiceId: 'inv-3',
    familyId: 'fam-3',
    reminderType: 'overdue',
    sentAt: new Date('2026-04-16'),
    sentVia: 'email',
    status: 'sent',
  },
  {
    id: 'rem-2',
    invoiceId: 'inv-3',
    familyId: 'fam-3',
    reminderType: 'final_notice',
    sentAt: new Date('2026-04-23'),
    sentVia: 'both',
    status: 'sent',
  },
];

// =================================================================
// HELPER FUNCTIONS
// =================================================================

export function calculateProRataFee(
  feeRule: FeeRule,
  weeksRemaining: number,
  classesPerWeek: number = 1
): number {
  if (!feeRule.proRataEnabled) {
    return feeRule.standardFee;
  }

  switch (feeRule.proRataCalculation) {
    case ProRataCalculation.PER_WEEK:
      const weeklyRate = feeRule.standardFee / feeRule.termLength;
      return Math.round(weeklyRate * weeksRemaining * 100) / 100;
    
    case ProRataCalculation.PER_CLASS:
      const totalClasses = feeRule.termLength * classesPerWeek;
      const perClassRate = feeRule.standardFee / totalClasses;
      const classesRemaining = weeksRemaining * classesPerWeek;
      return Math.round(perClassRate * classesRemaining * 100) / 100;
    
    case ProRataCalculation.DAILY:
      const totalDays = feeRule.termLength * 7;
      const dailyRate = feeRule.standardFee / totalDays;
      const daysRemaining = weeksRemaining * 7;
      return Math.round(dailyRate * daysRemaining * 100) / 100;
    
    default:
      return feeRule.standardFee;
  }
}

export function applyDiscount(amount: number, discount: Discount): number {
  if (discount.valueType === 'percentage') {
    return Math.round(amount * (discount.value / 100) * 100) / 100;
  }
  return discount.value;
}

export function getInvoiceStats(): {
  totalInvoiced: number;
  totalPaid: number;
  totalOutstanding: number;
  overdueCount: number;
  paidCount: number;
} {
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.outstandingAmount, 0);
  const overdueCount = invoices.filter(inv => inv.status === InvoiceStatus.OVERDUE).length;
  const paidCount = invoices.filter(inv => inv.status === InvoiceStatus.PAID).length;

  return {
    totalInvoiced,
    totalPaid,
    totalOutstanding,
    overdueCount,
    paidCount,
  };
}

export function getOverdueInvoices(): Invoice[] {
  return invoices.filter(inv => inv.status === InvoiceStatus.OVERDUE);
}

export function getPaymentsByInvoice(invoiceId: string): Payment[] {
  return payments.filter(p => p.invoiceId === invoiceId);
}
