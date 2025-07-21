export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className="h-16 w-16"
        >
          <defs>
            <radialGradient id="logo-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a18cd1" />
              <stop offset="100%" stopColor="#fbc2eb" />
            </radialGradient>
            <linearGradient id="logo-glow" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fad0c4" />
              <stop offset="1" stopColor="#ffd1ff" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#logo-gradient)" />
          <ellipse cx="32" cy="40" rx="16" ry="6" fill="url(#logo-glow)" opacity="0.4" />
          <path d="M32 12L16 32h8v12h8V32h8L32 12z" fill="#fff" stroke="#7f53ac" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="text-5xl font-extrabold tracking-tighter text-primary font-headline drop-shadow-lg">
        AiVana
      </h1>
      <p className="text-muted-foreground text-lg font-medium">Idea Alchemist</p>
    </div>
  );
}
