import { EnrolmentClass, Enrolment, WaitlistEntry } from '@/lib/pcdc-types';

// =================================================================
// CLASSES
// =================================================================

export const classes: EnrolmentClass[] = [
  {
    id: 'class-1',
    name: 'Year 3 Mathematics - Monday 4:00 PM',
    level: 'Year 3',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Mr. Anderson',
    roomId: 'room-101',
    dayOfWeek: 'Monday',
    startTime: '4:00 PM',
    endTime: '5:30 PM',
    maxCapacity: 12,
    enrolledCount: 10,
    waitlistCount: 2,
    status: 'active',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'Foundational mathematics for Year 3 students focusing on number sense and problem solving',
  },
  {
    id: 'class-2',
    name: 'Year 3 Mathematics - Wednesday 4:00 PM',
    level: 'Year 3',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Mr. Anderson',
    roomId: 'room-101',
    dayOfWeek: 'Wednesday',
    startTime: '4:00 PM',
    endTime: '5:30 PM',
    maxCapacity: 12,
    enrolledCount: 12,
    waitlistCount: 3,
    status: 'full',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'Foundational mathematics for Year 3 students - Wednesday session',
  },
  {
    id: 'class-3',
    name: 'Year 5 Advanced Mathematics - Tuesday 5:00 PM',
    level: 'Year 5',
    subject: 'Mathematics',
    teacherId: 'teacher-2',
    teacherName: 'Ms. Taylor',
    roomId: 'room-102',
    dayOfWeek: 'Tuesday',
    startTime: '5:00 PM',
    endTime: '6:30 PM',
    maxCapacity: 10,
    enrolledCount: 8,
    waitlistCount: 0,
    status: 'active',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'Advanced mathematics for high-achieving Year 5 students',
  },
  {
    id: 'class-4',
    name: 'Year 1 Literacy - Thursday 3:30 PM',
    level: 'Year 1',
    subject: 'Literacy',
    teacherId: 'teacher-3',
    teacherName: 'Mrs. Roberts',
    roomId: 'room-103',
    dayOfWeek: 'Thursday',
    startTime: '3:30 PM',
    endTime: '4:30 PM',
    maxCapacity: 8,
    enrolledCount: 6,
    waitlistCount: 1,
    status: 'active',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'Reading and writing fundamentals for Year 1 students',
  },
  {
    id: 'class-5',
    name: 'Kindy Prep - Friday 10:00 AM',
    level: 'Kindy',
    subject: 'Foundation',
    teacherId: 'teacher-3',
    teacherName: 'Mrs. Roberts',
    roomId: 'room-103',
    dayOfWeek: 'Friday',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    maxCapacity: 6,
    enrolledCount: 5,
    waitlistCount: 0,
    status: 'active',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'School readiness program for Kindy students',
  },
  {
    id: 'class-6',
    name: 'Year 6 NAPLAN Prep - Saturday 9:00 AM',
    level: 'Year 6',
    subject: 'NAPLAN Preparation',
    teacherId: 'teacher-2',
    teacherName: 'Ms. Taylor',
    roomId: 'room-102',
    dayOfWeek: 'Saturday',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    maxCapacity: 15,
    enrolledCount: 14,
    waitlistCount: 4,
    status: 'full',
    termStart: new Date('2026-05-01'),
    termEnd: new Date('2026-07-31'),
    description: 'Intensive NAPLAN preparation for Year 6 students',
  },
];

// =================================================================
// ENROLMENTS
// =================================================================

export const enrolments: Enrolment[] = [
  {
    id: 'enrol-1',
    studentId: 'student-1',
    studentName: 'Emily Johnson',
    classId: 'class-1',
    enrolmentDate: new Date('2026-04-15'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 245,
    notes: 'Excellent progress in mathematics',
  },
  {
    id: 'enrol-2',
    studentId: 'student-2',
    studentName: 'Liam Johnson',
    classId: 'class-5',
    enrolmentDate: new Date('2026-04-20'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 180,
  },
  {
    id: 'enrol-3',
    studentId: 'student-3',
    studentName: 'Sophia Chen',
    classId: 'class-2',
    enrolmentDate: new Date('2026-04-10'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 245,
    discountApplied: 20,
    notes: 'Sibling discount applied',
  },
  {
    id: 'enrol-4',
    studentId: 'student-4',
    studentName: 'Noah Williams',
    classId: 'class-3',
    enrolmentDate: new Date('2026-04-18'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 280,
  },
  {
    id: 'enrol-5',
    studentId: 'student-5',
    studentName: 'Olivia Brown',
    classId: 'class-4',
    enrolmentDate: new Date('2026-04-22'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 165,
  },
  {
    id: 'enrol-6',
    studentId: 'student-6',
    studentName: 'Ava Taylor',
    classId: 'class-6',
    enrolmentDate: new Date('2026-04-12'),
    status: 'active',
    enrolmentType: 'permanent',
    feeAmount: 320,
    notes: 'NAPLAN preparation intensive',
  },
  {
    id: 'enrol-7',
    studentId: 'student-1',
    studentName: 'Emily Johnson',
    classId: 'class-3',
    enrolmentDate: new Date('2026-04-25'),
    status: 'active',
    enrolmentType: 'temporary',
    feeAmount: 280,
    notes: 'Temporary advanced class for 4 weeks',
  },
];

// =================================================================
// WAITLIST
// =================================================================

export const waitlist: WaitlistEntry[] = [
  {
    id: 'wait-1',
    studentId: 'student-7',
    studentName: 'Charlotte Martinez',
    classId: 'class-2',
    addedDate: new Date('2026-05-01'),
    position: 1,
    status: 'waiting',
    parentEmail: 'carlos.martinez@email.com',
    parentPhone: '+61 489 012 345',
    notes: 'Very interested, flexible with days',
  },
  {
    id: 'wait-2',
    studentId: 'student-8',
    studentName: 'Mason Davis',
    classId: 'class-2',
    addedDate: new Date('2026-05-02'),
    position: 2,
    status: 'waiting',
    parentEmail: 'jennifer.davis@email.com',
    parentPhone: '+61 467 890 123',
  },
  {
    id: 'wait-3',
    studentId: 'student-9',
    studentName: 'Isabella Wilson',
    classId: 'class-2',
    addedDate: new Date('2026-05-03'),
    position: 3,
    status: 'waiting',
    parentEmail: 'patricia.wilson@email.com',
    parentPhone: '+61 478 901 234',
  },
  {
    id: 'wait-4',
    studentId: 'student-10',
    studentName: 'Ethan Anderson',
    classId: 'class-1',
    addedDate: new Date('2026-04-28'),
    position: 1,
    status: 'waiting',
    parentEmail: 'anderson.family@email.com',
    parentPhone: '+61 490 123 456',
  },
  {
    id: 'wait-5',
    studentId: 'student-11',
    studentName: 'Mia Thomas',
    classId: 'class-1',
    addedDate: new Date('2026-04-29'),
    position: 2,
    status: 'waiting',
    parentEmail: 'thomas.m@email.com',
    parentPhone: '+61 401 234 567',
  },
  {
    id: 'wait-6',
    studentId: 'student-12',
    studentName: 'Lucas Jackson',
    classId: 'class-6',
    addedDate: new Date('2026-04-25'),
    position: 1,
    status: 'offered',
    parentEmail: 'jackson.l@email.com',
    parentPhone: '+61 412 345 678',
    notes: 'Spot offered, waiting for confirmation',
  },
  {
    id: 'wait-7',
    studentId: 'student-13',
    studentName: 'Amelia White',
    classId: 'class-6',
    addedDate: new Date('2026-04-26'),
    position: 2,
    status: 'waiting',
    parentEmail: 'white.a@email.com',
    parentPhone: '+61 423 456 789',
  },
];

// =================================================================
// HELPER FUNCTIONS
// =================================================================

export function getClassById(id: string): EnrolmentClass | undefined {
  return classes.find(c => c.id === id);
}

export function getClassesByLevel(level: string): EnrolmentClass[] {
  return classes.filter(c => c.level === level);
}

export function getClassesBySubject(subject: string): EnrolmentClass[] {
  return classes.filter(c => c.subject === subject);
}

export function getAvailableClasses(): EnrolmentClass[] {
  return classes.filter(c => c.status === 'active' && c.enrolledCount < c.maxCapacity);
}

export function getEnrolmentsByStudentId(studentId: string): Enrolment[] {
  return enrolments.filter(e => e.studentId === studentId);
}

export function getEnrolmentsByClassId(classId: string): Enrolment[] {
  return enrolments.filter(e => e.classId === classId);
}

export function getWaitlistByClassId(classId: string): WaitlistEntry[] {
  return waitlist
    .filter(w => w.classId === classId && w.status === 'waiting')
    .sort((a, b) => a.position - b.position);
}

export function getOccupancyRate(classId: string): number {
  const cls = getClassById(classId);
  if (!cls) return 0;
  return (cls.enrolledCount / cls.maxCapacity) * 100;
}
