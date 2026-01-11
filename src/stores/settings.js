import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      gridWidth: '',
      gridGap: 0,
      gridAlign: 'start',
      tileCornerRadius: '',
      tileLabelPosition: '',
      toolbarPosition: '',
      tileFaviconSize: 0,
      hideTileLabel: true,
      showBookmarksLabel: true,
      showRecentlyClosedLabel: true,
      showNewTileLabel: false,
      showSettingsLabel: false,
      isInitialized: false,
      reorderEnabled: false,
      gridModeEnabled: false,
    }
  },
  
  actions: {
    // Initialize store by loading settings from storage
    async initializeStore() {
      if (this.isInitialized) return;

      try {
        // Load all settings in one batch operation
        const storedSettings = await chromeStorage.getMultiple([
          'toolbarPosition', 'gridWidth', 'gridGap', 'gridAlign',
          'tileCornerRadius', 'tileFaviconSize', 'hideTileLabel',
          'tileLabelPosition', 'showBookmarksLabel', 
          'showRecentlyClosedLabel', 'showNewTileLabel', 'showSettingsLabel'
        ]);

        // Set all settings with fallback values
        const settings = {
          toolbarPosition: storedSettings.toolbarPosition ?? 'top',
          gridWidth: storedSettings.gridWidth ?? '95',
          gridGap: storedSettings.gridGap ?? 15,
          gridAlign: storedSettings.gridAlign ?? 'start',
          tileCornerRadius: storedSettings.tileCornerRadius ?? '10',
          tileFaviconSize: storedSettings.tileFaviconSize ?? '24',
          hideTileLabel: storedSettings.hideTileLabel ?? false,
          tileLabelPosition: storedSettings.tileLabelPosition ?? 'bottom right',
          showBookmarksLabel: storedSettings.showBookmarksLabel ?? false,
          showRecentlyClosedLabel: storedSettings.showRecentlyClosedLabel ?? false,
          showNewTileLabel: storedSettings.showNewTileLabel ?? false,
          showSettingsLabel: storedSettings.showSettingsLabel ?? false,
        };

        // Update state in one operation
        Object.assign(this, settings);
        this.isInitialized = true;

      } catch (error) {
        console.error('Failed to initialize settings store:', error);
        this.setDefaultValues();
      }
    },

    // Set default values when initialization fails
    setDefaultValues() {
      Object.assign(this, {
        toolbarPosition: 'top',
        gridWidth: '95',
        gridGap: 15,
        gridAlign: 'start',
        tileCornerRadius: '10',
        tileFaviconSize: '24',
        hideTileLabel: true,
        tileLabelPosition: 'bottom right',
        showBookmarksLabel: false,
        showRecentlyClosedLabel: false,
        showNewTileLabel: false,
        showSettingsLabel: false,
        gridModeEnabled: false,
      });
      this.isInitialized = true;
    },
    
    // Reset store to default values (Pinia standard pattern)
    $reset() {
      this.setDefaultValues();
    },
    
    // Batch set multiple settings at once for better performance
    async setMultipleSettings(settings) {
      // Update state in one operation
      Object.assign(this, settings);

      // Batch storage operation - much more efficient
      const storageData = {};
      Object.keys(settings).forEach(key => {
        storageData[key] = settings[key];
      });

      return await chromeStorage.setMultiple(storageData);
    },

    async setGridWidth(value) {
      this.gridWidth = value;
      return await chromeStorage.set('gridWidth', value);
    },
    async setGridGap(value) {
      this.gridGap = value;
      return await chromeStorage.set('gridGap', value);
    },
    async setGridAlign(value) {
      this.gridAlign = value;
      return await chromeStorage.set('gridAlign', value);
    },
    async setTileCornerRadius(value) {
      this.tileCornerRadius = value;
      return await chromeStorage.set('tileCornerRadius', value);
    },
    async setHideTileLabel(value) {
      this.hideTileLabel = value;
      return await chromeStorage.set('hideTileLabel', value);
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
    },
    async toggleGridEditMode() {
      this.gridModeEnabled = !this.gridModeEnabled;
    }
  }
})
