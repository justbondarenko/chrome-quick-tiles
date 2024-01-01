<template>
  <div class="drawer drawer-end">
    <input id="new-tile-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="new-tile-drawer" class="btn drawer-button">
        <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'plus' }" />
        <template v-if="settingsStore.showNewTileLabel">Add link</template>
      </label>
    </div>
    <div class="drawer-side z-50">
      <label for="new-tile-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="p-4 w-80 h-full bg-base-200 text-base-content flex flex-col">
        <p class="prose-2xl">New Tile</p>
        <div class="divider" />
        <div class="new-tile-wrapper w-full p-1 flex flex-col gap-4 h-full overflow-y-auto">
          <TileElement :label="label" :url="url" :bg-color="bgColor" :font-color="fontColor" :size="size"
            class="pointer-events-none mx-auto" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">URL</span>
              </div>
              <input type="text" placeholder="https://" class="input input-bordered w-full max-w-xs" v-model="url"
                @input="onUrlInput" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Label / Page title</span>
              </div>
              <input type="text" placeholder="Page title" class="input input-bordered w-full max-w-xs" v-model="label"
                :disabled="!url" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Size</span>
              </div>
              <div class="join w-fit">
                <input v-for="option of getAvailableSizes()" :key="option" class="join-item btn btn-sm" type="radio"
                  name="size-options" :aria-label="option.toUpperCase()" :checked="size === option"
                  @click="size = option" />
              </div>
            </div>
            <div class="color-pickers flex flex-col justify-between px-1 mt-2 w-100">
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="label-text">Background color</span>
                <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
                  lang="En" v-model:pureColor="bgColor" />
              </div>
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="label-text">Label color</span>
                <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
                  lang="En" v-model:pureColor="fontColor" />
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-success btn-outline mt-4" @click="save" :disabled="!url">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'floppy-disk' }" /> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSettingsStore } from '@/stores/settings'
import TileElement from './TileElement.vue';

export default {
  name: 'TileAdd',
  components: {
    TileElement
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      label: '',
      url: '',
      fontColor: 'white',
      bgColor: 'black',
      size: 'm',
    };
  },
  methods: {
    getAvailableSizes() {
      return ['s', 'm']
    },
    onUrlInput() {
      const url = new URL(chrome.runtime.getURL("/_favicon/"));
      url.searchParams.set("pageUrl", this.url);
      url.searchParams.set("size", "32");
      console.log(url.toString())
      this.getDominantColor(url.toString(), function (color) {
        console.log(color)
      });
    },
    save() {
      const item = {
        url: this.url,
        label: this.label,
        fontColor: this.fontColor,
        bgColor: this.bgColor,
        size: this.size
      };
      this.$emit('saveTile', item)
      document.getElementById('new-tile-drawer').checked = false;
    },
    getDominantColor(imageUrl, callback) {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Enable CORS for the image
      img.src = imageUrl;

      img.onload = function () {
        const blockSize = 5; // only visit every 5 pixels
        const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
        const canvas = document.createElement('canvas');
        const context = canvas.getContext && canvas.getContext('2d');

        if (!context) {
          callback(defaultRGB);
          return;
        }

        const height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
        const width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

        context.drawImage(img, 0, 0);

        try {
          const imageData = context.getImageData(0, 0, width, height).data;
          const colorMap = new Map();

          for (let i = 0; i < imageData.length; i += blockSize * 4) {
            const red = imageData[i];
            const green = imageData[i + 1];
            const blue = imageData[i + 2];

            const color = `rgb(${red},${green},${blue})`;

            if (colorMap.has(color)) {
              colorMap.set(color, colorMap.get(color) + 1);
            } else {
              colorMap.set(color, 1);
            }
          }

          let dominantColor = null;
          let maxCount = 0;

          colorMap.forEach((count, color) => {
            if (count > maxCount) {
              maxCount = count;
              dominantColor = color;
            }
          });

          callback(dominantColor);
        } catch (e) {
          /* security error, image on a different domain */
          callback(defaultRGB);
        }
      };
    }
  },

}
</script>

<style lang="scss">
.page-settings-item {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 15px;
}
</style>
