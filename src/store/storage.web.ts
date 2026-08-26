export const appStorage = {
  getItem: (name: string) => window.localStorage.getItem(name),
  setItem: (name: string, value: string) => window.localStorage.setItem(name, value),
  removeItem: (name: string) => window.localStorage.removeItem(name),
};
