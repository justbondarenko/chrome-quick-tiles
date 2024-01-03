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
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'link' }" class="mr-1" /> URL*</span>
              </div>
              <input type="text" placeholder="https://" class="input input-bordered w-full max-w-xs" v-model="url"
                @input="onUrlInput" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'rss' }" class="mr-1" /> RSS Feed <span class="opacity-40">(optional)</span></span>
              </div>
              <input type="text" placeholder="https://" class="input input-bordered w-full max-w-xs" v-model="rssFeed"/>
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'font' }" class="mr-1" /> Label <span class="opacity-40">(optional)</span></span>
              </div>
              <input type="text" placeholder="Page title" class="input input-bordered w-full max-w-xs" v-model="label"
                :disabled="!url" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'left-right' }" class="mr-1" /> Size</span>
              </div>
              <div class="join w-fit">
                <input v-for="option of getAvailableSizes()" :key="option" class="join-item btn btn-sm" type="radio"
                  name="size-options" :aria-label="option.toUpperCase()" :checked="size === option"
                  @click="size = option" />
              </div>
            </div>
            <div class="color-pickers flex flex-col justify-between px-1 mt-2 w-100">
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'fill-drip' }" class="mr-1" /> Background color</span>
                <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
                  lang="En" v-model:pureColor="bgColor" />
              </div>
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="label-text"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'swatchbook' }" class="mr-1" /> Label color</span>
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
    save() {
      const item = {
        url: this.url,
        rssFeed: this.rssFeed,
        label: this.label,
        fontColor: this.fontColor,
        bgColor: this.bgColor,
        size: this.size
      };
      this.$emit('saveTile', item)
      document.getElementById('new-tile-drawer').checked = false;
    },
    async onUrlInput() {
      const res = await this.checkForRssFeed(this.url)
      console.log(res);
    },
    checkForRssFeed: async function (url) {
      try {
        // Fetch the URL's contents
        const response = await fetch(url);
        const text = await response.text();
        console.log(text)
        // Check if the contents contain an RSS tag
        return text.includes('application/rss+xml');
      } catch (error) {
        console.error('Error checking for RSS feed:', error);
      }
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
