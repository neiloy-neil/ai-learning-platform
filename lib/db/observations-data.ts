import { TeacherObservation, MakeupSession, HomeworkSubmission, HomeworkStatus, HomeworkQuality, MakeUpOption, AcademicImportance, MissedLessonConcept } from '@/lib/pcdc-types';

// =================================================================
// TEACHER OBSERVATIONS
// =================================================================

export const teacherObservations: TeacherObservation[] = [
  {
    id: 'obs-1',
    studentId: 'stu-1',
    studentName: 'Emma Thompson',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    observation: 'Emma showed excellent problem-solving skills today. She helped her classmates understand multiplication concepts.',
    category: 'academic',
    severity: 'low',
    recordedBy: 'teacher-1',
    recordedAt: new Date('2026-05-04T17:00:00'),
    followUpRequired: false,
  },
  {
    id: 'obs-2',
    studentId: 'stu-3',
    studentName: 'Sophia Chen',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    observation: 'Sophia arrived 15 minutes late. She mentioned traffic issues. Please monitor if this becomes a pattern.',
    category: 'concern',
    severity: 'low',
    recordedBy: 'teacher-1',
    recordedAt: new Date('2026-05-04T16:20:00'),
    followUpRequired: true,
    followUpDate: new Date('2026-05-11'),
  },
  {
    id: 'obs-3',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    date: new Date('2026-05-04'),
    observation: 'Outstanding performance on fraction operations. Olivia is ready for more advanced concepts.',
    category: 'improvement',
    severity: 'low',
    recordedBy: 'teacher-2',
    recordedAt: new Date('2026-05-04T11:00:00'),
    followUpRequired: false,
  },
  {
    id: 'obs-4',
    studentId: 'stu-6',
    studentName: 'Ethan Brown',
    classId: 'class-3',
    className: 'Year 5 Advanced Mathematics',
    date: new Date('2026-05-04'),
    observation: 'Ethan seems distracted during class. He had difficulty focusing on the lesson. May need additional support.',
    category: 'behavior',
    severity: 'medium',
    recordedBy: 'teacher-2',
    recordedAt: new Date('2026-05-04T11:15:00'),
    followUpRequired: true,
    followUpDate: new Date('2026-05-06'),
  },
  {
    id: 'obs-5',
    studentId: 'stu-7',
    studentName: 'Ava Johnson',
    classId: 'class-4',
    className: 'Year 1 Literacy Foundation',
    date: new Date('2026-05-03'),
    observation: 'Ava was very enthusiastic about reading today. She voluntarily read aloud to the class.',
    category: 'participation',
    severity: 'low',
    recordedBy: 'teacher-3',
    recordedAt: new Date('2026-05-03T10:30:00'),
    followUpRequired: false,
  },
  {
    id: 'obs-6',
    studentId: 'stu-2',
    studentName: 'Liam Patel',
    classId: 'class-1',
    className: 'Year 3 Mathematics - Monday 4:00 PM',
    date: new Date('2026-05-04'),
    observation: 'Liam worked very well with his peer during group activities. Good social skills.',
    category: 'social',
    severity: 'low',
    recordedBy: 'teacher-1',
    recordedAt: new Date('2026-05-04T17:05:00'),
    followUpRequired: false,
  },
];

// =================================================================
// MAKEUP SESSIONS
// =================================================================

export const makeupSessions: MakeupSession[] = [
  {
    id: 'makeup-1',
    studentId: 'stu-4',
    studentName: 'Noah Williams',
    originalClassId: 'class-1',
    originalClassName: 'Year 3 Mathematics - Monday 4:00 PM',
    originalDate: new Date('2026-05-04'),
    absenceReason: 'Not feeling well - parent called',
    missedConcepts: [
      { conceptId: 'c1', conceptName: 'Multiplication Tables', bookletNumber: 'B3', pageNumber: 'p15-18', importance: AcademicImportance.CRITICAL },
      { conceptId: 'c2', conceptName: 'Division Basics', bookletNumber: 'B3', pageNumber: 'p19-22', importance: AcademicImportance.CRITICAL },
    ],
    academicImportance: AcademicImportance.CRITICAL,
    makeUpOption: MakeUpOption.ALTERNATE_CLASS,
    bookletCollected: false,
    independentCheckRequired: true,
    independentCheckCompleted: false,
    makeupClassId: 'class-2',
    makeupClassName: 'Year 3 Mathematics - Wednesday 4:00 PM',
    makeupDate: new Date('2026-05-06'),
    status: 'scheduled',
    createdBy: 'teacher-1',
    createdAt: new Date('2026-05-04T16:10:00'),
    notes: 'Parent confirmed Wednesday makeup session',
  },
  {
    id: 'makeup-2',
    studentId: 'stu-6',
    studentName: 'Ethan Brown',
    originalClassId: 'class-3',
    originalClassName: 'Year 5 Advanced Mathematics',
    originalDate: new Date('2026-04-30'),
    absenceReason: 'Family event - pre-approved',
    missedConcepts: [
      { conceptId: 'c3', conceptName: 'Fractions & Decimals', bookletNumber: 'B5', pageNumber: 'p25-30', importance: AcademicImportance.IMPORTANT },
    ],
    academicImportance: AcademicImportance.IMPORTANT,
    makeUpOption: MakeUpOption.ALTERNATE_CLASS,
    bookletCollected: false,
    independentCheckRequired: true,
    independentCheckCompleted: true,
    independentCheckNotes: 'Student completed follow-up quiz with 85% accuracy',
    makeupClassId: 'class-3',
    makeupClassName: 'Year 5 Advanced Mathematics',
    makeupDate: new Date('2026-05-02'),
    status: 'completed',
    completedDate: new Date('2026-05-02T11:00:00'),
    createdBy: 'teacher-2',
    createdAt: new Date('2026-04-30T10:30:00'),
    notes: 'Student attended Tuesday makeup session',
  },
  {
    id: 'makeup-3',
    studentId: 'stu-8',
    studentName: 'Isabella Davis',
    originalClassId: 'class-4',
    originalClassName: 'Year 1 Literacy Foundation',
    originalDate: new Date('2026-05-01'),
    absenceReason: 'Medical appointment',
    missedConcepts: [
      { conceptId: 'c4', conceptName: 'Letter Sounds', bookletNumber: 'B1', pageNumber: 'p8-10', importance: AcademicImportance.CRITICAL },
    ],
    academicImportance: AcademicImportance.CRITICAL,
    makeUpOption: MakeUpOption.BOOKLET_CATCHUP,
    bookletCollected: true,
    bookletCollectedDate: new Date('2026-05-02T09:00:00'),
    independentCheckRequired: true,
    independentCheckCompleted: false,
    status: 'booklet_assigned',
    createdBy: 'teacher-3',
    createdAt: new Date('2026-05-01T11:00:00'),
    notes: 'Booklet collected by parent. Student to complete at home.',
  },
  {
    id: 'makeup-4',
    studentId: 'stu-9',
    studentName: 'Mason Wilson',
    originalClassId: 'class-6',
    originalClassName: 'Year 6 NAPLAN Preparation',
    originalDate: new Date('2026-04-29'),
    absenceReason: 'Illness',
    missedConcepts: [
      { conceptId: 'c5', conceptName: 'NAPLAN Writing Practice', bookletNumber: 'B6', pageNumber: 'p12-15', importance: AcademicImportance.OPTIONAL },
    ],
    academicImportance: AcademicImportance.OPTIONAL,
    makeUpOption: MakeUpOption.AI_TASKS,
    bookletCollected: false,
    independentCheckRequired: false,
    independentCheckCompleted: false,
    status: 'ai_assigned',
    createdBy: 'teacher-5',
    createdAt: new Date('2026-04-29T14:30:00'),
    notes: 'AI catch-up tasks assigned via platform. Parent requested waiver from in-person makeup.',
  },
];

// =================================================================
// UPDATED HOMEWORK SUBMISSIONS WITH QUALITY RATINGS
// =================================================================

export const updatedHomeworkSubmissions: HomeworkSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'hw-2',
    studentId: 'stu-1',
    studentName: 'Emma Thompson',
    submissionDate: new Date('2026-05-03T14:30:00'),
    status: HomeworkStatus.GRADED,
    score: 92,
    quality: HomeworkQuality.EXCELLENT,
    feedback: 'Excellent work! Show more steps in problem 7.',
    teacherNotes: 'Emma consistently produces high-quality work. Consider providing extension tasks.',
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
    quality: HomeworkQuality.GOOD,
    feedback: 'Good effort. Review carrying in addition.',
    teacherNotes: 'Liam is improving. Needs to double-check his work.',
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
  {
    id: 'sub-5',
    assignmentId: 'hw-3',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    submissionDate: new Date('2026-05-08T12:00:00'),
    status: HomeworkStatus.GRADED,
    score: 98,
    quality: HomeworkQuality.EXCELLENT,
    feedback: 'Perfect! Outstanding understanding of fractions.',
    teacherNotes: 'Olivia is excelling. Recommend advanced placement.',
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
    quality: HomeworkQuality.NEEDS_IMPROVEMENT,
    teacherNotes: 'Ethan struggles with time management. Parent meeting recommended.',
    lateSubmission: true,
  },
  {
    id: 'sub-7',
    assignmentId: 'hw-4',
    studentId: 'stu-5',
    studentName: 'Olivia Martinez',
    submissionDate: new Date('2026-05-01T16:00:00'),
    status: HomeworkStatus.GRADED,
    score: 100,
    quality: HomeworkQuality.EXCELLENT,
    feedback: 'Perfect score! Well done.',
    gradedBy: 'teacher-2',
    gradedAt: new Date('2026-05-02T09:00:00'),
    lateSubmission: false,
  },
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

export function getObservationsByStudent(studentId: string): TeacherObservation[] {
  return teacherObservations
    .filter(obs => obs.studentId === studentId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getObservationsByClass(classId: string): TeacherObservation[] {
  return teacherObservations
    .filter(obs => obs.classId === classId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getMakeupSessionsByStudent(studentId: string): MakeupSession[] {
  return makeupSessions
    .filter(m => m.studentId === studentId)
    .sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime());
}

export function getPendingMakeupSessions(): MakeupSession[] {
  return makeupSessions.filter(m => m.status === 'pending');
}

export function getScheduledMakeupSessions(): MakeupSession[] {
  return makeupSessions.filter(m => m.status === 'scheduled');
}

export function getMakeupSessionsByDate(date: Date): MakeupSession[] {
  return makeupSessions.filter(
    m => m.makeupDate && m.makeupDate.toDateString() === date.toDateString()
  );
}

export function generateAbsenceNotification(
  studentName: string,
  className: string,
  date: Date,
  parentName: string
): string {
  return `Dear ${parentName},

This is to inform you that ${studentName} was marked absent from ${className} on ${date.toLocaleDateString()}.

If you have any questions or need to schedule a makeup session, please contact us.

Best regards,
Pioneer Coaching Centre`;
}

// =================================================================
// PHASE 6: AUTO-TRIGGER & MAKEUP OPTIONS
// =================================================================

// Auto-create makeup session when student marked absent
export function autoCreateMakeupSession(
  studentId: string,
  studentName: string,
  classId: string,
  className: string,
  absenceDate: Date,
  absenceReason: string,
  missedConcepts: MissedLessonConcept[],
  createdBy: string
): MakeupSession {
  // Determine academic importance based on missed concepts
  const hasCritical = missedConcepts.some(c => c.importance === AcademicImportance.CRITICAL);
  const academicImportance = hasCritical ? AcademicImportance.CRITICAL : 
    missedConcepts.some(c => c.importance === AcademicImportance.IMPORTANT) ? AcademicImportance.IMPORTANT : AcademicImportance.OPTIONAL;

  const makeupSession: MakeupSession = {
    id: `makeup-${Date.now()}`,
    studentId,
    studentName,
    originalClassId: classId,
    originalClassName: className,
    originalDate: absenceDate,
    absenceReason,
    missedConcepts,
    academicImportance,
    makeUpOption: MakeUpOption.ALTERNATE_CLASS, // Default option
    bookletCollected: false,
    independentCheckRequired: hasCritical,
    independentCheckCompleted: false,
    status: 'pending',
    createdBy,
    createdAt: new Date(),
  };

  // Add to in-memory array
  makeupSessions.push(makeupSession);

  return makeupSession;
}

// Find available classes for same level (makeup options checker)
export function findAvailableMakeupClasses(
  originalClassId: string,
  studentLevel: string
): Array<{ classId: string; className: string; day: string; time: string; availableSeats: number }> {
  // Import classes from enrolment data
  const { classes, getAvailableSeats } = require('@/lib/db/enrolment-data');
  
  // Find classes for same level, excluding original class
  return classes
    .filter((c: any) => c.id !== originalClassId && c.level === studentLevel && c.status === 'active')
    .map((c: any) => ({
      classId: c.id,
      className: `${c.name} - ${c.day} ${c.time}`,
      day: c.day,
      time: c.time,
      availableSeats: getAvailableSeats(c.id),
    }))
    .filter((c: any) => c.availableSeats > 0)
    .sort((a: any, b: any) => b.availableSeats - a.availableSeats);
}

// Booklet collection tracking
export function recordBookletCollection(makeupSessionId: string, collectedBy: string, collectedAt: Date = new Date()): boolean {
  const session = makeupSessions.find(m => m.id === makeupSessionId);
  if (!session) return false;

  session.bookletCollected = true;
  session.bookletCollectedDate = collectedAt;
  session.status = 'booklet_assigned';
  session.notes = `${session.notes || ''} | Booklet collected by ${collectedBy} on ${collectedAt.toLocaleDateString()}`;

  return true;
}

// Independent check completion
export function completeIndependentCheck(
  makeupSessionId: string,
  notes: string,
  completedBy: string,
  completedAt: Date = new Date()
): boolean {
  const session = makeupSessions.find(m => m.id === makeupSessionId);
  if (!session) return false;

  session.independentCheckCompleted = true;
  session.independentCheckNotes = notes;
  session.notes = `${session.notes || ''} | Independent check completed by ${completedBy} on ${completedAt.toLocaleDateString()}`;

  return true;
}

// Get makeup sessions requiring independent check
export function getMakeupsRequiringIndependentCheck(): MakeupSession[] {
  return makeupSessions.filter(
    m => m.independentCheckRequired && !m.independentCheckCompleted && m.status === 'completed'
  );
}

// Get overdue booklet collections
export function getOverdueBookletCollections(daysThreshold: number = 7): MakeupSession[] {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - daysThreshold);

  return makeupSessions.filter(
    m => m.makeUpOption === MakeUpOption.BOOKLET_CATCHUP && 
         m.status === 'booklet_assigned' && 
         !m.bookletCollected &&
         m.originalDate < threshold
  );
}
