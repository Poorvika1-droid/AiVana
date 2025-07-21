"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (isSignUp) {
      // Sign up: store new user
      localStorage.setItem('aivana-user', JSON.stringify({ email, password }));
      localStorage.setItem('aivana-logged-in', 'true');
      router.push('/idea-generator');
    } else {
      // Login: check credentials
      const user = localStorage.getItem('aivana-user');
      if (user) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(user);
        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem('aivana-logged-in', 'true');
          router.push('/idea-generator');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError('No account found. Please sign up first.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">{isSignUp ? 'Sign Up for AiVana' : 'Login to AiVana'}</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition">{isSignUp ? 'Sign Up' : 'Login'}</button>
        <div className="text-center text-sm text-muted-foreground mt-2">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => { setIsSignUp(false); setError(''); }}>
                Login
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => { setIsSignUp(true); setError(''); }}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
} 