import { Link } from '@tanstack/react-router';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import type { ServiceProvider } from '@/types';
import { StarRating } from '@/components/StarRating';
import { formatPrice, formatDistance } from '@/utils/format';

interface ServiceCardProps {
  provider: ServiceProvider;
  onShowRoute?: (provider: ServiceProvider) => void;
  featured?: boolean;
}

export function ServiceCard({ provider, onShowRoute, featured = false }: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-700 sm:p-5">
      <div className="flex items-start gap-4">
        <img
          src={provider.avatarUrl}
          alt={provider.name}
          className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
            {provider.name}
          </h3>
          <p className="truncate text-sm font-medium text-brand-700 dark:text-brand-300">
            {provider.serviceType}
          </p>
          <StarRating rating={provider.rating} showValue reviewsCount={provider.reviewsCount} />
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-gray-600 dark:text-gray-400">A partir de</p>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(provider.startingPrice)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
          {provider.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="font-medium text-brand-700 dark:text-brand-300">
            {formatDistance(provider.distanceKm)}
          </span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={14} className="text-gray-500 dark:text-gray-400" />
          ~{provider.estimatedArrivalMin} min
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to="/service/$id"
          params={{ id: provider.id }}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Ver detalhes
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        {onShowRoute && (
          <button
            onClick={() => onShowRoute(provider)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label={`Mostrar trajeto até ${provider.name}`}
          >
            Mostrar trajeto
          </button>
        )}
      </div>

      {featured && (
        <span className="mt-3 inline-flex w-fit rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          Em destaque
        </span>
      )}
    </div>
  );
}
