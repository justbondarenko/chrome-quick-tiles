import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';
import { v4 as uuid } from 'uuid';
export const useItemsStore = defineStore('items', {
  state: () => {
    return {
      items: [
        {
        "id": uuid(),
        "label": "Facebook",
        "url": "https://www.facebook.com",
        "bgColor": "#1877F2",
        "size": "s"
        }
      ],
    }
  },
  actions: {
    setItems(items) {
      this.items = JSON.parse(items);
    },
    async addItem(item) {
      item.id = uuid();
      this.items.push(item);
      this.save()
    },
    setSize(item, size) {
      const existingItem = this.items.find(el => item.id === el.id);
      existingItem.size = size;
      this.save()
    },
    remove(item) {
      const index = this.items.findIndex(el => item.id === el.id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      this.save()
    },
    update(id, newData) {
      const existingItem = this.items.find(el => id === el.id);
      for (const [key, value] of Object.entries(newData)) {
        existingItem[key] = value;
      }
      this.save()
    },
    getItemById(id) {
      return this.items.find(el => id === el.id);
    },
    save() {
      chromeStorage.set('links', JSON.stringify(this.items))
    }
  }
})
