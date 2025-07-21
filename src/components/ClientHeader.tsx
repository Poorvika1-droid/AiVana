"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function ClientHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    // Only run on client
    const logged = localStorage.getItem('aivana-logged-in') === 'true';
    setLoggedIn(logged);
    const user = localStorage.getItem('aivana-user');
    if (user) {
      const { email } = JSON.parse(user);
      setUserEmail(email);
    }
    if (!logged && pathname !== '/login') {
      router.push('/login');
    }
  }, [router, pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.setItem('aivana-logged-in', 'false');
    localStorage.removeItem('aivana-generated-ideas');
    router.push('/login');
  };

  // Avoid hydration mismatch: don't render until state is initialized
  if (loggedIn === null) return null;

  return (
    <header className="w-full bg-white/80 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/idea-generator" className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">AiVana</span>
        </a>
        <div className="flex items-center gap-6">
          {loggedIn && userEmail && (
            <span className="text-sm text-muted-foreground mr-2">{userEmail}</span>
          )}
          {loggedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 font-semibold focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                Profile ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </a>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={() => { setDropdownOpen(false); handleLogout(); }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
} 