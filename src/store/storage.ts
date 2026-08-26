import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const appStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};
