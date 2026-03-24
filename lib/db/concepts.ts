
// lib/db/concepts.ts
import { concepts, conceptDependencies } from './data';

// This file simulates a Prisma model for concepts.

export const db = {
  concept: {
    findMany: async () => {
      return concepts;
    },
    findUnique: async (args: { where: { id: string } }) => {
      return concepts.find(c => c.id === args.where.id);
    },
  },
  conceptDependency: {
    findMany: async (args?: { where: { prerequisiteConceptId?: string, sourceConceptId?: string } }) => {
        if (!args || !args.where) return conceptDependencies;
        return conceptDependencies.filter(dep => 
            (!args.where.prerequisiteConceptId || dep.prerequisiteConceptId === args.where.prerequisiteConceptId) &&
            (!args.where.sourceConceptId || dep.sourceConceptId === args.where.sourceConceptId)
        );
    }
  }
};
