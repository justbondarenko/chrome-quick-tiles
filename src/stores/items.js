import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useItemsStore = defineStore('items', {
  state: () => {
    return {
      items: [],
    }
  },
  actions: {
    setItems(items) {
      this.items = JSON.parse(items);
    },
    async addItem(item) {
      this.items.push(item);
      chromeStorage.set('links', JSON.stringify(this.items))
    }
  }
})
