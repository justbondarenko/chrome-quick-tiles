<script>
import draggable from "vuedraggable";
import TileElement from "./TileElement.vue";
import TileEdit from "./TileEdit.vue";
import { useSettingsStore } from "@/stores/settings";
import { useItemsStore } from "@/stores/items";

export default {
  name: "TilesGrid",
  components: { TileElement, TileEdit, draggable },
  data() {
    return {
      settingsStore: useSettingsStore(),
      itemsStore: useItemsStore(),
      showEdit: false,
      itemToEdit: null,
      removing: null,
      drag: false,
    };
  },
  computed: {
    reorderEnabled() {
      return this.settingsStore.reorderEnabled;
    },
  },
  methods: {
    style: function () {
      return `gap:${this.settingsStore.gridGap}px;max-width:${this.settingsStore.gridWidth}%;`;
    },
    setSize(item, size) {
      this.itemsStore.setSize(item, size);
    },
    remove(item) {
      this.removing = item.id;
      setTimeout(() => {
        this.itemsStore.remove(item);
        this.removing = null;
      }, 300);
    },
    edit(id) {
      this.itemToEdit = this.itemsStore.getItemById(id);
      this.showEdit = id;
    },
    closeEditModal() {
      this.showEdit = null;
      this.itemToEdit = null;
    },
  },
};
</script>

<template>
  <draggable
    v-if="itemsStore.items.length"
    v-model="itemsStore.items"
    :disabled="!reorderEnabled"
    tag="div"
    group="tiles"
    ghost-class="tile-ghost"
    dragClass="tile-drag"
    item-key="id"
    :class="[
      'tiles-grid flex overflow-auto flex-wrap mx-auto p-4 rounded-xl transition-colors duration-300',
      {
        'bg-slate-100 outline-slate-300 outline-3 outline-dashed outline-offset-2': reorderEnabled,
      },
    ]"
    :style="style()"
    @start="drag = true"
    @end="drag = false"
    @update="itemsStore.save()"
  >
    <template #item="{ element }">
      <TileElement
        :class="[
          {
            'outline-blue-500 outline-3 outline-dashed outline-offset-4':
              showEdit === element.id,
            'animate__animated animate__fadeOut animate__faster': removing === element.id,
          },
        ]"
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
  <input type="checkbox" id="my_modal_6" class="modal-toggle" :checked="showEdit" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <TileEdit
        v-if="itemToEdit"
        :id="itemToEdit.id"
        :label="itemToEdit.label"
        :url="itemToEdit.url"
        :bg-color="itemToEdit.bgColor"
        :font-color="itemToEdit.fontColor"
        :size="itemToEdit.size"
        @close="closeEditModal"
      />
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
