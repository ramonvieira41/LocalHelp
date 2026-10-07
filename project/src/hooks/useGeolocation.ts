import { useEffect, useState } from 'react';

interface GeolocationState {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada por este navegador.');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        setError(getGeolocationErrorMessage(err));
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { location, error, loading, requestLocation };
}

function getGeolocationErrorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return 'Permissão de localização negada. Habilite para ver o trajeto.';
    case err.POSITION_UNAVAILABLE:
      return 'Localização indisponível no momento.';
    case err.TIMEOUT:
      return 'Tempo esgotado ao obter localização.';
    default:
      return 'Erro ao obter localização.';
  }
}
