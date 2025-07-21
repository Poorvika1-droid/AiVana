export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-8">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-muted-foreground">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/idea-generator" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition" aria-label="Go to Home">Go to Home</a>
    </div>
  );
} 