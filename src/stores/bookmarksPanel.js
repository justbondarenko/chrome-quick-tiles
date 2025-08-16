import { defineStore } from 'pinia';
import { chromeStorage } from '@/plugins/chromeStorage';

export const useBookmarksPanelStore = defineStore('bookmarksPanel', {
  state: () => {
    return {
      openFolders: [], // Array of folder IDs that are currently expanded
    }
  },

  actions: {
    // Helper method to ensure openFolders is always an array
    ensureArray() {
      if (!Array.isArray(this.openFolders)) {
        console.log('openFolders is not an array, resetting to empty array');
        this.openFolders = [];
      }
    },

    // Initialize the store by loading saved state from chrome storage
    async initialize() {
      try {
        const savedOpenFolders = await chromeStorage.get('bookmarksOpenFolders');
        console.log('Retrieved from storage:', savedOpenFolders, 'Type:', typeof savedOpenFolders, 'Is Array:', Array.isArray(savedOpenFolders));

        // Handle the case where chrome storage returns an object with numeric keys instead of an array
        let processedOpenFolders = [];
        if (savedOpenFolders) {
          if (Array.isArray(savedOpenFolders)) {
            // If it's already an array, use it directly
            processedOpenFolders = savedOpenFolders;
          } else if (typeof savedOpenFolders === 'object' && savedOpenFolders !== null) {
            // If it's an object with numeric keys, convert it to an array
            const keys = Object.keys(savedOpenFolders).sort((a, b) => parseInt(a) - parseInt(b));
            processedOpenFolders = keys.map(key => savedOpenFolders[key]);
            console.log('Converted object to array:', processedOpenFolders);
          }
        }

        // Ensure we always have an array
        this.openFolders = processedOpenFolders;

        console.log('Final openFolders state:', this.openFolders);
      } catch (error) {
        console.error('Failed to load bookmarks panel state:', error);
        this.openFolders = [];
      }
    },

    // Add a folder ID to the open folders array and save to storage
    async addOpenFolder(folderId) {
      this.ensureArray();

      if (!this.openFolders.includes(folderId)) {
        this.openFolders.push(folderId);
        await this.saveOpenFolders();
      }
    },

    // Remove a folder ID from the open folders array and save to storage
    async removeOpenFolder(folderId) {
      this.ensureArray();

      const index = this.openFolders.indexOf(folderId);
      if (index > -1) {
        this.openFolders.splice(index, 1);
        await this.saveOpenFolders();
      }
    },

    // Toggle folder open/closed state
    async toggleFolder(folderId) {
      if (this.isFolderOpen(folderId)) {
        await this.removeOpenFolder(folderId);
      } else {
        await this.addOpenFolder(folderId);
      }
    },

    // Check if a folder is currently open
    isFolderOpen(folderId) {
      console.log('isFolderOpen called with folderId:', folderId, 'openFolders:', this.openFolders, 'Type:', typeof this.openFolders);

      this.ensureArray();
      return this.openFolders.includes(folderId);
    },

    // Save the current open folders state to chrome storage
    async saveOpenFolders() {
      try {
        this.ensureArray();
        await chromeStorage.set('bookmarksOpenFolders', this.openFolders);
      } catch (error) {
        console.error('Failed to save bookmarks panel state:', error);
      }
    },

    // Clear all open folders
    async clearOpenFolders() {
      this.openFolders = [];
      await this.saveOpenFolders();
    },
  }
});
