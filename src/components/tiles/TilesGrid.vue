<script>
import TileElement from './TileElement.vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
export default {
  name: 'TilesGrid',
  components: { TileElement },
  data() {
    return {
      settingsStore: useSettingsStore(),
      itemsStore: useItemsStore(),
    }
  },
  methods: {
    style: function () {
      return `gap:${this.settingsStore.gridGap}px;max-width:${this.settingsStore.gridWidth}%;`
    },
    setSize(item, size) {
      this.itemsStore.setSize(item, size);
    },
    remove(item) {
      this.itemsStore.remove(item);
    }
  }
}


</script>

<template>
  <div class="tiles-grid flex overflow-y-auto flex-wrap mx-auto" :style="style()">
    <TileElement v-for="item, index of itemsStore.items" :key="index" :url="item.url" :label="item.label" :bg-color="item.bgColor" :font-color="item.fontColor" :size="item.size" @setSize="setSize(item, $event)" @remove="remove(item)"/>
  </div>
</template>

<style lang="scss" scoped>
.tiles-grid {
  min-width: 260px;
}
</style>