<script>
import draggable from 'vuedraggable'
import TileElement from './TileElement.vue'
import TileEdit from './TileEdit.vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
export default {
  name: 'TilesGrid',
  components: { TileElement, TileEdit, draggable },
  data() {
    return {
      settingsStore: useSettingsStore(),
      itemsStore: useItemsStore(),
      showEdit: false,
      itemToEdit: null,
      removing: null,
      drag: false,
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
      this.showEdit = null;
      this.itemToEdit = null;
    },
  }
}


</script>

<template>
  <draggable 
    v-model="itemsStore.items" 
    tag="div"
    group="tiles" 
    handle=".move-handle"
    ghost-class="tile-ghost"
	  dragClass="tile-drag"
    item-key="id"
    class="tiles-grid flex overflow-y-auto flex-wrap mx-auto p-4"
    :style="style()"  
    @start="drag=true" 
    @end="drag=false" 
    @update="itemsStore.save()"
  >
    <template #item="{element}">
      <TileElement 
        :class="[{
          'outline-blue-500 outline-3 outline-dashed outline-offset-4': showEdit === element.id,
          'animate__animated animate__rotateOutUpRight animate__faster': removing === element.id,
        }]"
        :url="element.url"
        :label="element.label"
        :bg-color="element.bgColor"
        :font-color="element.fontColor"
        :size="element.size"
        @setSize="setSize(element, $event)"
        @remove="remove(element)"
        @edit="edit(element.id)"
      />
    </template>
  </draggable>
  <div class="tiles-grid flex overflow-y-auto flex-wrap mx-auto p-4" :style="style()">
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

.tile-ghost {
  border: 2px dotted gray !important;
  background-color: transparent !important;
  > * {
    visibility: hidden;
  }
}

.tile-drag {
  opacity: 0.5;
}

</style>