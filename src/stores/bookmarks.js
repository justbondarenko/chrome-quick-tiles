import { defineStore } from 'pinia'

export const useBookmarksStore = defineStore('bookmarks', {
  state: () => {
    return {
      bookmarksTree: [],
      isInitialized: false
    }
  },

  actions: {
    async initializeStore() {
      if (this.isInitialized) return

      try {
        await this.loadBookmarks()
        this.isInitialized = true
      } catch (error) {
        console.error('Failed to initialize bookmarks store:', error)
      }
    },

    loadBookmarks() {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        chrome.bookmarks.getTree((tree) => {
          try {
            this.bookmarksTree = tree[0].children || []
            this.flattenedBookmarks = this.flattenBookmarks(this.bookmarksTree)
            resolve()
          } catch (error) {
            reject(error)
          }
        })
      })
    },

    async search(q) {
      if (!q || q.trim() === '') {
        return []
      }

      // eslint-disable-next-line
      const searchResults = await chrome.bookmarks.search(q)
      return searchResults.filter((bookmark) => bookmark.url)
    }
  }
})
