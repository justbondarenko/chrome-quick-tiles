<script>
import draggable from 'vuedraggable'
import TileElement from './TileElement.vue'
import TileEdit from './TileEdit.vue'
import BookmarkImportFolder from '../bookmarks/BookmarkImportFolder.vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'

export default {
  name: 'TilesGrid',
  components: { TileElement, TileEdit, draggable, BookmarkImportFolder },
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
    v-if="itemsStore.items.length" 
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
        :id="element.id"
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
  <div v-else class="w-3/5 h-fit mt-12 mx-auto py-12 px-16 flex flex-col border-2 rounded-2xl border-dashed prose prose-md prose-slate items-center justify-center opacity-50">
    <p class="lead">You have no bookmarks added.</p>
    <p class="lead text-center">Click <button class="btn btn-square btn-sm pointer-events-none mx-1"><FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'plus' }" /></button> button in {{ settingsStore.toolbarPosition }} right corner of your screen<br/>to add first bookmark.</p>
    <div class="divider">OR</div>
    <p class="lead mb-1"> Select bookmark folder to import and create tiles.*</p>
    <BookmarkImportFolder />
    <span class="prose-sm"> * Only individual bookmarks from selected folder will be imported. Child folders will be ignored.</span>
  </div>
  <input type="checkbox" id="my_modal_6" class="modal-toggle" :checked="showEdit" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <TileEdit v-if="itemToEdit" :id="itemToEdit.id" :label="itemToEdit.label" :url="itemToEdit.url" :bg-color="itemToEdit.bgColor" :font-color="itemToEdit.fontColor" :size="itemToEdit.size" @close="closeEditModal" />
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
    opacity: 0;
  }
}

.tile-drag {
  opacity: 0.5;
}

</style>