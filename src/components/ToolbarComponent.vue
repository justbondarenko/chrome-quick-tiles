<template>
  <div class="flex gap-4 px-6 pt-4 pb-1">
    <div class="ml-0 mr-2 flex flex-row items-center gap-4 w-fit">
      <BookmarksDrawer />
      <RecentsDrawer />
    </div>
    <div class="flex flex-row gap-4 grow items-center justify-around">
      <span v-if="gridModeEnabled" class="text-xl font-semibold">Edit Mode Enabled</span>
      <template v-else>
        <span>Last Code Changes: {{ buildTimestamp }}</span>
      </template>
    </div>
    <div class="flex flex-row gap-4 w-fit">
      <button class="btn" @click="settingsStore.toggleGridEditMode()">
        <font-awesome-icon
          :icon="{
            prefix: 'fas',
            iconName: gridModeEnabled ? 'lock-open' : 'lock',
          }"
        />
      </button>
      <TileAdd :key="addTileKey" @saveTile="saveTile" />
      <SettingsSidebar />
    </div>
  </div>
</template>

<script>
/* global __BUILD_TIMESTAMP__ */
import BookmarksDrawer from "./bookmarks/BookmarksDrawer.vue";
import RecentsDrawer from "./recents/RecentsDrawer.vue";
import SettingsSidebar from "./settings/SettingsSidebar.vue";
import TileAdd from "./tiles/TileAdd.vue";
import { useItemsStore } from "@/stores/items";
import { useSettingsStore } from "@/stores/settings";

export default {
  components: {
    SettingsSidebar,
    TileAdd,
    BookmarksDrawer,
    RecentsDrawer,
  },
  data() {
    return {
      itemsStore: useItemsStore(),
      settingsStore: useSettingsStore(),
      addTileKey: 0,
    };
  },
  computed: {
    gridModeEnabled() {
      return this.settingsStore.gridModeEnabled;
    },
    buildTimestamp() {
      if (typeof __BUILD_TIMESTAMP__ !== "undefined") {
        const date = new Date(__BUILD_TIMESTAMP__);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
      return "Unknown";
    },
  },
  methods: {
    saveTile(value) {
      this.itemsStore.addItem(value).then(() => this.addTileKey++);
    },
  },
};
</script>

<style lang="scss"></style>
