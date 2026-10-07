import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ArrowRight, Wrench, Zap, MapPin, Users, ShieldCheck } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { RouteModal } from '@/components/RouteModal';
import { mockProviderService } from '@/services/providerService';
import { heroImage } from '@/services/mockData';
import type { ServiceProvider } from '@/types';
import { useAsync } from '@/hooks/useAsync';

export function HomePage() {
  const { data: providers, loading } = useAsync(() => mockProviderService.getAll(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [routeProvider, setRouteProvider] = useState<ServiceProvider | null>(null);

  const featured = useMemo(() => {
    if (!providers) return [];
    return providers
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [providers]);

  const searchResults = useMemo(() => {
    if (!providers || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return providers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.serviceType.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }, [providers, searchQuery]);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-950 dark:to-brand-950/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <Zap size={14} /> Conecte-se com profissionais próximos
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                Precisa de um serviço?
                <br />
                <span className="text-brand-700 dark:text-brand-300">Encontre quem está perto.</span>
              </h1>
              <p className="mt-4 max-w-lg text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                O LocalHelp conecta você a eletricistas, encanadores, fotógrafos e outros
                profissionais qualificados na sua região — com avaliação, localização e tempo estimado de chegada.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-800 hover:shadow-brand-500/30"
                >
                  Ver todos os serviços
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Como funciona?
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { icon: Users, label: 'Serviços disponíveis', value: '12+' },
                  { icon: MapPin, label: 'Categorias', value: '8' },
                  { icon: ShieldCheck, label: 'Interface responsiva', value: '100%' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <stat.icon size={20} className="mx-auto text-brand-700 dark:text-brand-300 sm:mx-0" />
                    <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Profissional realizando reparo"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-white p-4 shadow-lg dark:bg-gray-900 sm:block">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40">
                    <Wrench size={20} className="text-brand-700 dark:text-brand-300" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Serviço rápido</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Profissionais a minutos de você</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <label htmlFor="home-service-search" className="sr-only">Buscar por serviço, nome ou local</label>
            <input
              id="home-service-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por serviço, nome ou local..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-brand-900/40"
            />
          </div>
        </div>

        {searchQuery.trim() && (
          <div className="mt-6">
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para "{searchQuery}"
            </p>
            {searchResults.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((p) => (
                  <ServiceCard key={p.id} provider={p} onShowRoute={setRouteProvider} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Nenhum serviço encontrado. Tente outro termo.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Serviços em destaque</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Os profissionais mais bem avaliados da sua região
            </p>
          </div>
          <Link
            to="/services"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200 sm:inline-flex"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ServiceCard key={p.id} provider={p} onShowRoute={setRouteProvider} featured />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300"
          >
            Ver todos os serviços <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {routeProvider && (
        <RouteModal provider={routeProvider} onClose={() => setRouteProvider(null)} />
      )}
    </div>
  );
}
