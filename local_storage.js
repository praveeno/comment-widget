export class LocalStorage { //implements StorageRepository
  set(key, value, stringify = JSON.stringify) {
    if (typeof value !== 'string') value = stringify(value);
    localStorage.setItem(key, value);
  }

  get(key, parse = JSON.parse) {
    const value = localStorage.getItem(key);
    return value ? parse(value) : null;
  }
}