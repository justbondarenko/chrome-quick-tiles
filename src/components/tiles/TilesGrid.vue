<script setup>
import { ref, computed } from 'vue';
import draggable from 'vuedraggable';
import TileElement from './TileElement.vue';
import TileEdit from './TileEdit.vue';
import Dialog from 'primevue/dialog';
import { useSettingsStore } from '@/stores/settings';
import { useItemsStore } from '@/stores/items';

const settingsStore = useSettingsStore();
const itemsStore = useItemsStore();

const itemToEdit = ref(null);
const removing = ref(null);
const drag = ref(false);

const gridModeEnabled = computed(() => settingsStore.gridModeEnabled);

const editModalVisible = computed(() => !!itemToEdit.value);

const style = () => {
  return `gap:${settingsStore.gridGap}px;max-width:${settingsStore.gridWidth}%;`;
};

const setSize = (item, size) => {
  itemsStore.setSize(item, size);
};

const remove = (item) => {
  removing.value = item.id;
  setTimeout(() => {
    itemsStore.remove(item);
    removing.value = null;
  }, 300);
};

const edit = (id) => {
  itemToEdit.value = itemsStore.getItemById(id);
};

const closeEditModal = () => {
  itemToEdit.value = null;
};
</script>

<template>
  <draggable
    v-if="itemsStore.items.length"
    v-model="itemsStore.items"
    :disabled="!gridModeEnabled"
    tag="div"
    group="tiles"
    ghost-class="tile-ghost"
    dragClass="tile-drag"
    item-key="id"
    :class="[
      'tiles-grid flex overflow-auto flex-wrap mx-auto p-4 rounded-xl transition-colors duration-300'
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

  <Dialog
    v-model:visible="editModalVisible"
    modal
    :style="{ width: '90vw', maxWidth: '600px' }"
    :closable="false"
  >
    <template #header>
      <h3 class="text-lg font-semibold">Edit Tile</h3>
    </template>
    <TileEdit
      :id="itemToEdit.id"
      :label="itemToEdit.label"
      :url="itemToEdit.url"
      :bg-color="itemToEdit.bgColor"
      :font-color="itemToEdit.fontColor"
      :size="itemToEdit.size"
      @close="closeEditModal"
    />
  </Dialog>
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
