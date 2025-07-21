'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { discussIdeaAction } from './actions';
import { Send, User, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatClient() {
  const searchParams = useSearchParams();
  const initialIdea = searchParams ? searchParams.get('idea') : null;
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialIdea) {
      setMessages([
        {
          role: 'assistant',
          content: `Let's discuss your idea: "${initialIdea}". What's on your mind? You can ask for implementation steps, potential challenges, monetization strategies, or anything else!`,
        },
      ]);
    }
  }, [initialIdea]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !initialIdea || isPending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const userInput = input;
    setInput('');

    startTransition(async () => {
      const result = await discussIdeaAction({ idea: initialIdea, userInput });
      if (result.success && result.data) {
        setMessages([...newMessages, { role: 'assistant', content: result.data.response }]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Communicating with AI',
          description: result.error,
        });
        setMessages(messages); // Revert messages on error
      }
    });
  };
  
  if (!initialIdea) {
    return (
        <div className="flex h-full items-center justify-center p-4">
            <Card className="max-w-md text-center">
                <CardHeader>
                    <CardTitle>No Idea Selected</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>It looks like you haven&apos;t selected an idea to discuss.</p>
                    <Button asChild className="mt-4">
                        <a href="/idea-generator">Generate an Idea</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-3xl py-6 px-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-xl px-4 py-3 text-sm md:text-base',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p style={{whiteSpace: 'pre-wrap'}}>{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-xl px-4 py-3 bg-muted">
                    <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-grow"
              disabled={isPending}
            />
            <Button type="submit" disabled={!input.trim() || isPending} className="bg-accent hover:bg-accent/90">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
