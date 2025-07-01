
import { useState, useEffect } from 'react';

export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
        const result = await window.chrome.storage.local.get(key);
        if (result[key] !== undefined) {
          setValue(result[key]);
        }
      } else {
        // Fallback to localStorage for development
        const stored = localStorage.getItem(key);
        if (stored) {
          setValue(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveValue = async (newValue: T) => {
    setValue(newValue);
    try {
      if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
        await window.chrome.storage.local.set({ [key]: newValue });
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  };

  return { value, saveValue, isLoading };
};
