import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX } from '@icons-pack/react-simple-icons';
import { Wrench, Mail, HelpCircle, FileText, Shield, Home, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';

const socialLinks = [
    { icon: SiFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: SiInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: SiX, label: 'X (Twitter)', href: 'https://x.com' },
  ];

  const usefulLinks = [
    { icon: Home, label: 'Início', to: '/' as const },
    { icon: LayoutGrid, label: 'Mais Serviços', to: '/services' as const },
    { icon: FileText, label: 'Sobre', to: '/about' as const },
  ];

  const supportLinks = [
    { icon: HelpCircle, label: 'Central de Ajuda', href: 'mailto:ajuda@localhelp.com' },
    { icon: Mail, label: 'Contato', href: 'mailto:contato@localhelp.com' },
    { icon: Shield, label: 'Privacidade', href: 'mailto:privacidade@localhelp.com' },
  ];

export function Footer() {
const [status, setStatus] = useState<'idle' | 'success'>('idle');

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setStatus('success');
};

 useEffect(() => {
  if (status !== 'success') return;

  const timer = setTimeout(() => {
    setStatus('idle');
  }, 4000);

    return () => clearTimeout(timer);
 }, [status]);

  const year = new Date().getFullYear();


  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Wrench size={20} />
              </span>
              LocalHelp 
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              A plataforma que conecta você aos melhores profissionais da sua região.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-brand-600 hover:text-brand-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-600 dark:hover:text-brand-300"
                  aria-label={s.label}
                >
                  <s.icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Links Úteis
            </h3>
            <ul className="mt-4 space-y-2">
              {usefulLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-300"
                  >
                    <l.icon size={16} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              Suporte
            </h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-300"
                  >
                    <l.icon size={16} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <section>
        <h3>Receba novidades</h3>

        {status === 'success' ? (
          <div className="mt-4">
            <p role="status" className="font-medium text-green-700 dark:text-green-400">
              ✓ Inscrição realizada com sucesso!
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Você receberá novidades e dicas sobre serviços locais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">E-mail para receber novidades</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="seu@email.com"
                required
                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />

              <button
                type="submit"
                className="flex-shrink-0 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Inscrever-se
              </button>
            </div>
          </form>
        )}
      </section>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {year} LocalHelp — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}


{/* <button
                type="submit"
                className="flex-shrink-0 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Assinar
              </button> */}


              // min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100