import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useImageStore = defineStore('images', {
  state: () => {
    return {
      items: {},
    }
  },
  actions: {
    async setItem(key, value) {
      await chromeStorage.set({ key, value }).then(() => {
        this.items[key] = value;
      }).catch((e) => console.error(e))
    },
    deleteItem(key) {
      chromeStorage.deleteItem(key)
    }
  }
})
