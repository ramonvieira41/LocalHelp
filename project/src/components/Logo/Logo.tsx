import { Link } from '@tanstack/react-router';
import { Wrench } from 'lucide-react';

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white transition-opacity hover:opacity-80"
      aria-label="LocalHelp — página inicial"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Wrench size={20} />
      </span>
      <span>
        LocalHelp <span className="text-brand-500"></span>
      </span>
    </Link>
  );
}
