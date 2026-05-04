
/**
 * pcdc-types.ts
 * 
 * This file defines the core data structures and types for the PCDC adaptive learning platform,
 * based on the "inside-out" development principle. These types form the academic architecture
 * and data model for the entire system.
 */

// =================================================================
// 1. ACADEMIC ARCHITECTURE & CONCEPT MAPPING
// =================================================================

/**
 * Represents a single, structured educational concept.
 * This is the fundamental building block of the academic structure.
 */
export interface Concept {
  id: string; // Unique identifier for the concept (e.g., 'algebra-linear-equations')
  name: string; // Human-readable name (e.g., "Linear Equations")
  subject: string; // Subject the concept belongs to (e.g., 'math')
  level: string; // Educational level (e.g., 'grade-9')
}

/**
 * Defines a prerequisite relationship between two concepts.
 * This forms the basis for learning progressions and adaptive routing.
 */
export interface ConceptDependency {
  id: string;
  sourceConceptId: string; // The concept that requires a prerequisite
  prerequisiteConceptId: string; // The concept that must be mastered first
}

// =================================================================
// 2. ASSESSMENT & EVIDENCE MODEL
// =================================================================

/**
 * Enum for question difficulty levels.
 */
export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

/**
 * Represents a single assessment question.
 * Each question is explicitly linked to one or more concepts.
 */
export interface Question {
  id: string; // Unique identifier for the question
  text: string; // The content of the question itself
  difficulty: QuestionDifficulty; // Difficulty rating
  conceptIds: string[]; // An array of Concept IDs this question assesses
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

/**
 * Represents a student's single attempt at a question.
 * This is the core "evidence" of student understanding.
 */
export interface StudentResponse {
  id: string;
  studentId: string;
  questionId: string;
  isCorrect: boolean; // Was the answer correct?
  attemptTimestamp: Date; // When the attempt was made
  confidenceRating?: number; // Optional: student's self-reported confidence (e.g., 1-5)
}

// =================================================================
// 3. MASTERY & ADAPTIVE LOGIC
// =================================================================

/**
 * Represents a student's calculated mastery level for a single concept.
 * This is continuously updated based on evidence from StudentResponses.
 */
export interface ConceptMastery {
  id: string;
  studentId: string;
  conceptId: string;
  masteryScore: number; // A normalized score (e.g., 0 to 1)
  lastUpdated: Date;
}

// 4. USER & DASHBOARD MODELS
// =================================================================

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    PARENT = 'parent',
    ADMIN = 'admin',
}

/**
 * Represents a generic user in the system.
 * Role-specific properties are included.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  
  // Parent-specific
  studentIds?: string[];
}

// Re-exporting User as Student for compatibility with existing code,
// but new code should prefer the User type.
export type Student = User;

// =================================================================
// 5. NOTIFICATIONS & OTHER FEATURES
// =================================================================

export interface Notification {
    id: string;
    userId: string;
    text: string;
    read: boolean;
    createdAt: Date;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    assignedDate: Date;
    dueDate: Date;
    status: 'Assigned' | 'Graded' | 'Submitted';
    assignedToStudentId: string;
    score?: number;
}

export interface ParentAlert {
    id: string;
    studentId: string;
    message: string;
    type: 'low_activity' | 'missed_assessment' | 'grade_drop';
    createdAt: Date;
}

// =================================================================
// 6. ADMIN & SYSTEM MODELS
// =================================================================

export interface Class {
    id: string;
    name: string;
    subject: string;
    grade: string;
    teacherId: string;
    teacherName: string;
    maxCapacity: number;
    enrolledStudents: string[]; // student IDs
    waitlist: string[]; // student IDs
    schedule: string; // e.g., "Mon/Wed/Fri 3:00 PM"
    status: 'active' | 'completed' | 'upcoming';
    startDate: Date;
    endDate: Date;
}

// =================================================================
// 7. STUDENT & FAMILY CRM MODELS (MVP Phase 1)
// =================================================================

/**
 * Learning mode for student enrollment
 */
export enum LearningMode {
    CENTRE = 'centre',
    HOME = 'home',
    AI = 'ai',
    TUTOR = 'tutor',
}

/**
 * Student enrollment status
 */
export enum StudentStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    GRADUATED = 'graduated',
    TRIAL = 'trial',
}

/**
 * Lead pipeline stage for tracking conversion funnel
 */
export enum LeadPipeline {
    NEW = 'new',
    CONTACTED = 'contacted',
    DIAGNOSTIC_BOOKED = 'diagnostic_booked',
    DIAGNOSTIC_COMPLETED = 'diagnostic_completed',
    PROPOSAL_SENT = 'proposal_sent',
    ENROLLED = 'enrolled',
    LOST = 'lost',
}

/**
 * Represents a complete student profile with academic and personal details
 */
export interface StudentProfile {
    id: string;
    // Personal Information
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender?: 'male' | 'female' | 'other';
    photoUrl?: string;
    
    // Academic Information
    grade: string; // Kindy to Year 6
    school: string;
    learningMode: LearningMode;
    status: StudentStatus;
    
    // Family Relationships
    familyId: string;
    parentIds: string[];
    
    // Enrollment Details
    enrolledDate: Date;
    graduationDate?: Date;
    currentClassId?: string;
    diagnosticCompleted: boolean;
    diagnosticResultId?: string;
    
    // Contact & Emergency
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    medicalNotes?: string;
    learningNotes?: string;
    
    // System Metadata
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
}

/**
 * Communication preferences for parents
 */
export enum ContactPreference {
    EMAIL = 'email',
    SMS = 'sms',
    BOTH = 'both',
    NONE = 'none',
}

/**
 * Represents a parent/guardian in the system
 */
export interface ParentProfile {
    id: string;
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    
    // Family Relationships
    familyId: string;
    studentIds: string[]; // Children this parent can access
    
    // Communication
    preferredContact: ContactPreference;
    receiveEmails: boolean;
    receiveSMS: boolean;
    language?: string; // Default: English
    
    // Address
    address?: {
        street: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    
    // System Metadata
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
}

/**
 * Represents a family unit containing parents and students
 */
export interface FamilyAccount {
    id: string;
    // Family Information
    familyName: string;
    parentIds: string[];
    studentIds: string[];
    
    // Contact Information
    primaryEmail: string;
    primaryPhone: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    
    // Emergency Contact
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
    
    // Referral & Marketing
    referralSource?: 'website' | 'referral' | 'social' | 'phone' | 'walk-in' | 'other';
    referredBy?: string; // Family ID if referred by another family
    referralCredit?: number; // Credit amount for referrals
    
    // Billing Information
    billingEmail?: string;
    billingNotes?: string;
    paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'online';
    
    // System Metadata
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

/**
 * Lead/Enquiry status tracking
 */
export enum LeadStatus {
    NEW = 'new',
    CONTACTED = 'contacted',
    DIAGNOSTIC_BOOKED = 'diagnostic_booked',
    DIAGNOSTIC_COMPLETED = 'diagnostic_completed',
    ENROLLED = 'enrolled',
    NOT_ENROLLED = 'not_enrolled',
}

/**
 * Represents a prospective student enquiry/lead
 */
export interface Lead {
    id: string;
    // Contact Information
    studentName: string;
    studentGrade: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    
    // Lead Details
    source: 'website' | 'referral' | 'social' | 'phone' | 'walk-in' | 'other';
    status: LeadStatus;
    pipeline: LeadPipeline;
    parentConcern: string;
    notes: string[];
    
    // Assignment & Follow-up
    assignedTo: string; // Admin user ID
    createdDate: Date;
    lastFollowUp?: Date;
    nextFollowUp?: Date;
    
    // Related Records
    diagnosticBookingId?: string;
    diagnosticResultId?: string;
    enrolledStudentId?: string;
    familyId?: string; // If converted to family
    
    // System Metadata
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Diagnostic assessment booking
 */
export interface DiagnosticBooking {
    id: string;
    leadId?: string;
    studentName: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    studentGrade: string;
    
    // Booking Details
    date: Date;
    timeSlot: string; // "9:00 AM", "10:30 AM", etc.
    duration: number; // minutes
    
    // Status
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
    
    // Results (after completion)
    resultId?: string;
    score?: number;
    recommendedLevel?: string;
    
    // Notes
    adminNotes?: string;
    parentNotes?: string;
    
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Diagnostic time slot availability
 */
export interface TimeSlot {
    id: string;
    date: Date;
    time: string;
    maxCapacity: number;
    bookedCount: number;
    isAvailable: boolean;
}

/**
 * Class schedule and capacity for enrolment management
 */
export interface EnrolmentClass {
    id: string;
    name: string; // e.g., "Year 3 Math - Monday 4pm"
    level: string; // Kindy to Year 6
    subject: string;
    teacherId: string;
    teacherName: string;
    roomId?: string;
    dayOfWeek: string; // Monday, Tuesday, etc.
    startTime: string; // "4:00 PM"
    endTime: string; // "5:30 PM"
    maxCapacity: number;
    enrolledCount: number;
    waitlistCount: number;
    status: 'active' | 'full' | 'waitlist' | 'cancelled' | 'completed';
    termStart: Date;
    termEnd: Date;
    description?: string;
}

/**
 * Student enrolment in a class
 */
export interface Enrolment {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    enrolmentDate: Date;
    status: 'active' | 'pending' | 'completed' | 'withdrawn' | 'waitlisted';
    enrolmentType: 'permanent' | 'temporary' | 'makeup';
    feeAmount: number;
    discountApplied?: number;
    notes?: string;
    withdrawReason?: string;
    withdrawDate?: Date;
}

/**
 * Waitlist entry for full classes
 */
export interface WaitlistEntry {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    addedDate: Date;
    position: number;
    status: 'waiting' | 'offered' | 'enrolled' | 'declined' | 'removed';
    parentEmail: string;
    parentPhone: string;
    notes?: string;
}

// =================================================================
// PHASE 4: ATTENDANCE & HOMEWORK TRACKING
// =================================================================

export enum AttendanceStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
    LATE = 'late',
    EXCUSED = 'excused',
    EARLY_DISMISSAL = 'early_dismissal',
}

export interface AttendanceRecord {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    date: Date;
    status: AttendanceStatus;
    checkInTime?: Date;
    checkOutTime?: Date;
    notes?: string;
    markedBy: string; // Teacher or admin ID
    markedAt: Date;
}

export enum HomeworkStatus {
    ASSIGNED = 'assigned',
    SUBMITTED = 'submitted',
    GRADED = 'graded',
    OVERDUE = 'overdue',
    EXCUSED = 'excused',
    NOT_SUBMITTED = 'not_submitted',
    PARTIAL = 'partial',
}

export enum HomeworkQuality {
    EXCELLENT = 'excellent',
    GOOD = 'good',
    NEEDS_IMPROVEMENT = 'needs_improvement',
}

export interface HomeworkAssignment {
    id: string;
    classId: string;
    className: string;
    title: string;
    description: string;
    subject: string;
    bookletNumber?: number;
    pageNumber?: number;
    assignedDate: Date;
    dueDate: Date;
    attachments?: string[]; // File URLs
    maxPoints?: number;
    status: 'active' | 'archived' | 'cancelled';
    createdBy: string; // Teacher ID
    createdAt: Date;
}

export interface HomeworkSubmission {
    id: string;
    assignmentId: string;
    studentId: string;
    studentName: string;
    submissionDate?: Date;
    status: HomeworkStatus;
    score?: number;
    quality?: HomeworkQuality;
    feedback?: string;
    teacherNotes?: string;
    attachments?: string[]; // Student submission files
    gradedBy?: string; // Teacher ID
    gradedAt?: Date;
    lateSubmission: boolean;
}

export interface TeacherObservation {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    date: Date;
    observation: string;
    category: 'behavior' | 'academic' | 'social' | 'participation' | 'improvement' | 'concern';
    severity?: 'low' | 'medium' | 'high';
    recordedBy: string; // Teacher ID
    recordedAt: Date;
    followUpRequired: boolean;
    followUpDate?: Date;
}

// Makeup Session Status (Phase 6 - Make-Up Lessons)
export enum MakeUpOption {
    ALTERNATE_CLASS = 'alternate_class',
    BOOKLET_CATCHUP = 'booklet_catchup',
    AI_TASKS = 'ai_tasks',
    TUTOR_SESSION = 'tutor_session',
}

export enum AcademicImportance {
    CRITICAL = 'critical',
    IMPORTANT = 'important',
    OPTIONAL = 'optional',
}

export interface MissedLessonConcept {
    conceptId: string;
    conceptName: string;
    bookletNumber: string;
    pageNumber?: string;
    importance: AcademicImportance;
}

export interface MakeupSession {
    id: string;
    studentId: string;
    studentName: string;
    originalClassId: string;
    originalClassName: string;
    originalDate: Date;
    absenceReason?: string;
    // Phase 6 enhancements
    missedConcepts: MissedLessonConcept[];
    academicImportance: AcademicImportance;
    makeUpOption: MakeUpOption;
    bookletCollected: boolean;
    bookletCollectedDate?: Date;
    independentCheckRequired: boolean;
    independentCheckCompleted: boolean;
    independentCheckNotes?: string;
    // Existing fields
    makeupClassId?: string;
    makeupClassName?: string;
    makeupDate?: Date;
    status: 'pending' | 'scheduled' | 'completed' | 'cancelled' | 'waived' | 'booklet_assigned' | 'ai_assigned';
    createdBy: string;
    createdAt: Date;
    notes?: string;
    completedDate?: Date;
}

// =================================================================
// Phase 7: Billing & Payments
// =================================================================

export enum InvoiceStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    PAID = 'paid',
    OVERDUE = 'overdue',
    PARTIALLY_PAID = 'partially_paid',
    CANCELLED = 'cancelled',
}

export enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    BANK_TRANSFER = 'bank_transfer',
    ONLINE = 'online',
}

export enum DiscountType {
    SIBLING = 'sibling',
    REFERRAL = 'referral',
    EARLY_PAYMENT = 'early_payment',
    CUSTOM = 'custom',
}

export enum ProRataCalculation {
    PER_WEEK = 'per_week',
    PER_CLASS = 'per_class',
    DAILY = 'daily',
}

export interface FeeRule {
    id: string;
    level: string; // e.g., 'Year 1', 'Year 2', etc.
    classType: string; // e.g., 'regular', 'advanced', 'intensive'
    standardFee: number; // in dollars
    termLength: number; // in weeks
    proRataEnabled: boolean;
    proRataCalculation: ProRataCalculation;
    isActive: boolean;
    effectiveFrom: Date;
    effectiveTo?: Date;
    notes?: string;
}

export interface Discount {
    id: string;
    type: DiscountType;
    name: string;
    description: string;
    valueType: 'percentage' | 'fixed';
    value: number; // e.g., 10 for 10% or $10
    maxUses?: number;
    usedCount: number;
    isActive: boolean;
    validFrom: Date;
    validTo?: Date;
    applicableLevels?: string[];
    notes?: string;
}

export interface InvoiceLineItem {
    description: string;
    amount: number;
    enrolmentId?: string;
    classId?: string;
    termStart?: Date;
    termEnd?: Date;
}

export interface Invoice {
    id: string;
    familyId: string;
    studentIds: string[];
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    subtotal: number;
    discountAmount: number;
    creditAmount: number;
    totalAmount: number;
    paidAmount: number;
    outstandingAmount: number;
    status: InvoiceStatus;
    lineItems: InvoiceLineItem[];
    appliedDiscounts: string[]; // discount IDs
    notes?: string;
    sentAt?: Date;
    paidAt?: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Payment {
    id: string;
    invoiceId: string;
    familyId: string;
    studentIds: string[];
    amount: number;
    method: PaymentMethod;
    paymentDate: Date;
    recordedBy: string; // billing admin ID
    reference?: string; // transaction reference
    notes?: string;
    createdAt: Date;
}

export interface ReferralCredit {
    id: string;
    referrerFamilyId: string;
    referredFamilyId: string;
    creditAmount: number;
    status: 'pending' | 'applied' | 'used' | 'expired';
    issuedAt: Date;
    expiresAt?: Date;
    appliedToInvoiceId?: string;
    notes?: string;
}

export interface BillingReminder {
    id: string;
    invoiceId: string;
    familyId: string;
    reminderType: 'upcoming' | 'overdue' | 'final_notice';
    sentAt: Date;
    sentVia: 'email' | 'sms' | 'both';
    status: 'sent' | 'failed' | 'bounced';
}

export interface SystemMetrics {
    totalUsers: number;
    activeStudents: number;
    activeTeachers: number;
    totalClasses: number;
    totalAssessments: number;
    averageMasteryScore: number;
    platformUptime: number; // percentage
    apiResponseTime: number; // milliseconds
    storageUsed: string;
    lastBackup: Date;
}

export interface AdminReport {
    id: string;
    title: string;
    type: 'student_performance' | 'class_analytics' | 'system_usage' | 'financial' | 'attendance';
    generatedAt: Date;
    generatedBy: string;
    data: any;
    format: 'pdf' | 'csv' | 'excel';
}

export interface BulkEmail {
    id: string;
    subject: string;
    body: string;
    recipientType: 'all_students' | 'all_teachers' | 'all_parents' | 'specific_class' | 'at_risk_students';
    recipientCount: number;
    sentAt: Date;
    sentBy: string;
    status: 'sent' | 'draft' | 'scheduled' | 'failed';
}
