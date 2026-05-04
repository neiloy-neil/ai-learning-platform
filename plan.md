# Pioneer Coaching Centre - AI-Powered Education Operating System
## Development Plan & Implementation Roadmap

This document converts the Pioneer Coaching Centre handover pack into an actionable development plan for building the MVP and subsequent phases.

---

## Project Overview

**Product Name:** Pioneer Coaching Centre - AI-Powered Education Operating System  
**Target Users:** Kindy to Year 6 students, parents, teachers, tutors, and admin staff  
**Primary Objective:** Build a student-progress-centred platform that connects academic intelligence with real tutoring centre operations  
**MVP Principle:** Build operational control and clean data foundation first; add advanced AI/adaptive learning after core workflows are stable

---

## Current State (As of May 2026)

### ✅ Completed (Demo Track)
- ✅ Role-based authentication (Student, Teacher, Parent, Admin) with demo login
- ✅ Admin dashboard with 9 navigation items (Dashboard, Analytics, Users, Classes, Content, Reports, Emails, System, Settings)
- ✅ Advanced analytics suite with charts, heatmaps, attendance tracking, item analysis
- ✅ User management system with CRUD operations
- ✅ Class management with occupancy tracking
- ✅ Reports and bulk email system interfaces
- ✅ System health monitoring dashboard
- ✅ Public marketing website with booking system, FAQ, contact forms
- ✅ Student dashboard with practice, assessments, learning path, goals, progress
- ✅ Teacher dashboard with class analytics, assignments, student workspaces
- ✅ Parent dashboard with child progress tracking
- ✅ Responsive sidebar navigation for all roles
- ✅ Glass-morphism design system with Tailwind CSS

### ❌ Missing (MVP Operations - Per Handover Pack Section B1)
- ❌ Student & Family CRM (profiles, siblings, family accounts)
- ❌ Lead & Enquiry Tracking System
- ❌ Diagnostic Assessment Workflow (booking → completion → placement)
- ❌ Class Enrolment Management (with waitlist, capacity, class changes)
- ❌ Digital Attendance System (teacher workflow)
- ❌ Homework Tracking System
- ❌ Make-Up Lessons Workflow (absence → make-up options → completion)
- ❌ Billing & Payments (fee rules, pro-rata, invoices, discounts, payment tracking)
- ❌ Weekly Assessment Workflow (assignment → completion → scoring → concept summary)
- ❌ Parent Portal v2 (progress snapshots, invoices, make-up options)
- ❌ Teacher Portal v2 (class readiness, observations, student support)
- ❌ Admin Operations Dashboard (today's classes, pending leads, invoices, make-ups)

---

## Technology Stack

**Frontend:**
- React 19.0.1
- Next.js 16.2.1 (App Router with Turbopack)
- Tailwind CSS (with glass-morphism design system)
- Framer Motion (animations)
- Lucide React (icons)
- Radix UI primitives

**Backend (Planned for Production):**
- Node.js with Next.js API Routes
- MongoDB Atlas (cloud database)
- JWT authentication with refresh tokens

**AI & Integrations (Planned):**
- OpenAI GPT-4o (quiz generation, grading, explanations)
- Stripe (payments)
- SendGrid (email notifications)
- Twilio (SMS notifications)

**Deployment:**
- Vercel (frontend - free tier for MVP)
- MongoDB Atlas (database - shared tier free for MVP)
- Pay-as-you-go API usage (OpenAI, SendGrid, Twilio)

---

## MVP Development Plan (Months 1-2)

**Priority:** Build operational control and clean data foundation first

### Phase 1: Student & Family CRM (Week 1-2)

**Objective:** Create master records for students and families with proper relationships

#### Features:
1. **Student Profile Management**
   - Personal details (name, DOB, grade, school, learning mode)
   - Academic history (previous classes, diagnostics, assessments)
   - Learning preferences (centre-based, home-supported, AI-supported, tutor-supported)
   - Photo and contact information

2. **Parent/Family Account System**
   - Parent profiles with contact details
   - Family grouping (multiple children under one account)
   - Sibling relationships
   - Communication preferences (email, SMS, in-app)
   - Emergency contacts

3. **Family Dashboard**
   - Overview of all children
   - Quick access to each child's progress
   - Shared billing and invoices
   - Family communication history

4. **Data Model:**
   ```typescript
   interface Student {
     id: string;
     firstName: string;
     lastName: string;
     dateOfBirth: Date;
     grade: string; // Kindy to Year 6
     school: string;
     learningMode: 'centre' | 'home' | 'ai' | 'tutor';
     parentId: string;
     familyId: string;
     status: 'active' | 'inactive' | 'graduated';
     enrolledDate: Date;
     diagnosticCompleted: boolean;
     currentClassId?: string;
   }

   interface Parent {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     phone: string;
     preferredContact: 'email' | 'sms' | 'both';
     familyId: string;
     studentIds: string[];
   }

   interface Family {
     id: string;
     parentIds: string[];
     studentIds: string[];
     address: string;
     emergencyContact: string;
     referralSource?: string;
     referralCredit?: number;
   }
   ```

**Acceptance Criteria:**
- ✅ Can create student profile with all required fields
- ✅ Can link multiple students to one family account
- ✅ Can add multiple parents to family
- ✅ Parent can only see their own children's data
- ✅ Search and filter students by grade, status, class
- ✅ Export student/family data

---

### Phase 2: Lead & Enquiry Management (Week 2-3)

**Objective:** Track all incoming enquiries and convert to enrolments

#### Features:
1. **Enquiry Capture**
   - Manual entry by admin
   - Web form integration (from marketing site)
   - Source tracking (website, referral, social, phone, walk-in)
   - Parent concern/requirements notes

2. **Lead Status Workflow**
   - New → Contacted → Diagnostic Booked → Diagnostic Completed → Enrolled → Not Enrolled
   - Follow-up reminders
   - Conversion tracking

3. **Lead Dashboard**
   - Pending leads requiring follow-up
   - Source analytics (which channels work best)
   - Conversion rate metrics
   - Time-to-enrolment tracking

4. **Data Model:**
   ```typescript
   interface Lead {
     id: string;
     studentName: string;
     parentName: string;
     parentEmail: string;
     parentPhone: string;
     studentGrade: string;
     source: 'website' | 'referral' | 'social' | 'phone' | 'walk-in';
     status: 'new' | 'contacted' | 'diagnostic_booked' | 'diagnostic_completed' | 'enrolled' | 'not_enrolled';
     parentConcern: string;
     notes: string[];
     assignedTo: string; // admin user ID
     createdDate: Date;
     lastFollowUp?: Date;
     nextFollowUp?: Date;
     diagnosticBookingId?: string;
     enrolledStudentId?: string;
   }
   ```

**Acceptance Criteria:**
- ✅ Can create and update lead records
- ✅ Status changes trigger appropriate workflows
- ✅ Follow-up reminders sent on time
- ✅ Lead-to-enrolment conversion tracked
- ✅ Admin dashboard shows pending leads

---

### Phase 3: Diagnostic Assessment System (Week 3-4)

**Objective:** Structured diagnostic workflow for student placement

#### Features:
1. **Diagnostic Booking**
   - Calendar integration
   - Available time slots
   - Parent confirmation/reminder emails
   - Booking status tracking

2. **Diagnostic Assessment**
   - Pre-built diagnostic questionnaires by grade
   - Adaptive difficulty based on responses
   - Auto-scoring and concept mapping
   - Result recording (manual import or auto)

3. **Placement Recommendation**
   - Identify major gaps
   - Recommend appropriate class level
   - Generate class options based on availability
   - Send recommendation to parent

4. **Workflow (Per Handover Pack D2):**
   ```
   1. Diagnostic booking created
   2. Parent receives confirmation/reminder
   3. Student completes diagnostic
   4. Result recorded or imported
   5. Placement recommendation generated
   6. Major gaps noted
   7. Class options generated
   8. Parent receives recommendation and next step
   ```

5. **Data Model:**
   ```typescript
   interface DiagnosticBooking {
     id: string;
     leadId?: string;
     studentId?: string;
     parentName: string;
     parentEmail: string;
     studentGrade: string;
     scheduledDate: Date;
     timeSlot: string;
     status: 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
     reminderSent: boolean;
   }

   interface DiagnosticResult {
     id: string;
     bookingId: string;
     studentName: string;
     grade: string;
     overallScore: number;
     conceptScores: {
       conceptId: string;
       conceptName: string;
       score: number;
       status: 'mastered' | 'developing' | 'needs_support';
     }[];
     majorGaps: string[];
     recommendedLevel: string;
     recommendedClass: string;
     completedDate: Date;
   }
   ```

**Acceptance Criteria:**
- ✅ Can book diagnostic with available time slot
- ✅ Automated reminders sent to parent
- ✅ Diagnostic can be completed and scored
- ✅ Placement recommendation generated automatically
- ✅ Parent receives recommendation with class options

---

### Phase 4: Class & Enrolment Management (Week 4-5)

**Objective:** Manage classes, capacity, enrolments, and class changes

#### Features:
1. **Class Setup**
   - Create classes by level, subject, day/time
   - Set capacity (max students per class)
   - Assign teacher
   - Room allocation
   - Class schedule (weekly recurring)

2. **Enrolment System**
   - Enrol student in class
   - Check capacity before enrolment
   - Waitlist management when full
   - Term-based or ongoing enrolment
   - Enrolment status (active, pending, completed, withdrawn)

3. **Class Change Workflow (Per Handover Pack D3):**
   ```
   1. Parent requests change
   2. Admin searches matching class availability
   3. System checks capacity
   4. Admin confirms permanent or temporary change
   5. Enrolment record updated
   6. Teacher lists updated
   7. Parent confirmation sent
   8. Audit log created
   ```

4. **Data Model:**
   ```typescript
   interface Class {
     id: string;
     name: string; // e.g., "Year 3 Math - Monday 4pm"
     level: string; // Kindy to Year 6
     subject: string;
     teacherId: string;
     roomId?: string;
     dayOfWeek: string;
     startTime: string;
     endTime: string;
     maxCapacity: number;
     enrolledStudentIds: string[];
     waitlistStudentIds: string[];
     status: 'active' | 'full' | 'cancelled' | 'completed';
     termStart: Date;
     termEnd: Date;
   }

   interface Enrolment {
     id: string;
     studentId: string;
     classId: string;
     enrolmentDate: Date;
     status: 'active' | 'pending' | 'completed' | 'withdrawn' | 'waitlisted';
     enrolmentType: 'permanent' | 'temporary' | 'makeup';
     feeAmount: number;
     discountApplied?: number;
     notes?: string;
   }
   ```

**Acceptance Criteria:**
- ✅ Can create and manage classes
- ✅ Enrolment respects capacity limits
- ✅ Waitlist created when class is full
- ✅ Class change workflow works end-to-end
- ✅ Teacher sees updated class lists
- ✅ Parent receives confirmation for changes

---

### Phase 5: Attendance & Homework Tracking (Week 5-6)

**Objective:** Digital attendance and homework submission workflow

#### Features:
1. **Digital Attendance**
   - Teacher marks attendance during class
   - Status: Present, Absent, Late, Excused
   - Real-time parent notification for absence
   - Attendance history and reports

2. **Homework Tracking**
   - Assign homework (booklet/page numbers)
   - Track submission status (Submitted, Not Submitted, Partial)
   - Teacher notes on homework quality
   - Parent visibility of homework status

3. **Weekly Class Workflow (Per Handover Pack D4):**
   ```
   1. Weekly assessment assigned
   2. Incomplete reminders sent
   3. Teacher receives class readiness report
   4. Class occurs
   5. Attendance recorded
   6. Homework submitted/not submitted recorded
   7. Teacher observations recorded
   8. Absent students trigger make-up workflow
   9. Post-class tasks assigned
   10. Progress data updated
   ```

4. **Data Model:**
   ```typescript
   interface AttendanceRecord {
     id: string;
     studentId: string;
     classId: string;
     date: Date;
     status: 'present' | 'absent' | 'late' | 'excused';
     recordedBy: string; // teacher ID
     recordedAt: Date;
     notes?: string;
   }

   interface HomeworkAssignment {
     id: string;
     classId: string;
     studentId: string;
     bookletNumber: number;
     pageNumber: number;
     assignedDate: Date;
     dueDate: Date;
     status: 'submitted' | 'not_submitted' | 'partial' | 'excused';
     submittedDate?: Date;
     teacherNotes?: string;
     quality?: 'excellent' | 'good' | 'needs_improvement';
   }
   ```

**Acceptance Criteria:**
- ✅ Teacher can mark attendance quickly
- ✅ Parent notified immediately for absence
- ✅ Homework can be assigned and tracked
- ✅ Parent can see homework status
- ✅ Attendance and homework history available

---

### Phase 6: Make-Up Lessons System (Week 6-7)

**Objective:** Manage absences and provide make-up options

#### Features:
1. **Absence Trigger**
   - Automatic make-up record creation when student marked absent
   - Missed concepts/booklets flagged
   - Academic importance rating (critical, important, optional)

2. **Make-Up Options**
   - Check available classes for same level
   - Offer alternative time slots to parent
   - AI catch-up tasks assignment
   - Booklet collection for independent work

3. **Make-Up Workflow (Per Handover Pack D5):**
   ```
   1. Student marked absent
   2. Missed lesson record created
   3. Missed concepts/booklet flagged
   4. Make-up options checked
   5. Parent offered available options
   6. Make-up scheduled or AI/booklet catch-up assigned
   7. Completion tracked
   8. Independent check assigned if lesson was academically important
   ```

4. **Data Model:**
   ```typescript
   interface MakeUpLesson {
     id: string;
     studentId: string;
     missedClassId: string;
     missedDate: Date;
     status: 'pending' | 'scheduled' | 'completed' | 'cancelled' | 'booklet_assigned';
     reason: string; // why student was absent
     makeUpOption: 'alternate_class' | 'booklet_catchup' | 'ai_tasks' | 'tutor_session';
     scheduledClassId?: string;
     scheduledDate?: Date;
     completedDate?: Date;
     bookletCollected: boolean;
     independentCheckRequired: boolean;
     independentCheckCompleted: boolean;
     notes?: string;
   }
   ```

**Acceptance Criteria:**
- ✅ Make-up record auto-created for absence
- ✅ Parent receives make-up options
- ✅ Can schedule make-up in available class
- ✅ Can assign booklet catch-up
- ✅ Tracks completion of make-up
- ✅ Independent check for critical lessons

---

### Phase 7: Billing & Payments (Week 7-8)

**Objective:** Fee calculation, invoicing, payment tracking, and overdue management

#### Features:
1. **Fee Rules Configuration**
   - Set fees by level, class type, term
   - Pro-rata calculation rules
   - Discount rules (sibling, referral, early payment)
   - Referral credit system

2. **Invoice Generation**
   - Generate invoice for enrolment
   - Apply discounts/credits automatically
   - Preview before sending
   - Send via email
   - Invoice status tracking (Draft, Sent, Paid, Overdue, Partially Paid)

3. **Payment Tracking**
   - Record payments (cash, card, bank transfer)
   - Partial payments support
   - Outstanding balance dashboard
   - Overdue reminders
   - Payment history

4. **Billing Workflow (Per Handover Pack D6):**
   ```
   1. Fee rules configured
   2. Admin selects student/family/class/term
   3. System calculates standard or pro-rata fee
   4. Discounts/credits applied if eligible
   5. Invoice previewed
   6. Invoice sent
   7. Payment recorded/matched
   8. Invoice status updated
   9. Outstanding reminder sent if overdue
   ```

5. **Data Model:**
   ```typescript
   interface FeeRule {
     id: string;
     level: string;
     classType: string;
     standardFee: number;
     termLength: number; // weeks
     proRataEnabled: boolean;
     proRataCalculation: 'per_week' | 'per_class' | 'daily';
   }

   interface Invoice {
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
     status: 'draft' | 'sent' | 'paid' | 'overdue' | 'partially_paid' | 'cancelled';
     lineItems: {
       description: string;
       amount: number;
       enrolmentId?: string;
     }[];
     notes?: string;
   }

   interface Payment {
     id: string;
     invoiceId: string;
     amount: number;
     method: 'cash' | 'card' | 'bank_transfer' | 'online';
     paymentDate: Date;
     recordedBy: string; // billing admin ID
     reference?: string; // transaction reference
     notes?: string;
   }
   ```

**Acceptance Criteria:**
- ✅ Can configure fee rules
- ✅ Pro-rata calculation works correctly
- ✅ Discounts and credits apply automatically
- ✅ Can generate and send invoices
- ✅ Can record payments (full or partial)
- ✅ Overdue dashboard shows outstanding invoices
- ✅ Automated overdue reminders sent

---

### Phase 8: Weekly Assessments & Progress Tracking (Week 8-9)

**Objective:** Assessment assignment, completion tracking, and concept-level progress

#### Features:
1. **Assessment Assignment**
   - Assign weekly assessments by class/level
   - Due date configuration
   - Auto-reminder for incomplete assessments

2. **Assessment Completion**
   - Student completes assessment
   - Auto-scoring (for MCQ) or manual entry (for written)
   - Concept-level breakdown
   - Result stored in student history

3. **Assessment to Progress Workflow (Per Handover Pack D7):**
   ```
   1. Assessment completed
   2. Responses stored/imported
   3. Score calculated
   4. Concept-level performance analyzed
   5. Strengths and gaps identified
   6. Progress snapshot updated
   7. Parent notified of results
   8. Teacher receives class summary
   ```

4. **Data Model:**
   ```typescript
   interface Assessment {
     id: string;
     title: string;
     level: string;
     conceptIds: string[];
     dueDate: Date;
     assignedTo: string[]; // class IDs or student IDs
     totalMarks: number;
     passingMarks: number;
   }

   interface AssessmentAttempt {
     id: string;
     assessmentId: string;
     studentId: string;
     submittedDate: Date;
     score: number;
     percentage: number;
     status: 'completed' | 'partial' | 'not_started' | 'late';
     conceptResults: {
       conceptId: string;
       correct: number;
       total: number;
       percentage: number;
     }[];
     teacherNotes?: string;
   }
   ```

**Acceptance Criteria:**
- ✅ Can assign assessments to classes/students
- ✅ Reminders sent for incomplete assessments
- ✅ Assessments can be completed and scored
- ✅ Concept-level breakdown available
- ✅ Parent receives results
- ✅ Teacher receives class summary
- ✅ Progress snapshot updates automatically

---

## Phase 9: Parent & Teacher Portals Enhancement (Week 9-10)

### Parent Portal Features:
1. **Child Progress Snapshot**
   - Current class and level
   - Recent assessment results
   - Attendance summary
   - Homework status
   - Upcoming classes

2. **Invoices & Payments**
   - View outstanding invoices
   - Payment history
   - Make-up options for missed classes
   - Download invoice PDFs

3. **Communication**
   - Messages from teachers/admin
   - Alerts and notifications
   - Request class changes
   - Request make-up lessons

### Teacher Portal Features:
1. **Class Readiness Report**
   - Upcoming classes today/this week
   - Student attendance expectations
   - Homework submission rates
   - Assessment completion status

2. **Student Observations**
   - Record observations during class
   - Link to specific concepts
   - Flag students needing support
   - Track intervention effectiveness

3. **Teaching Resources**
   - Lesson plans
   - Booklet references
   - Assessment materials
   - Concept summaries

**Acceptance Criteria:**
- ✅ Parent can view all child's progress
- ✅ Parent can access invoices and make-ups
- ✅ Teacher receives class readiness report
- ✅ Teacher can record observations
- ✅ Both portals are mobile-responsive

---

## Phase 10: Admin Operations Dashboard (Week 10-11)

**Objective:** Single operational control centre for admin staff

### Dashboard Widgets:
1. **Today's Overview**
   - Classes scheduled today
   - Attendance rates for today's classes
   - Pending make-up lessons
   - Upcoming diagnostics

2. **Pending Actions**
   - New leads requiring follow-up
   - Unpaid invoices
   - Make-up lessons to schedule
   - Assessment completion reminders
   - Enrolment approvals pending

3. **Key Metrics**
   - Total active students
   - Classes this week
   - Attendance rate (weekly average)
   - Assessment completion rate
   - Outstanding invoice total
   - New enquiries this week

4. **Quick Actions**
   - Add new lead
   - Book diagnostic
   - Create class
   - Generate invoice
   - Send bulk communication

**Acceptance Criteria:**
- ✅ Dashboard loads with real-time data
- ✅ All widgets show accurate information
- ✅ Quick actions work correctly
- ✅ Admin can prioritize tasks from dashboard

---

## Post-MVP Roadmap (Months 3-6)

### Phase 11: Academic Intelligence Layer (Month 3-4)
- Concept map and dependency graphs
- Evidence-based mastery tracking
- Gap detection and diagnosis
- Adaptive learning recommendations
- Spaced revision engine
- Learning pathway generation

### Phase 12: AI-Powered Features (Month 4-5)
- AI tutor for student explanations
- AI-generated practice questions
- AI lesson planning support
- AI report drafting for teachers
- AI-powered gap analysis
- Personalized learning plans

### Phase 13: Advanced Analytics & Reporting (Month 5-6)
- Predictive analytics (exam readiness)
- Cohort performance comparisons
- Teacher effectiveness metrics
- Centre performance dashboards
- Exportable reports (PDF, Excel)
- Custom report builder

### Phase 14: Integrations & Scale (Month 6+)
- MYOB/Xero integration for accounting
- SMS notifications (Twilio)
- Email automation (SendGrid)
- Calendar sync (Google Calendar)
- Mobile app development
- Franchise dashboard (if multi-centre)

---

## Implementation Priorities

### MUST HAVE (MVP - Months 1-2):
1. ✅ Student & Family CRM
2. ✅ Lead & Enquiry Tracking
3. ✅ Diagnostic Assessment System
4. ✅ Class & Enrolment Management
5. ✅ Attendance & Homework Tracking
6. ✅ Make-Up Lessons System
7. ✅ Billing & Payments
8. ✅ Weekly Assessments
9. ✅ Parent & Teacher Portals
10. ✅ Admin Operations Dashboard

### SHOULD HAVE (Phase 2 - Months 3-4):
- Concept map and mastery tracking
- Gap detection and diagnosis
- Adaptive learning recommendations
- Basic AI tutor features
- Advanced reporting

### NICE TO HAVE (Phase 3 - Months 5-6):
- Full AI content generation
- Predictive analytics
- Mobile app
- Advanced integrations
- Franchise support

---

## Development Guidelines

### Code Architecture:
- Feature-based folder structure (already in place)
- Shared UI components in `/components/ui`
- Role-specific features in `/features/[role-name]`
- API routes in `/app/api/[feature]`
- Database models in `/lib/db`
- Types in `/lib/pcdc-types.ts`

### Database Strategy:
- Start with MongoDB for flexibility
- Use Mongoose for schema validation
- Create seed scripts for development data
- Implement proper indexing for performance
- Plan migrations for schema changes

### API Design:
- RESTful API endpoints
- Consistent response format: `{ success: boolean, data: any, error?: string }`
- Input validation on all endpoints
- Authentication middleware for protected routes
- Role-based access control
- Audit logging for important actions

### Testing Strategy:
- Unit tests for business logic (mastery calculation, fee calculation, etc.)
- Integration tests for API endpoints
- E2E tests for critical workflows (enquiry → enrolment → class → assessment)
- Test data seeding for consistent test environment

### Deployment Strategy:
- Development: Local with mock data
- Staging: Vercel preview deployments
- Production: Vercel production deployment
- Database: MongoDB Atlas (separate dev/staging/prod environments)
- Environment variables for API keys and secrets

---

## Success Metrics

### MVP Launch Criteria:
- ✅ All 10 MVP features implemented and tested
- ✅ Can complete full workflow: enquiry → diagnostic → enrolment → class → assessment → progress report
- ✅ Parent portal shows accurate child data
- ✅ Teacher can manage classes and record observations
- ✅ Admin can track operations from dashboard
- ✅ Billing system generates correct invoices
- ✅ Data persists in database (no mock data for core features)

### Business Metrics (Post-Launch):
- Enquiry-to-enrolment conversion rate > 60%
- Attendance rate > 90%
- Assessment completion rate > 85%
- Invoice payment within 7 days > 80%
- Parent satisfaction score > 4.5/5
- Teacher time saved on admin > 5 hours/week

---

## Risk Management

### Technical Risks:
| Risk | Impact | Mitigation |
|------|--------|------------|
| Database performance degradation | High | Proper indexing, pagination, caching |
| API rate limiting | Medium | Implement request throttling |
| Data loss | Critical | Daily backups, transaction logs |
| Security breach | Critical | Input validation, auth guards, audit logs |

### Business Risks:
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low parent adoption | High | Simple UX, onboarding tutorials |
| Teacher resistance | Medium | Training sessions, feedback incorporation |
| Billing inaccuracies | High | Thorough testing, manual review option |
| Data privacy concerns | Critical | GDPR compliance, data encryption |

---

## Next Steps

### Immediate (This Week):
1. Review and approve this plan
2. Set up MongoDB Atlas project
3. Create database schemas for MVP features
4. Set up development environment with real database
5. Begin Phase 1: Student & Family CRM

### Week 1-2 Deliverables:
- Student profile CRUD
- Parent/family account system
- Family dashboard
- API endpoints for student/family management
- Database migrations and seed data

---

## Document History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| May 4, 2026 | 1.0 | Initial plan created based on Pioneer Coaching Centre handover pack | AI Assistant |

---

**Prepared for:** Pioneer Coaching Centre Development Team  
**Document Status:** Ready for Review  
**Last Updated:** May 4, 2026
