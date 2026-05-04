import type { ConceptMastery as ConceptMasteryRecord, Question, StudentResponse, User } from '@/lib/pcdc-types';

import {
  conceptDependencies,
  conceptMastery as conceptMasteryRecords,
  concepts,
  questions,
  studentAttempts,
  users,
} from './data';

export const db = {
  user: {
    findMany: async () => users,
    findUnique: async (args: { where: { id: string } }) =>
      users.find((user: User) => user.id === args.where.id),
  },
  concept: {
    findMany: async () => concepts,
    findUnique: async (args: { where: { id: string } }) =>
      concepts.find((concept) => concept.id === args.where.id),
  },
  conceptDependency: {
    findMany: async (args?: { where: { prerequisiteConceptId?: string; sourceConceptId?: string } }) => {
      if (!args || !args.where) {
        return conceptDependencies;
      }

      return conceptDependencies.filter(
        (dependency) =>
          (!args.where.prerequisiteConceptId ||
            dependency.prerequisiteConceptId === args.where.prerequisiteConceptId) &&
          (!args.where.sourceConceptId || dependency.sourceConceptId === args.where.sourceConceptId),
      );
    },
  },
  question: {
    findMany: async (args?: { where: { conceptIds: { has: string } } }) => {
      if (!args || !args.where || !args.where.conceptIds) {
        return questions;
      }

      return questions.filter((question: Question) =>
        question.conceptIds.includes(args.where.conceptIds.has),
      );
    },
  },
  studentAttempt: {
    findMany: async (args: { where: { studentId: string; questionId?: string } }) => {
      return studentAttempts.filter(
        (attempt: StudentResponse) =>
          attempt.studentId === args.where.studentId &&
          (!args.where.questionId || attempt.questionId === args.where.questionId),
      );
    },
  },
  conceptMastery: {
    findMany: async (args: { where: { studentId: string } }) => {
      return conceptMasteryRecords.filter(
        (record: ConceptMasteryRecord) => record.studentId === args.where.studentId,
      );
    },
    upsert: async (args: {
      where: { studentId_conceptId: { studentId: string; conceptId: string } };
      create: Omit<ConceptMasteryRecord, 'id'>;
      update: Partial<ConceptMasteryRecord>;
    }) => {
      const { conceptId, studentId } = args.where.studentId_conceptId;
      const existingIndex = conceptMasteryRecords.findIndex(
        (record: ConceptMasteryRecord) =>
          record.studentId === studentId && record.conceptId === conceptId,
      );

      if (existingIndex > -1) {
        const updatedMastery = {
          ...conceptMasteryRecords[existingIndex],
          ...args.update,
        } satisfies ConceptMasteryRecord;

        conceptMasteryRecords[existingIndex] = updatedMastery;
        return updatedMastery;
      }

      const newMastery = {
        id: `mastery-${Date.now()}`,
        ...args.create,
      } satisfies ConceptMasteryRecord;

      conceptMasteryRecords.push(newMastery);
      return newMastery;
    },
  },
};
