'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateIdeaAction } from './actions';
import { IdeaCard } from '@/components/idea-card';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import { GeneratedIdea } from '@/ai/flows/generate-project-ideas';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  category: z.string().min(1, { message: 'Please select a category.' }),
  skillLevel: z.string().min(1, { message: 'Please select your skill level.' }),
  hours: z.number().min(1).max(40),
});

type FormData = z.infer<typeof formSchema>;
type GeneratedIdeas = { ideas: GeneratedIdea[]; } | null;

const categories = [
  'Startup', 'SaaS', 'Open Source', 'Realistic', 'Futuristic', 
  'E-commerce', 'Mobile App', 'Web App', 'Developer Tool', 'AI/ML', 
  'Blockchain', 'IoT', 'Gaming', 'Health & Fitness', 'Education', 
  'Social Media', 'Productivity', 'Finance', 'Travel', 'Entertainment', 
  'Marketplace', 'API', 'Data Science',
  // New categories
  'Climate Tech', 'Space/Astronomy', 'Accessibility', 'Smart Home/IoT', 'Robotics',
  'AR/VR', 'Quantum Computing', 'Food Tech', 'Fashion Tech', 'Legal Tech',
  'Music/Audio', 'Art/Design', 'Social Impact', 'Mental Health', 'Parenting/Family',
  'Pets/Animals', 'Sports/Fitness', 'Language Learning', 'Personal Finance', 'Remote Work',
  'Travel/Adventure', 'DIY/Maker', 'Security/Privacy', 'Elderly Care', 'Disaster Relief',
  'Urban Planning', 'Transportation', 'Agriculture', 'Renewable Energy', 'Gaming/Esports'
];
const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

export function IdeaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdeas>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      skillLevel: '',
      hours: 10,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedIdeas(null);
    const result = await generateIdeaAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setGeneratedIdeas(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Idea',
        description: result.error,
      });
    }
  }

  return (
    <div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your skill level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours per week: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={40}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 flex items-center justify-center">
                {isLoading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                {isLoading ? 'Generating...' : 'Generate Ideas'}
                {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-12">
        {generatedIdeas && (
          <div className="flex justify-end mb-4">
            <Button type="button" variant="outline" onClick={() => { setGeneratedIdeas(null); }}>
              Clear Ideas
            </Button>
          </div>
        )}
        {isLoading && (
          <div className="flex flex-col items-center mb-8">
            <Loader2 className="animate-spin h-10 w-10 text-accent mb-4" />
            <span className="text-accent font-medium">Generating ideas, please wait...</span>
          </div>
        )}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-[150px] w-full rounded-lg" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {generatedIdeas && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generatedIdeas.ideas.map((idea, index) => (
                <div key={index} className="animate-fade-in-float">
                    <IdeaCard idea={idea.idea} description={idea.description} image={idea.image} />
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
