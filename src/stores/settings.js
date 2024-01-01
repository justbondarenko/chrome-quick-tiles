import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      gridWidth: '',
      gridGap: 0,
      tileCornerRadius: '',
      tileLabelPosition: '',
      toolbarPosition: '',
      tileFaviconSize: 0,
      showBookmarksLabel: true,
      showRecentlyClosedLabel: true,
      showNewTileLabel: false,
      showSettingsLabel: false,
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
    },
    async setTileFaviconSize(value) {
      this.tileFaviconSize = value;
      return await chromeStorage.set('tileFaviconSize', value);
    },
    async setToolbarPosition(value) {
      this.toolbarPosition = value;
      return await chromeStorage.set('toolbarPosition', value);
    },
    async setShowBookmarksLabel(value) {
      this.showBookmarksLabel = value;
      return await chromeStorage.set('showBookmarksLabel', value);
    },
    async setShowRecentlyClosedLabel(value) {
      this.showRecentlyClosedLabel = value;
      return await chromeStorage.set('showRecentlyClosedLabel', value);
    },
    async setShowNewTileLabel(value) {
      this.showNewTileLabel = value;
      return await chromeStorage.set('showNewTileLabel', value);
    },
    async setShowSettingsLabel(value) {
      this.showSettingsLabel = value;
      return await chromeStorage.set('showSettingsLabel', value);
    },
    async toggleLabelFor(value) {
      switch (value) {
        case 'bookmarks':
          this.showBookmarksLabel = !this.showBookmarksLabel;
          await chromeStorage.set('showBookmarksLabel', this.showBookmarksLabel);
          break;
        case 'recentlyClosed':
          this.showRecentlyClosedLabel = !this.showRecentlyClosedLabel;
          await chromeStorage.set('showRecentlyClosedLabel', this.showRecentlyClosedLabel);
          break;
        case 'newTile':
          this.showNewTileLabel = !this.showNewTileLabel;
          await chromeStorage.set('showNewTileLabel', this.this.showNewTileLabel);
          break;
        case 'settings':
          this.showSettingsLabel = !this.showSettingsLabel;
          await chromeStorage.set('showSettingsLabel', this.showSettingsLabel);
          break;
        default:
          return 
      }
    },
    async setLabelFor(key, value) {
      switch (value) {
        case 'bookmarks':
          this.showBookmarksLabel = value;
          await chromeStorage.set('showBookmarksLabel', value);
          break;
        case 'recentlyClosed':
          this.showRecentlyClosedLabel = value;
          await chromeStorage.set('showRecentlyClosedLabel', value);
          break;
        case 'newTile':
          this.showNewTileLabel = value;
          await chromeStorage.set('showNewTileLabel', value);
          break;
        case 'settings':
          this.showSettingsLabel = value;
          await chromeStorage.set('showSettingsLabel', value);
          break;
        default:
          return 
      }
    }

  }
})
