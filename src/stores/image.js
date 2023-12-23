import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useImageStore = defineStore('images', {
  state: () => {
    return {
      items: {},
    }
  },
  actions: {
    set(key, value) {
      chromeStorage.setLocal(key, value).then(() => {
        this.items[key] = value;
      }).catch((e) => console.error(e))
    },
    remove(key) {
      chromeStorage.removeLocal(key).then(() => {
        delete this.items[key]
      })
    }
  }
})
