import type { User } from '@/types';

const STORAGE_KEY = 'localhelp_user';
const USERS_KEY = 'localhelp_users';

interface StoredUser extends User {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockAuthService = {
  async login(email: string, password: string): Promise<User> {
    await delay(400);
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('E-mail ou senha incorretos');
    const user: User = {
      id: found.id,
      name: found.name,
      email: found.email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    await delay(400);
    const users = getStoredUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error('Este e-mail já está cadastrado');
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };
    users.push(newUser);
    saveUsers(users);
    const user: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async updateAccount(name: string, email: string): Promise<User> {
    await delay(300);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error('Usuário não encontrado');
    const currentUser: User = JSON.parse(raw);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === currentUser.id);
    if (idx === -1) throw new Error('Usuário não encontrado');

    if (email !== currentUser.email && users.some((u) => u.email === email)) {
      throw new Error('Este e-mail já está em uso');
    }

    users[idx] = { ...users[idx], name, email };
    saveUsers(users);
    const updated: User = { id: currentUser.id, name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },

  async deleteAccount(): Promise<void> {
    await delay(300);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const currentUser: User = JSON.parse(raw);
    const users = getStoredUsers().filter((u) => u.id !== currentUser.id);
    saveUsers(users);
    localStorage.removeItem(STORAGE_KEY);
  },
};
