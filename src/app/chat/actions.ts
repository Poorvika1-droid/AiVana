'use server';

import { discussProjectIdea, DiscussProjectIdeaInput } from '@/ai/flows/discuss-project-ideas';
import { z } from 'zod';

const schema = z.object({
  idea: z.string(),
  userInput: z.string(),
});

export async function discussIdeaAction(values: DiscussProjectIdeaInput) {
  try {
    const validatedValues = schema.parse(values);
    const result = await discussProjectIdea(validatedValues);
    if (!result || !result.response) {
      throw new Error('AI failed to provide a response.');
    }
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in discussIdeaAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: 'An error occurred while getting a response. ' + errorMessage };
  }
}
