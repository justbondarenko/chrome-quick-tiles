<template>
  <div class="flex gap-4 p-4">
    <div class="ml-0 mr-2 flex flex-row gap-4">
      <button class="btn"><FontAwesomeIcon :icon="['fas', 'bookmark']" class="fa-fw"/> Bookmarks</button>
      <button class="btn"><FontAwesomeIcon :icon="['fas', 'clock-rotate-left']" class="fa-fw"/> Recently closed</button>
    </div>
    <div class="mr-0 ml-auto flex flex-row gap-4">
      <TileAdd @saveTile="saveTile" />
      <SettingsSidebar />
    </div>
  </div>
</template>

<script>
import SettingsSidebar from './settings/SettingsSidebar.vue';
import TileAdd from './tiles/TileAdd.vue';
import { useItemsStore } from '@/stores/items'

export default {
  components: {
    SettingsSidebar,
    TileAdd
  },
  data() {
    return {
      itemsStore: useItemsStore(),
    }
  },
  methods: {
    saveTile(value) {
      this.itemsStore.addItem(value)
    }
  }
}
</script>

<style lang="scss"> 
</style>