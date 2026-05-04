import { AttendanceRecord, AttendanceStatus, HomeworkAssignment, HomeworkStatus, HomeworkSubmission } from '@/lib/pcdc-types';

// =================================================================
// ATTENDANCE RECORDS
// =================================================================

export const attendanceRecords: AttendanceRecord[] = [
  // Today's attendance - Year 3 Math Monday
  {
    id: 'att-1',
    studentId: 'stu-1',
    studentName: 'Emma Thompson',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.PRESENT,
    checkInTime: new Date('2026-05-04T15:55:00'),
    checkOutTime: new Date('2026-05-04T17:35:00'),
    markedBy: 'teacher-1',
    markedAt: new Date('2026-05-04T16:05:00'),
  },
  {
    id: 'att-2',
    studentId: 'stu-2',
    studentName: 'Liam Patel',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.PRESENT,
    checkInTime: new Date('2026-05-04T15:58:00'),
    checkOutTime: new Date('2026-05-04T17:32:00'),
    markedBy: 'teacher-1',
    markedAt: new Date('2026-05-04T16:05:00'),
  },
  {
    id: 'att-3',
    studentId: 'stu-3',
    studentName: 'Sophia Chen',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.LATE,
    checkInTime: new Date('2026-05-04T16:15:00'),
    checkOutTime: new Date('2026-05-04T17:35:00'),
    notes: 'Arrived 15 minutes late due to traffic',
    markedBy: 'teacher-1',
    markedAt: new Date('2026-05-04T16:15:00'),
  },
  {
    id: 'att-4',
    studentId: 'stu-4',
    studentName: 'Noah Williams',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.ABSENT,
    notes: 'Not feeling well - parent called',
    markedBy: 'teacher-1',
    markedAt: new Date('2026-05-04T16:05:00'),
  },

  // Year 5 Advanced Math
  {
    id: 'att-5',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.PRESENT,
    checkInTime: new Date('2026-05-04T09:55:00'),
    checkOutTime: new Date('2026-05-04T11:35:00'),
    markedBy: 'teacher-2',
    markedAt: new Date('2026-05-04T10:05:00'),
  },
  {
    id: 'att-6',
    studentId: 'stu-6',
    studentName: 'Ethan Brown',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    date: new Date('2026-05-04'),
    status: AttendanceStatus.EXCUSED,
    notes: 'Family event - pre-approved absence',
    markedBy: 'teacher-2',
    markedAt: new Date('2026-05-04T10:05:00'),
  },

  // Previous day records
  {
    id: 'att-7',
    studentId: 'stu-1',
    studentName: 'Emma Thompson',
    classId: 'class-2',
    className: 'Year 3 Mathematics - Wednesday 4:00 PM',
    date: new Date('2026-04-29'),
    status: AttendanceStatus.PRESENT,
    checkInTime: new Date('2026-04-29T15:52:00'),
    checkOutTime: new Date('2026-04-29T17:33:00'),
    markedBy: 'teacher-1',
    markedAt: new Date('2026-04-29T16:05:00'),
  },
  {
    id: 'att-8',
    studentId: 'stu-7',
    studentName: 'Ava Johnson',
    classId: 'class-4',
    className: 'Year 1 Literacy Foundation',
    date: new Date('2026-05-03'),
    status: AttendanceStatus.EARLY_DISMISSAL,
    checkInTime: new Date('2026-05-03T09:55:00'),
    checkOutTime: new Date('2026-05-03T10:45:00'),
    notes: 'Picked up early for dental appointment',
    markedBy: 'teacher-3',
    markedAt: new Date('2026-05-03T10:00:00'),
  },
];

// =================================================================
// HOMEWORK ASSIGNMENTS
// =================================================================

export const homeworkAssignments: HomeworkAssignment[] = [
  {
    id: 'hw-1',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    title: 'Multiplication Tables Practice',
    description: 'Complete multiplication tables 6-9. Practice at least 3 times each.',
    subject: 'Mathematics',
    assignedDate: new Date('2026-05-04'),
    dueDate: new Date('2026-05-11'),
    maxPoints: 100,
    status: 'active',
    createdBy: 'teacher-1',
    createdAt: new Date('2026-05-04T16:30:00'),
  },
  {
    id: 'hw-2',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    title: 'Word Problems - Week 5',
    description: 'Solve 10 word problems involving addition and subtraction. Show your working.',
    subject: 'Mathematics',
    assignedDate: new Date('2026-04-27'),
    dueDate: new Date('2026-05-04'),
    maxPoints: 100,
    status: 'active',
    createdBy: 'teacher-1',
    createdAt: new Date('2026-04-27T16:30:00'),
  },
  {
    id: 'hw-3',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    title: 'Fraction Operations',
    description: 'Complete worksheet on adding, subtracting, and simplifying fractions.',
    subject: 'Mathematics',
    assignedDate: new Date('2026-05-02'),
    dueDate: new Date('2026-05-09'),
    maxPoints: 100,
    status: 'active',
    createdBy: 'teacher-2',
    createdAt: new Date('2026-05-02T10:30:00'),
  },
  {
    id: 'hw-4',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    title: 'Decimal Conversion Practice',
    description: 'Convert 20 fractions to decimals and vice versa.',
    subject: 'Mathematics',
    assignedDate: new Date('2026-04-25'),
    dueDate: new Date('2026-05-02'),
    maxPoints: 100,
    status: 'archived',
    createdBy: 'teacher-2',
    createdAt: new Date('2026-04-25T10:30:00'),
  },
  {
    id: 'hw-5',
    classId: 'class-4',
    className: 'Year 1 Literacy Foundation',
    title: 'Reading Log - Week 5',
    description: 'Read for 15 minutes daily and record in reading log. Parent signature required.',
    subject: 'Literacy',
    assignedDate: new Date('2026-05-03'),
    dueDate: new Date('2026-05-10'),
    maxPoints: 50,
    status: 'active',
    createdBy: 'teacher-3',
    createdAt: new Date('2026-05-03T11:00:00'),
  },
  {
    id: 'hw-6',
    classId: 'class-6',
    className: 'Year 6 NAPLAN Preparation',
    title: 'NAPLAN Writing Practice',
    description: 'Write a persuasive essay on the topic: "Should students wear uniforms?"',
    subject: 'NAPLAN',
    assignedDate: new Date('2026-05-01'),
    dueDate: new Date('2026-05-08'),
    maxPoints: 100,
    status: 'active',
    createdBy: 'teacher-5',
    createdAt: new Date('2026-05-01T14:00:00'),
  },
];

// =================================================================
// HOMEWORK SUBMISSIONS
// =================================================================

export const homeworkSubmissions: HomeworkSubmission[] = [
  // Submissions for hw-2 (Word Problems - due May 4)
  {
    id: 'sub-1',
    assignmentId: 'hw-2',
    studentId: 'stu-1',
    studentName: 'Emma Thompson',
    submissionDate: new Date('2026-05-03T14:30:00'),
    status: HomeworkStatus.GRADED,
    score: 92,
    feedback: 'Excellent work! Show more steps in problem 7.',
    gradedBy: 'teacher-1',
    gradedAt: new Date('2026-05-04T10:00:00'),
    lateSubmission: false,
  },
  {
    id: 'sub-2',
    assignmentId: 'hw-2',
    studentId: 'stu-2',
    studentName: 'Liam Patel',
    submissionDate: new Date('2026-05-04T08:15:00'),
    status: HomeworkStatus.GRADED,
    score: 85,
    feedback: 'Good effort. Review carrying in addition.',
    gradedBy: 'teacher-1',
    gradedAt: new Date('2026-05-04T10:15:00'),
    lateSubmission: false,
  },
  {
    id: 'sub-3',
    assignmentId: 'hw-2',
    studentId: 'stu-3',
    studentName: 'Sophia Chen',
    submissionDate: new Date('2026-05-04T16:20:00'),
    status: HomeworkStatus.SUBMITTED,
    lateSubmission: false,
  },
  {
    id: 'sub-4',
    assignmentId: 'hw-2',
    studentId: 'stu-4',
    studentName: 'Noah Williams',
    submissionDate: new Date('2026-05-05T09:00:00'),
    status: HomeworkStatus.SUBMITTED,
    lateSubmission: true,
  },

  // Submissions for hw-3 (Fraction Operations)
  {
    id: 'sub-5',
    assignmentId: 'hw-3',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    submissionDate: new Date('2026-05-08T12:00:00'),
    status: HomeworkStatus.GRADED,
    score: 98,
    feedback: 'Perfect! Outstanding understanding of fractions.',
    gradedBy: 'teacher-2',
    gradedAt: new Date('2026-05-08T15:00:00'),
    lateSubmission: false,
  },
  {
    id: 'sub-6',
    assignmentId: 'hw-3',
    studentId: 'stu-6',
    studentName: 'Ethan Brown',
    submissionDate: new Date('2026-05-09T18:30:00'),
    status: HomeworkStatus.OVERDUE,
    lateSubmission: true,
  },

  // Submissions for hw-4 (Decimal Conversion - archived)
  {
    id: 'sub-7',
    assignmentId: 'hw-4',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    submissionDate: new Date('2026-05-01T16:00:00'),
    status: HomeworkStatus.GRADED,
    score: 100,
    feedback: 'Perfect score! Well done.',
    gradedBy: 'teacher-2',
    gradedAt: new Date('2026-05-02T09:00:00'),
    lateSubmission: false,
  },

  // Submissions for hw-5 (Reading Log)
  {
    id: 'sub-8',
    assignmentId: 'hw-5',
    studentId: 'stu-7',
    studentName: 'Ava Johnson',
    submissionDate: new Date('2026-05-09T10:00:00'),
    status: HomeworkStatus.SUBMITTED,
    lateSubmission: false,
  },
];

// =================================================================
// HELPER FUNCTIONS
// =================================================================

export function getAttendanceByClassAndDate(classId: string, date: Date): AttendanceRecord[] {
  return attendanceRecords.filter(
    record => record.classId === classId && record.date.toDateString() === date.toDateString()
  );
}

export function getAttendanceByStudent(studentId: string): AttendanceRecord[] {
  return attendanceRecords
    .filter(record => record.studentId === studentId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function calculateAttendanceRate(studentId: string, classId?: string): number {
  let records = attendanceRecords.filter(r => r.studentId === studentId);
  if (classId) {
    records = records.filter(r => r.classId === classId);
  }
  
  if (records.length === 0) return 0;
  
  const presentCount = records.filter(
    r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE
  ).length;
  
  return (presentCount / records.length) * 100;
}

export function getActiveHomeworkAssignments(classId?: string): HomeworkAssignment[] {
  let assignments = homeworkAssignments.filter(a => a.status === 'active');
  if (classId) {
    assignments = assignments.filter(a => a.classId === classId);
  }
  return assignments.sort((a, b) => b.assignedDate.getTime() - a.assignedDate.getTime());
}

export function getSubmissionsForAssignment(assignmentId: string): HomeworkSubmission[] {
  return homeworkSubmissions.filter(s => s.assignmentId === assignmentId);
}

export function getSubmissionByStudent(assignmentId: string, studentId: string): HomeworkSubmission | undefined {
  return homeworkSubmissions.find(
    s => s.assignmentId === assignmentId && s.studentId === studentId
  );
}

export function getHomeworkStats(assignmentId: string) {
  const submissions = homeworkSubmissions.filter(s => s.assignmentId === assignmentId);
  const total = submissions.length;
  const submitted = submissions.filter(s => s.status !== HomeworkStatus.OVERDUE).length;
  const graded = submissions.filter(s => s.status === HomeworkStatus.GRADED).length;
  const overdue = submissions.filter(s => s.status === HomeworkStatus.OVERDUE).length;
  const avgScore = graded > 0
    ? submissions.filter(s => s.score !== undefined).reduce((sum, s) => sum + (s.score || 0), 0) / graded
    : 0;

  return { total, submitted, graded, overdue, avgScore };
}
