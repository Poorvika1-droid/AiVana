"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('aivana-user');
    if (user) {
      const { email } = JSON.parse(user);
      setEmail(email);
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">Profile</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            value={email}
            disabled
          />
        </div>
        <div className="text-center text-muted-foreground mt-6">
          <p>Welcome to your profile!<br/>You can use the menu above to explore ideas, chat with the AI, or log out.</p>
        </div>
      </div>
    </div>
  );
} 