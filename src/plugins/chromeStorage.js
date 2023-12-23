export const chromeStorage = {
  get(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result[key]);
      });
    });
  },
  set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  },
  setLocal(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  },
  getLocal(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key]).then((result) => {
        resolve(result[key]);
      });
    });
  },
  remove(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.remove(key, () => {
        resolve();
      });
    });
  },
  removeLocal(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, () => {
        resolve();
      });
    });
  },
  clear() {
    return new Promise((resolve) => {
      chrome.storage.sync.clear(() => {
        resolve();
      });
    });
  },
};