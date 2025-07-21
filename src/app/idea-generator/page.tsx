import { IdeaForm } from './idea-form';
import { Lightbulb } from 'lucide-react';

const tabs = [
  { name: 'Home', href: '/idea-generator' },
  { name: 'AI Bot', href: '/chat' },
  { name: 'Profile', href: '/profile' },
];

export default function IdeaGeneratorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary font-headline">
              AiVana
            </h1>
          </div>
        </div>
      </header>
      {/* Home Tabs */}
      <nav className="container mx-auto max-w-4xl px-4 mt-4 mb-8">
        <ul className="flex gap-6 border-b pb-2">
          {tabs.map(tab => (
            <li key={tab.name}>
              <a
                href={tab.href}
                className="px-3 py-1 rounded-t text-lg font-medium hover:text-primary transition border-b-2 border-transparent hover:border-primary"
                style={{
                  color: typeof window !== 'undefined' && window.location.pathname === tab.href ? 'var(--primary)' : undefined,
                  borderBottomColor: typeof window !== 'undefined' && window.location.pathname === tab.href ? 'var(--primary)' : 'transparent',
                }}
              >
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground font-headline">
                What Should You Build Next?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Select a category and your skill level to generate a unique project idea with the help of AI.
            </p>
        </div>
        <IdeaForm />
      </main>
    </div>
  );
}
