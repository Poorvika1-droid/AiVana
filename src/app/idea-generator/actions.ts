// src/app/idea-generator/actions.ts
'use server';

import { generateProjectIdeas, GenerateProjectIdeasInput } from '@/ai/flows/generate-project-ideas';
import { z } from 'zod';

const schema = z.object({
  category: z.string(),
  skillLevel: z.string(),
  hours: z.number(),
});

export async function generateIdeaAction(values: GenerateProjectIdeasInput) {
  try {
    const validatedValues = schema.parse(values);
    const result = await generateProjectIdeas(validatedValues);
    if (!result || !result.ideas || result.ideas.length === 0) {
      throw new Error('Failed to generate any ideas.');
    }
    
    // Ensure all ideas have a valid image URL
    result.ideas.forEach(idea => {
        if (!idea.image || idea.image === 'No image generated.') {
            idea.image = 'https://placehold.co/600x400.png';
        }
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error in generateIdeaAction:', error);
    let errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    
    // Check for specific API key error message from Google's API
    if (errorMessage.includes('API key not valid')) {
      errorMessage = 'Your Gemini API key is invalid or missing. Please check your .env file and ensure the GEMINI_API_KEY is set correctly. You can get a key from Google AI Studio.';
    } else {
      errorMessage = 'An error occurred while generating ideas. Please try again. ' + errorMessage;
    }
    
    return { success: false, error: errorMessage };
  }
}
