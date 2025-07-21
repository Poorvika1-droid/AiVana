'use server';

/**
 * @fileOverview A flow for discussing project ideas with an AI chat assistant.
 *
 * - discussProjectIdea - A function that handles the discussion of a project idea.
 * - DiscussProjectIdeaInput - The input type for the discussProjectIdea function.
 * - DiscussProjectIdeaOutput - The return type for the discussProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscussProjectIdeaInputSchema = z.object({
  idea: z.string().describe('The project idea to discuss.'),
  userInput: z.string().describe('The user input or question about the idea.'),
});
export type DiscussProjectIdeaInput = z.infer<typeof DiscussProjectIdeaInputSchema>;

const DiscussProjectIdeaOutputSchema = z.object({
  response: z.string().describe('The AI chat assistant response.'),
});
export type DiscussProjectIdeaOutput = z.infer<typeof DiscussProjectIdeaOutputSchema>;

export async function discussProjectIdea(input: DiscussProjectIdeaInput): Promise<DiscussProjectIdeaOutput> {
  return discussProjectIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'discussProjectIdeaPrompt',
  input: {schema: DiscussProjectIdeaInputSchema},
  output: {schema: DiscussProjectIdeaOutputSchema},
  prompt: `You are a helpful AI chat assistant that discusses project ideas with users.

  The user has the following project idea: {{{idea}}}

  The user has the following input/question: {{{userInput}}}

  Provide a helpful and informative response to the user's input/question.`,
});

const discussProjectIdeaFlow = ai.defineFlow(
  {
    name: 'discussProjectIdeaFlow',
    inputSchema: DiscussProjectIdeaInputSchema,
    outputSchema: DiscussProjectIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
