import {
  StudentProfile,
  ParentProfile,
  FamilyAccount,
  Lead,
  DiagnosticBooking,
  TimeSlot,
  LearningMode,
  StudentStatus,
  ContactPreference,
  LeadStatus,
  LeadPipeline,
} from '@/lib/pcdc-types';

// =================================================================
// FAMILY ACCOUNTS
// =================================================================

export const families: FamilyAccount[] = [
  {
    id: 'family-1',
    familyName: 'Johnson Family',
    parentIds: ['parent-1', 'parent-2'],
    studentIds: ['student-1', 'student-2'],
    primaryEmail: 'johnson.family@email.com',
    primaryPhone: '+61 412 345 678',
    address: {
      street: '123 Main Street',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia',
    },
    emergencyContact: {
      name: 'Sarah Johnson',
      relationship: 'Mother',
      phone: '+61 412 345 678',
    },
    referralSource: 'website',
    referralCredit: 50,
    billingEmail: 'johnson.billing@email.com',
    paymentMethod: 'card',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2026-05-01'),
    isActive: true,
  },
  {
    id: 'family-2',
    familyName: 'Smith Family',
    parentIds: ['parent-3'],
    studentIds: ['student-3'],
    primaryEmail: 'smith.family@email.com',
    primaryPhone: '+61 423 456 789',
    address: {
      street: '456 Oak Avenue',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia',
    },
    emergencyContact: {
      name: 'Michael Smith',
      relationship: 'Father',
      phone: '+61 423 456 789',
    },
    referralSource: 'referral',
    referredBy: 'family-1',
    billingEmail: 'smith.family@email.com',
    paymentMethod: 'bank_transfer',
    createdAt: new Date('2025-10-20'),
    updatedAt: new Date('2026-04-28'),
    isActive: true,
  },
  {
    id: 'family-3',
    familyName: 'Williams Family',
    parentIds: ['parent-4', 'parent-5'],
    studentIds: ['student-4', 'student-5', 'student-6'],
    primaryEmail: 'williams.family@email.com',
    primaryPhone: '+61 434 567 890',
    address: {
      street: '789 Pine Road',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia',
    },
    emergencyContact: {
      name: 'Emma Williams',
      relationship: 'Mother',
      phone: '+61 434 567 890',
    },
    referralSource: 'social',
    billingEmail: 'williams.billing@email.com',
    paymentMethod: 'online',
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2026-05-03'),
    isActive: true,
  },
];

// =================================================================
// PARENT PROFILES
// =================================================================

export const parents: ParentProfile[] = [
  {
    id: 'parent-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+61 412 345 678',
    familyId: 'family-1',
    studentIds: ['student-1', 'student-2'],
    preferredContact: ContactPreference.EMAIL,
    receiveEmails: true,
    receiveSMS: true,
    address: {
      street: '123 Main Street',
      city: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'Australia',
    },
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2026-05-01'),
    lastLogin: new Date('2026-05-04'),
  },
  {
    id: 'parent-2',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david.johnson@email.com',
    phone: '+61 412 345 679',
    familyId: 'family-1',
    studentIds: ['student-1', 'student-2'],
    preferredContact: ContactPreference.SMS,
    receiveEmails: true,
    receiveSMS: true,
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2026-04-20'),
    lastLogin: new Date('2026-05-03'),
  },
  {
    id: 'parent-3',
    firstName: 'Lisa',
    lastName: 'Smith',
    email: 'lisa.smith@email.com',
    phone: '+61 423 456 789',
    familyId: 'family-2',
    studentIds: ['student-3'],
    preferredContact: ContactPreference.BOTH,
    receiveEmails: true,
    receiveSMS: true,
    address: {
      street: '456 Oak Avenue',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia',
    },
    createdAt: new Date('2025-10-20'),
    updatedAt: new Date('2026-04-28'),
    lastLogin: new Date('2026-05-02'),
  },
  {
    id: 'parent-4',
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'emma.williams@email.com',
    phone: '+61 434 567 890',
    familyId: 'family-3',
    studentIds: ['student-4', 'student-5', 'student-6'],
    preferredContact: ContactPreference.EMAIL,
    receiveEmails: true,
    receiveSMS: false,
    address: {
      street: '789 Pine Road',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia',
    },
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2026-05-03'),
    lastLogin: new Date('2026-05-04'),
  },
  {
    id: 'parent-5',
    firstName: 'James',
    lastName: 'Williams',
    email: 'james.williams@email.com',
    phone: '+61 434 567 891',
    familyId: 'family-3',
    studentIds: ['student-4', 'student-5', 'student-6'],
    preferredContact: ContactPreference.NONE,
    receiveEmails: true,
    receiveSMS: false,
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2026-04-15'),
    lastLogin: new Date('2026-04-30'),
  },
];

// =================================================================
// STUDENT PROFILES
// =================================================================

export const students: StudentProfile[] = [
  {
    id: 'student-1',
    firstName: 'Emily',
    lastName: 'Johnson',
    dateOfBirth: new Date('2016-03-15'),
    gender: 'female',
    grade: 'Year 3',
    school: 'Sydney Primary School',
    learningMode: LearningMode.CENTRE,
    status: StudentStatus.ACTIVE,
    familyId: 'family-1',
    parentIds: ['parent-1', 'parent-2'],
    enrolledDate: new Date('2025-09-20'),
    currentClassId: 'class-1',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-1',
    emergencyContactName: 'Sarah Johnson',
    emergencyContactPhone: '+61 412 345 678',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2026-05-01'),
    createdBy: 'admin-1',
  },
  {
    id: 'student-2',
    firstName: 'Oliver',
    lastName: 'Johnson',
    dateOfBirth: new Date('2018-07-22'),
    gender: 'male',
    grade: 'Year 1',
    school: 'Sydney Primary School',
    learningMode: LearningMode.CENTRE,
    status: StudentStatus.ACTIVE,
    familyId: 'family-1',
    parentIds: ['parent-1', 'parent-2'],
    enrolledDate: new Date('2025-09-20'),
    currentClassId: 'class-2',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-2',
    emergencyContactName: 'Sarah Johnson',
    emergencyContactPhone: '+61 412 345 678',
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2026-05-01'),
    createdBy: 'admin-1',
  },
  {
    id: 'student-3',
    firstName: 'Sophia',
    lastName: 'Smith',
    dateOfBirth: new Date('2015-11-08'),
    gender: 'female',
    grade: 'Year 4',
    school: 'Melbourne Grammar School',
    learningMode: LearningMode.HOME,
    status: StudentStatus.ACTIVE,
    familyId: 'family-2',
    parentIds: ['parent-3'],
    enrolledDate: new Date('2025-10-25'),
    currentClassId: 'class-3',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-3',
    medicalNotes: 'Mild asthma - carry inhaler',
    createdAt: new Date('2025-10-20'),
    updatedAt: new Date('2026-04-28'),
    createdBy: 'admin-1',
  },
  {
    id: 'student-4',
    firstName: 'Liam',
    lastName: 'Williams',
    dateOfBirth: new Date('2014-05-30'),
    gender: 'male',
    grade: 'Year 5',
    school: 'Brisbane State School',
    learningMode: LearningMode.CENTRE,
    status: StudentStatus.ACTIVE,
    familyId: 'family-3',
    parentIds: ['parent-4', 'parent-5'],
    enrolledDate: new Date('2025-08-15'),
    currentClassId: 'class-4',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-4',
    learningNotes: 'Excels in mathematics, needs support in reading comprehension',
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2026-05-03'),
    createdBy: 'admin-1',
  },
  {
    id: 'student-5',
    firstName: 'Ava',
    lastName: 'Williams',
    dateOfBirth: new Date('2016-09-12'),
    gender: 'female',
    grade: 'Year 3',
    school: 'Brisbane State School',
    learningMode: LearningMode.AI,
    status: StudentStatus.ACTIVE,
    familyId: 'family-3',
    parentIds: ['parent-4', 'parent-5'],
    enrolledDate: new Date('2025-08-15'),
    currentClassId: 'class-1',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-5',
    createdAt: new Date('2025-08-10'),
    updatedAt: new Date('2026-05-03'),
    createdBy: 'admin-1',
  },
  {
    id: 'student-6',
    firstName: 'Noah',
    lastName: 'Williams',
    dateOfBirth: new Date('2019-01-25'),
    gender: 'male',
    grade: 'Kindy',
    school: 'Brisbane Kindergarten',
    learningMode: LearningMode.TUTOR,
    status: StudentStatus.ACTIVE,
    familyId: 'family-3',
    parentIds: ['parent-4', 'parent-5'],
    enrolledDate: new Date('2026-01-10'),
    currentClassId: 'class-5',
    diagnosticCompleted: true,
    diagnosticResultId: 'diag-6',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-05-03'),
    createdBy: 'admin-1',
  },
];

// =================================================================
// LEADS / ENQUIRIES
// =================================================================

export const leads: Lead[] = [
  {
    id: 'lead-1',
    studentName: 'Mia Thompson',
    studentGrade: 'Year 2',
    parentName: 'Rachel Thompson',
    parentEmail: 'rachel.thompson@email.com',
    parentPhone: '+61 445 678 901',
    source: 'website',
    status: LeadStatus.NEW,
    pipeline: LeadPipeline.NEW,
    parentConcern: 'Struggling with basic mathematics, needs foundational support',
    notes: ['Called to enquire about Year 2 program'],
    assignedTo: 'admin-1',
    createdDate: new Date('2026-05-03'),
    nextFollowUp: new Date('2026-05-06'),
    createdAt: new Date('2026-05-03'),
    updatedAt: new Date('2026-05-03'),
  },
  {
    id: 'lead-2',
    studentName: 'Ethan Brown',
    studentGrade: 'Year 5',
    parentName: 'Mark Brown',
    parentEmail: 'mark.brown@email.com',
    parentPhone: '+61 456 789 012',
    source: 'referral',
    status: LeadStatus.CONTACTED,
    pipeline: LeadPipeline.CONTACTED,
    parentConcern: 'Preparing for high school entrance exams',
    notes: ['Referred by Johnson family', 'Scheduled phone call for May 7'],
    assignedTo: 'admin-1',
    createdDate: new Date('2026-05-01'),
    lastFollowUp: new Date('2026-05-02'),
    nextFollowUp: new Date('2026-05-07'),
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-02'),
  },
  {
    id: 'lead-3',
    studentName: 'Isabella Davis',
    studentGrade: 'Year 4',
    parentName: 'Jennifer Davis',
    parentEmail: 'jennifer.davis@email.com',
    parentPhone: '+61 467 890 123',
    source: 'social',
    status: LeadStatus.DIAGNOSTIC_BOOKED,
    pipeline: LeadPipeline.DIAGNOSTIC_BOOKED,
    parentConcern: 'Needs help with reading comprehension and writing',
    notes: ['Booked diagnostic for May 10 at 3pm'],
    assignedTo: 'admin-1',
    createdDate: new Date('2026-04-28'),
    lastFollowUp: new Date('2026-05-01'),
    diagnosticBookingId: 'booking-1',
    createdAt: new Date('2026-04-28'),
    updatedAt: new Date('2026-05-01'),
  },
  {
    id: 'lead-4',
    studentName: 'Lucas Wilson',
    studentGrade: 'Year 6',
    parentName: 'Patricia Wilson',
    parentEmail: 'patricia.wilson@email.com',
    parentPhone: '+61 478 901 234',
    source: 'phone',
    status: LeadStatus.DIAGNOSTIC_COMPLETED,
    pipeline: LeadPipeline.DIAGNOSTIC_COMPLETED,
    parentConcern: 'Advanced student looking for extension work',
    notes: ['Diagnostic completed - score 92%', 'Recommended for advanced program'],
    assignedTo: 'admin-1',
    createdDate: new Date('2026-04-20'),
    lastFollowUp: new Date('2026-04-28'),
    nextFollowUp: new Date('2026-05-08'),
    diagnosticBookingId: 'booking-2',
    diagnosticResultId: 'diag-result-1',
    createdAt: new Date('2026-04-20'),
    updatedAt: new Date('2026-04-28'),
  },
  {
    id: 'lead-5',
    studentName: 'Charlotte Martinez',
    studentGrade: 'Year 1',
    parentName: 'Carlos Martinez',
    parentEmail: 'carlos.martinez@email.com',
    parentPhone: '+61 489 012 345',
    source: 'walk-in',
    status: LeadStatus.ENROLLED,
    pipeline: LeadPipeline.ENROLLED,
    parentConcern: 'Early intervention for mathematics',
    notes: ['Enrolled in Year 1 program', 'Start date: May 15'],
    assignedTo: 'admin-1',
    createdDate: new Date('2026-04-15'),
    lastFollowUp: new Date('2026-04-25'),
    enrolledStudentId: 'student-7',
    familyId: 'family-4',
    createdAt: new Date('2026-04-15'),
    updatedAt: new Date('2026-04-25'),
  },
];

// Helper functions for CRM operations

export function getStudentById(id: string): StudentProfile | undefined {
  return students.find(s => s.id === id);
}

export function getStudentsByFamilyId(familyId: string): StudentProfile[] {
  return students.filter(s => s.familyId === familyId);
}

export function getParentById(id: string): ParentProfile | undefined {
  return parents.find(p => p.id === id);
}

export function getParentsByFamilyId(familyId: string): ParentProfile[] {
  return parents.filter(p => p.familyId === familyId);
}

export function getFamilyById(id: string): FamilyAccount | undefined {
  return families.find(f => f.id === id);
}

export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return leads.filter(l => l.status === status);
}

export function searchStudents(query: string): StudentProfile[] {
  const lowerQuery = query.toLowerCase();
  return students.filter(
    s =>
      s.firstName.toLowerCase().includes(lowerQuery) ||
      s.lastName.toLowerCase().includes(lowerQuery) ||
      s.grade.toLowerCase().includes(lowerQuery) ||
      s.school.toLowerCase().includes(lowerQuery)
  );
}

// =================================================================
// DIAGNOSTIC BOOKINGS
// =================================================================

export const diagnosticBookings: DiagnosticBooking[] = [
  {
    id: 'booking-1',
    leadId: 'lead-3',
    studentName: 'Isabella Davis',
    parentName: 'Jennifer Davis',
    parentEmail: 'jennifer.davis@email.com',
    parentPhone: '+61 467 890 123',
    studentGrade: 'Year 4',
    date: new Date('2026-05-10'),
    timeSlot: '3:00 PM',
    duration: 60,
    status: 'scheduled',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
  },
  {
    id: 'booking-2',
    leadId: 'lead-4',
    studentName: 'Lucas Wilson',
    parentName: 'Patricia Wilson',
    parentEmail: 'patricia.wilson@email.com',
    parentPhone: '+61 478 901 234',
    studentGrade: 'Year 6',
    date: new Date('2026-04-28'),
    timeSlot: '10:30 AM',
    duration: 60,
    status: 'completed',
    resultId: 'diag-result-1',
    score: 92,
    recommendedLevel: 'Advanced',
    adminNotes: 'Excellent performance in mathematics and reasoning',
    createdAt: new Date('2026-04-20'),
    updatedAt: new Date('2026-04-28'),
  },
];

// =================================================================
// DIAGNOSTIC TIME SLOTS
// =================================================================

export const timeSlots: TimeSlot[] = [
  // May 10, 2026
  { id: 'slot-1', date: new Date('2026-05-10'), time: '9:00 AM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-2', date: new Date('2026-05-10'), time: '10:30 AM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  { id: 'slot-3', date: new Date('2026-05-10'), time: '12:00 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-4', date: new Date('2026-05-10'), time: '2:00 PM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  { id: 'slot-5', date: new Date('2026-05-10'), time: '3:00 PM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  { id: 'slot-6', date: new Date('2026-05-10'), time: '4:30 PM', maxCapacity: 3, bookedCount: 2, isAvailable: true },
  
  // May 11, 2026
  { id: 'slot-7', date: new Date('2026-05-11'), time: '9:00 AM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-8', date: new Date('2026-05-11'), time: '10:30 AM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-9', date: new Date('2026-05-11'), time: '12:00 PM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  { id: 'slot-10', date: new Date('2026-05-11'), time: '2:00 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-11', date: new Date('2026-05-11'), time: '3:00 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-12', date: new Date('2026-05-11'), time: '4:30 PM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  
  // May 12, 2026
  { id: 'slot-13', date: new Date('2026-05-12'), time: '9:00 AM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-14', date: new Date('2026-05-12'), time: '10:30 AM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-15', date: new Date('2026-05-12'), time: '12:00 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-16', date: new Date('2026-05-12'), time: '2:00 PM', maxCapacity: 3, bookedCount: 1, isAvailable: true },
  { id: 'slot-17', date: new Date('2026-05-12'), time: '3:00 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
  { id: 'slot-18', date: new Date('2026-05-12'), time: '4:30 PM', maxCapacity: 3, bookedCount: 0, isAvailable: true },
];

// Helper functions for diagnostics
export function getBookingById(id: string): DiagnosticBooking | undefined {
  return diagnosticBookings.find(b => b.id === id);
}

export function getTimeSlotsByDate(date: Date): TimeSlot[] {
  return timeSlots.filter(
    slot => slot.date.toDateString() === date.toDateString()
  );
}

export function getAvailableSlots(date: Date): TimeSlot[] {
  return getTimeSlotsByDate(date).filter(slot => slot.isAvailable);
}
