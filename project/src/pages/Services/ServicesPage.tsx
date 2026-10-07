import { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Frown } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { RouteModal } from '@/components/RouteModal';
import { mockProviderService } from '@/services/providerService';
import type { ServiceProvider, ServiceType } from '@/types';

const serviceTypes: (ServiceType | 'Todos')[] = [
  'Todos',
  'Eletricista',
  'Encanador',
  'Técnico de computador',
  'Fotógrafo',
  'Professor particular',
  'Designer',
  'Manicure',
  'Personal trainer',
  'Outros serviços',
];

type SortKey = 'rating' | 'distance' | 'arrival';

export function ServicesPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ServiceType | 'Todos'>('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [routeProvider, setRouteProvider] = useState<ServiceProvider | null>(null);

  useEffect(() => {
    mockProviderService.getAll().then((data) => {
      setProviders(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = providers;

    if (activeFilter !== 'Todos') {
      result = result.filter((p) => p.serviceType === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.serviceType.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sorted.sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case 'arrival':
        sorted.sort((a, b) => a.estimatedArrivalMin - b.estimatedArrivalMin);
        break;
    }
    return sorted;
  }, [providers, activeFilter, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Mais Serviços</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Encontre o profissional ideal para a sua necessidade
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <label htmlFor="services-search" className="sr-only">Buscar por nome, serviço ou local</label>
          <input
            id="services-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, serviço ou local..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-brand-900/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="Limpar busca"
              type="button"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters((p) => !p)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
            aria-expanded={showFilters}
            aria-controls="service-filters"
            type="button"
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
          <label htmlFor="services-sort" className="sr-only">Ordenar profissionais</label>
          <select
            id="services-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="rating">Melhor avaliados</option>
            <option value="distance">Mais próximos</option>
            <option value="arrival">Chegada mais rápida</option>
          </select>
        </div>
      </div>

      <div id="service-filters" className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="flex flex-wrap gap-2">
          {serviceTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setActiveFilter(type);
                setShowFilters(false);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === type
                  ? 'bg-brand-700 text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-brand-700 dark:hover:text-brand-300'
              }`}
              aria-pressed={activeFilter === type}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {loading ? 'Carregando...' : `${filtered.length} profissional(is) encontrado(s)`}
        </p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ServiceCard key={p.id} provider={p} onShowRoute={setRouteProvider} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Frown size={48} className="text-gray-300 dark:text-gray-600" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Nenhum profissional encontrado com esses critérios.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('Todos');
              }}
              className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {routeProvider && <RouteModal provider={routeProvider} onClose={() => setRouteProvider(null)} />}
    </div>
  );
}
