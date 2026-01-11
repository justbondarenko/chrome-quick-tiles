/* global chrome */

export const chromeStorage = {
  get(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result[key])
      })
    })
  },
  getMultiple(keys) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(keys, (result) => {
        resolve(result)
      })
    })
  },
  set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve()
      })
    })
  },
  setMultiple(data) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(data, () => {
        resolve()
      })
    })
  },
  setLocal(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve()
      })
    })
  },
  getLocal(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key]).then((result) => {
        resolve(result[key])
      })
    })
  },
  getLocalAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get().then((result) => {
        resolve(result)
      })
    })
  },
  remove(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve()
      })
    })
  },
  removeLocal(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, () => {
        resolve()
      })
    })
  },
  clear() {
    return new Promise((resolve) => {
      chrome.storage.sync.clear(() => {
        resolve()
      })
    })
  },
  // Get runtime URL for favicon and other extension resources
  getRuntimeURL(path) {
    return chrome.runtime.getURL(path)
  },
  getFaviconUrl(url) {
    try {
      const faviconUrl = new URL(this.getRuntimeURL('/_favicon/'))
      faviconUrl.searchParams.set('pageUrl', url)
      faviconUrl.searchParams.set('size', '24')
      return faviconUrl.toString()
    } catch (error) {
      console.error('Error generating favicon URL:', error)
      return null
    }
  }
}
