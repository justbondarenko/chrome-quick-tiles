<template>
  <div class="flex gap-4 p-6">
    <div class="ml-0 mr-2 flex flex-row gap-4">
      <BookmarksDrawer />
      <RecentsDrawer />
    </div>
    <div class="mr-0 ml-auto flex flex-row gap-4">
      <TileAdd :key="addTileKey" @saveTile="saveTile" />
      <SettingsSidebar />
    </div>
  </div>
</template>

<script>
import BookmarksDrawer from './bookmarks/BookmarksDrawer.vue';
import RecentsDrawer from './recents/RecentsDrawer.vue';
import SettingsSidebar from './settings/SettingsSidebar.vue';
import TileAdd from './tiles/TileAdd.vue';
import { useItemsStore } from '@/stores/items'
import { useSettingsStore } from '@/stores/settings'

export default {
  components: {
    SettingsSidebar,
    TileAdd,
    BookmarksDrawer,
    RecentsDrawer
  },
  data() {
    return {
      itemsStore: useItemsStore(),
      settingsStore: useSettingsStore(),
      addTileKey: 0
    }
  },
  methods: {
    saveTile(value) {
      this.itemsStore.addItem(value).then(() => this.addTileKey++); 
    }
  }
}
</script>

<style lang="scss"></style>