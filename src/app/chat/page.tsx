import { Suspense } from 'react';
import { ChatClient } from './chat-client';
import { Lightbulb, MessageCircle, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ChatLoadingSkeleton() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow p-6 space-y-4">
                <Skeleton className="h-16 w-3/4 rounded-lg" />
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-1/2 rounded-lg" />
                </div>
                <Skeleton className="h-24 w-4/5 rounded-lg" />
            </div>
            <div className="p-4 border-t">
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
        </div>
    )
}

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/idea-generator" className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold text-primary font-headline">
                        AiVana
                    </h1>
                </Link>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                        <MessageCircle className="h-5 w-5" />
                        <span>AI Chat</span>
                    </div>
                     <Button variant="outline" asChild>
                        <Link href="/idea-generator" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Ideas
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
        <main className="flex-grow overflow-hidden">
            <Suspense fallback={<ChatLoadingSkeleton />}>
                <ChatClient />
            </Suspense>
        </main>
    </div>
  );
}
