'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type IdeaCardProps = {
  idea: string;
  description: string;
  image: string;
  className?: string;
};

export function IdeaCard({ idea, description, image, className }: IdeaCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/chat?idea=${encodeURIComponent(idea)}`);
  };

  const isPlaceholder = image.includes('placehold.co');

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 flex flex-col',
        className
      )}
      role="button"
      aria-label={`View details for idea: ${idea}`}
    >
      <CardHeader className="p-0">
        <div className="aspect-video w-full relative">
            <Image 
                src={image} 
                alt={`Visualization for ${idea}`} 
                fill
                className="object-cover"
                data-ai-hint="abstract tech"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
             {isPlaceholder && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white/80 text-sm">Image generation failed. Placeholder shown.</p>
              </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="text-xl font-bold font-headline">{idea}</CardTitle>
        <CardDescription className="mt-2 text-sm text-muted-foreground flex-grow">{description}</CardDescription>
        <div className="flex items-center gap-2 mt-4 text-accent font-semibold">
          Discuss this idea with AI
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
