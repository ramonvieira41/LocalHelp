import type { ServiceProvider } from '@/types';
import { providers } from './mockData';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockProviderService = {
  async getAll(): Promise<ServiceProvider[]> {
    await delay(200);
    return providers;
  },

  async getById(id: string): Promise<ServiceProvider | undefined> {
    await delay(150);
    return providers.find((p) => p.id === id);
  },

  async search(query: string): Promise<ServiceProvider[]> {
    await delay(200);
    const q = query.toLowerCase().trim();
    if (!q) return providers;
    return providers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.serviceType.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  },
};
