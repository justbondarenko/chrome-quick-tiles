import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      gridWidth: '',
      gridGap: '',
      tileCornerRadius: '',
      tileLabelPosition: ''
    }
  },
  actions: {
    async setGridWidth(value) { 
      this.gridWidth = value;
      return await chromeStorage.set('gridWidth', value);
    },
    async setGridGap(value) {
      this.gridGap = value;
      return await chromeStorage.set('gridGap', value);
    },
    async setTileCornerRadius(value) {
      this.tileCornerRadius = value;
      return await chromeStorage.set('tileCornerRadius', value);
    },
    async setTileLabelPosition(value) {
      this.tileLabelPosition = value;
      return await chromeStorage.set('tileLabelPosition', value);
    }
  }
})
