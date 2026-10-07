import { useEffect, useRef } from 'react';
import { X, MapPin, Loader2 } from 'lucide-react';
import { RouteMap } from '@/components/RouteMap';
import { useGeolocation } from '@/hooks/useGeolocation';
import type { ServiceProvider } from '@/types';
import { formatDistance } from '@/utils/format';

interface RouteModalProps {
  provider: ServiceProvider;
  onClose: () => void;
}

export function RouteModal({ provider, onClose }: RouteModalProps) {
  const { location, error, loading } = useGeolocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const userLat = location?.lat ?? -23.5505;
  const userLng = location?.lng ?? -46.6333;

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeButtonRef.current?.focus();

    function handleDialogKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
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

    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDialogKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="route-modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-brand-600" />
            <div>
              <h2 id="route-modal-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Trajeto até {provider.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {provider.location} • {formatDistance(provider.distanceKm)} de distância
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex-1 min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                <Loader2 size={24} className="animate-spin text-brand-600" />
                <p className="text-sm">Obtendo sua localização...</p>
              </div>
            </div>
          )}
          {error && !loading && (
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <MapPin size={32} className="mx-auto text-gray-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Exibindo trajeto aproximado a partir do centro da cidade.
                </p>
              </div>
            </div>
          )}
          <RouteMap
            userLat={userLat}
            userLng={userLng}
            destLat={provider.lat}
            destLng={provider.lng}
            destinationLabel={provider.name}
          />
        </div>

        <div className="border-t border-gray-200 px-5 py-3 dark:border-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Trajeto em linha reta. O tempo real de deslocamento pode variar conforme as vias disponíveis.
          </p>
        </div>
      </div>
    </div>
  );
}
