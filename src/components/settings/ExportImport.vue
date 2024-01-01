<script>
import { useSettingsStore } from '@/stores/settings'
import { useImageStore } from '@/stores/image'
import { useItemsStore } from '@/stores/items'
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
  name: 'ExportImport',
  data() {
    return {
      settingsStore: useSettingsStore(),
      imagesStore: useImageStore(),
      itemsStore: useItemsStore()
    }
  },
  methods: {
    exportSettings() {
      const links = this.itemsStore.items;
      const settings = this.settingsStore.$state;
      const images = this.imagesStore.items;


      const zip = new JSZip();

      zip.file('links.json', JSON.stringify(links));
      zip.file('settings.json', JSON.stringify(settings));
      zip.file('images.json', JSON.stringify(images));

      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'quick-tiles-settings.zip');
      })
    },
    importSettings(event) {
      const selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        JSZip.loadAsync(e.target.result).then(zip => {
          zip.forEach((relativePath, zipEntry) => {
            zipEntry.async('text').then(text => {
              let jsonData = JSON.parse(text);
              switch (relativePath) {
                case 'images.json':
                  return this.processImages(jsonData)
                case 'links.json':
                  return this.processLinks(jsonData)
                case 'settings.json':
                  return this.processSettings(jsonData)
                default:
                  return;
              }
            }, err => {
              console.error(err);
            });
          });
        }, err => {
          console.error(err);
        });
      };
      reader.readAsArrayBuffer(selectedFile);
    },
    async processSettings(settings) {
      const promises = Object.entries(settings).map(([key, value]) => {
        switch (key) {
          case 'gridWidth':
            return this.settingsStore.setGridWidth(value);
          case 'gridGap':
            return this.settingsStore.setGridGap(value);
          case 'tileCornerRadius':
            return this.settingsStore.setTileCornerRadius(value);
          case 'tileLabelPosition':
            return this.settingsStore.setTileLabelPosition(value);
          case 'tileFaviconSize':
            return this.settingsStore.setTileFaviconSize(value);
          case 'toolbarPosition':
            return this.settingsStore.setToolbarPosition(value);
          case 'showBookmarksLabel':
            return this.settingsStore.setShowBookmarksLabel(value);
          case 'showRecentlyClosedLabel':
            return this.settingsStore.setShowRecentlyClosedLabel(value);
          case 'showNewTileLabel':
            return this.settingsStore.setShowNewTileLabel(value);
          case 'showSettingsLabel':
            return this.settingsStore.setShowSettingsLabel(value);
          default:
            console.warn(`Unhandled setting: ${key}`);
            return Promise.resolve();
        }
      });

      await Promise.all(promises);
    },
    processLinks(data) {
      data.forEach((item) => this.itemsStore.addItem(item))
    },
    processImages(imgData) {
      for (const [key, value] of Object.entries(imgData)) {
        this.imagesStore.set(key, value);
      }
    }
  }
}
</script>

<template>
  <div class="collapse bg-base-100">
    <input type="radio" name="settings-accordion" />
    <div class="collapse-title text-xl font-medium">
      Export & Import settings
    </div>
    <div class="collapse-content">
      <div class="join w-full">
        <label for="import" class="btn join-item w-1/2"><font-awesome-icon :icon="['fas', 'download']" /> Import</label>
        <input id="import" type="file" class="file-input hidden file-input-bordered file-input-sm w-full max-w-xs"
          @input="importSettings" />
        <button class="btn join-item w-1/2" @click="exportSettings()"> <font-awesome-icon :icon="['fas', 'upload']" />
          Export</button>
      </div>
    </div>
  </div>
</template>