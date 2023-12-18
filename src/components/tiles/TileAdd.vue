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
          <TileElement :settings-store="settingsStore" :label="innerLabel" :url="innerUrl" :bg-color="innerBgColor" :font-color="innerFontColor" :size="innerSize"
            class="pointer-events-none mx-auto" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">URL</span>
              </div>
              <input type="text" placeholder="https://" class="input input-bordered w-full max-w-xs" v-model="innerUrl" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Label / Page title</span>
              </div>
              <input type="text" placeholder="Page title" class="input input-bordered w-full max-w-xs" v-model="innerLabel" :disabled="!innerUrl" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Size</span>
              </div>
              <div class="join w-fit">
                <input v-for="option of getAvailableSizes()" :key="option" class="join-item btn btn-sm"  type="radio" name="size-options" :aria-label="option.toUpperCase()" :checked="innerSize===option" @click="innerSize=option"/>
              </div>
            </div>
            <div class="color-pickers flex flex-col justify-between px-1 mt-2 w-100">
              <div class="flex flex-row items-center h-12">
                <span class="label-text">Background color</span>
                <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha lang="En"
                  v-model:pureColor="innerBgColor" />
              </div>
              <div class="flex flex-row items-center h-12">
                <span class="label-text">Label color</span>
                <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha lang="En"
                  v-model:pureColor="innerFontColor" />
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-success btn-outline mt-4" @click="save" :disabled="!(!!innerUrl && !!innerLabel)">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'floppy-disk' }" /> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSettingsStore } from '@/stores/settings'
import TileElement from './TileElement.vue';
// import fetch from 'fetch';

export default {
  name: 'TileAdd',
  components: {
    TileElement
  },
  props: {
    label: {
      type: String,
    },
    url: {
      type: String,
    },
    size: {
      type: String,
    },
    bgColor: {
      type: String,
    },
    fontColor: {
      type: String,
    },
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      innerLabel: this.label ?? "",
      innerUrl: this.url ?? "",
      innerFontColor: this.fontColor ?? "white",
      innerBgColor: this.bgColor ?? "black",
      innerSize: this.size ?? "m",
    };
  },
  methods: {
    getAvailableSizes() {
      return ['s', 'm']
    },
    save() {
      const item = {
        url: this.innerUrl,
        label: this.innerLabel,
        fontColor: this.innerFontColor,
        bgColor: this.innerBgColor,
        size: this.innerSize
      };
      this.$emit('saveTile', item)
      document.getElementById('new-tile-drawer').checked = false;
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
