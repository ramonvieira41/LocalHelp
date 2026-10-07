import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Settings, Sun, Moon, LogIn, UserPlus, LogOut, Trash2, User as UserIcon } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;

    function handleSettingsKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        settingsButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleSettingsKeyDown);
    return () => document.removeEventListener('keydown', handleSettingsKeyDown);
  }, [settingsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    mobileCloseRef.current?.focus();

    function handleMenuKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key !== 'Tab' || !mobileMenuRef.current) return;
      const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener('keydown', handleMenuKeyDown);
    return () => {
      document.removeEventListener('keydown', handleMenuKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Mais Serviços', to: '/services' as const },
    { label: 'Sobre', to: '/about' as const },
  ];

  async function handleLogout() {
    await logout();
    setSettingsOpen(false);
    setMobileOpen(false);
    navigate({ to: '/' });
  }

  async function handleDeleteAccount() {
    if (!confirm('Tem certeza? Esta ação não pode ser desfeita.')) return;
    await deleteAccount();
    setSettingsOpen(false);
    setMobileOpen(false);
    navigate({ to: '/' });
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-1">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-300"
                  activeProps={{ className: 'text-brand-700 dark:text-brand-300' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div ref={settingsRef} className="relative">
              <button
                ref={settingsButtonRef}
                onClick={() => setSettingsOpen((p) => !p)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Configurações"
                aria-expanded={settingsOpen}
                aria-controls="settings-menu"
              >
                <Settings size={22} className={settingsOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
              </button>

              <div
                id="settings-menu"
                hidden={!settingsOpen}
                className="absolute right-0 mt-2 w-56 animate-fade-in rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                  {user ? (
                    <>
                      <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <UserIcon size={16} /> Alterar dados da conta
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <LogOut size={16} /> Sair
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex w-full items-center gap-2.5 border-t border-gray-100 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-gray-800 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={16} /> Excluir conta
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <LogIn size={16} /> Entrar
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setSettingsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <UserPlus size={16} /> Criar conta
                      </Link>
                      <button
                        onClick={toggleTheme}
                        className="flex w-full items-center gap-2.5 border-t border-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        {theme === 'light' ? 'Tema escuro' : 'Tema claro'}
                      </button>
                    </>
                  )}
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="fixed inset-0 z-50 md:hidden" hidden={!mobileOpen}>
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="absolute right-0 top-0 h-full w-72 max-w-[80vw] animate-slide-in bg-white p-6 shadow-xl dark:bg-gray-950"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={mobileCloseRef}
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  activeProps={{ className: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
              {user ? (
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <UserIcon size={18} /> Configurações
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <LogOut size={18} /> Sair
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={18} /> Excluir conta
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <LogIn size={16} /> Entrar
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    <UserPlus size={16} /> Criar conta
                  </Link>
                </div>
              )}

            
            </div>
          </div>
        </div>
    </>
  );
}
