import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Clock, Route as RouteIcon, Loader2, MessageCircle } from 'lucide-react';
import { RouteModal } from '@/components/RouteModal';
import { StarRating } from '@/components/StarRating';
import { mockProviderService } from '@/services/providerService';
import { useAsync } from '@/hooks/useAsync';
import { formatPrice, formatDistance } from '@/utils/format';

export function ServiceDetailPage() {
  const { id } = useParams({ from: '/service/$id' });
  const { data: provider, loading } = useAsync(() => mockProviderService.getById(id), [id]);
  const [showRoute, setShowRoute] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={24} className="animate-spin text-brand-600" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Profissional não encontrado.</p>
        <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
          <ArrowLeft size={16} /> Voltar aos serviços
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/services"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-300"
      >
        <ArrowLeft size={16} /> Voltar aos serviços
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
          <img
            src={provider.avatarUrl}
            alt={provider.name}
            className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{provider.name}</h1>
                <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-300">
                  {provider.serviceType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400">A partir de</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(provider.startingPrice)}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <StarRating rating={provider.rating} size={18} showValue reviewsCount={provider.reviewsCount} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                {provider.location}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <span className="font-medium text-brand-700 dark:text-brand-300">
                  {formatDistance(provider.distanceKm)}
                </span>
                de distância
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                ~{provider.estimatedArrivalMin} min para chegar
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-6 dark:border-gray-800 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sobre o profissional</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {provider.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 p-6 dark:border-gray-800 sm:flex-row sm:p-8">
          <button
            onClick={() => setShowRoute(true)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <RouteIcon size={18} /> Mostrar trajeto
          </button>
          <a
            href={`https://wa.me/5511999999999?text=Olá%20${encodeURIComponent(provider.name)},%20encontrei%20seu%20perfil%20no%20LocalHelp%20e%20gostaria%20de%20contratar%20seu%20serviço.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            <MessageCircle size={18} /> Entrar em contato
          </a>
        </div>
      </div>

      {showRoute && <RouteModal provider={provider} onClose={() => setShowRoute(false)} />}
    </div>
  );
}
