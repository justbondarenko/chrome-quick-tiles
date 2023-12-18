<script>
import TileElement from './TileElement.vue'
import TileEdit from './TileEdit.vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
export default {
  name: 'TilesGrid',
  components: { TileElement, TileEdit },
  data() {
    return {
      settingsStore: useSettingsStore(),
      itemsStore: useItemsStore(),
      showEdit: false,
      itemToEdit: null,
      removing: null
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
      this.removing = item.id;
      setTimeout(() => {
        this.itemsStore.remove(item);
        this.removing = null
      }, 1000)
    },
    edit(id) {
      this.itemToEdit = this.itemsStore.getItemById(id)
      this.showEdit = id;
    },
    closeEditModal() {
      this.itemToEdit = null;
      this.showEdit = null;
    }

  }
}


</script>

<template>
  <div class="tiles-grid flex overflow-y-auto flex-wrap mx-auto p-4" :style="style()">
    <TileElement v-for="item, index of itemsStore.items" :key="index" :class="[{'outline-blue-500 outline-3 outline-dashed outline-offset-4': showEdit === item.id, 'animate__animated animate__rotateOutUpRight animate__faster': removing === item.id}]" :url="item.url" :label="item.label" :bg-color="item.bgColor" :font-color="item.fontColor" :size="item.size" @setSize="setSize(item, $event)" @remove="remove(item)" @edit="edit(item.id)"/>
    <input type="checkbox" id="my_modal_6" class="modal-toggle" :checked="showEdit" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <TileEdit v-if="itemToEdit" :id="itemToEdit.id" :label="itemToEdit.label" :url="itemToEdit.url" :bg-color="itemToEdit.bgColor" :font-color="itemToEdit.fontColor" @close="closeEditModal" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tiles-grid {
  min-width: 260px;
}

</style>