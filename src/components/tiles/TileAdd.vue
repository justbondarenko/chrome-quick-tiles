<template>
  <div class="drawer drawer-end">
    <input id="new-tile-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="new-tile-drawer" class="btn drawer-button">
        <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'plus' }" />
      </label>
    </div>
    <div class="drawer-side z-50">
      <label for="new-tile-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="p-4 w-80 h-full bg-base-200 text-base-content flex flex-col">
        <p class="prose-2xl">New Tile</p>
        <div class="divider" />
        <div class="new-tile-wrapper w-full p-1 flex flex-col gap-4 h-full overflow-y-auto">
          <TileElement :settings-store="settingsStore" :label="label" :url="url" :bg-color="bgColor" :font-color="fontColor" :size="size"
            class="pointer-events-none mx-auto" />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">URL</span>
              </div>
              <input type="text" placeholder="https://" class="input input-bordered w-full max-w-xs" v-model="url" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Label / Page title</span>
              </div>
              <input type="text" placeholder="Page title" class="input input-bordered w-full max-w-xs" v-model="label" :disabled="!url" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Size</span>
              </div>
              <div class="join w-fit">
                <input v-for="option of getAvailableSizes()" :key="option" class="join-item btn btn-sm"  type="radio" name="size-options" :aria-label="option.toUpperCase()" :checked="size===option" @click="size=option"/>
              </div>
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Background color</span>
              </div>
              <input type="text" placeholder="Any CSS color" class="input input-bordered w-full max-w-xs" v-model="bgColor" :disabled="!url" />
            </div>
            <div class="flex flex-col w-100">
              <div class="label">
                <span class="label-text">Label color</span>
              </div>
              <input type="text" placeholder="Any CSS color" class="input input-bordered w-full max-w-xs" v-model="fontColor" :disabled="!url" />
            </div>
          </div>
        </div>
        <button class="btn btn-success btn-outline mt-4">
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

  data() {
    return {
      settingsStore: useSettingsStore(),
      label: "",
      url: "",
      fontColor: "white",
      bgColor: "black",
      size: "m",
    };
  },
  methods: {
    getAvailableSizes() {
      return ['s', 'm']
    }
  },
}
</script>

<style lang="scss">.page-settings-item {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 15px;
}</style>
