<template>
  <div class="flex gap-4">
    <div class="ml-0 mr-2 flex flex-row items-center gap-4 w-fit">
      <BookmarksDrawer />
      <RecentsDrawer />
    </div>
    <div class="flex flex-row gap-4 grow items-center justify-around">
      <span v-if="gridModeEnabled" class="text-xl font-semibold">Edit Mode Enabled</span>
      <span>TEST</span>
    </div>
    <div class="flex flex-row gap-4 w-fit">
      <Button
        severity="secondary"
        @click="settingsStore.toggleGridEditMode()"
        class="flex-shrink-0"
      >
        <template #icon>
          <i :class="`fa-solid ${gridModeEnabled ? 'fa-lock-open' : 'fa-lock'} fa-fw`" />
        </template>
      </Button>
      <TileAdd :key="addTileKey" @saveTile="saveTile" />
      <SettingsSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useSettingsStore } from '@/stores/settings'
import Button from 'primevue/button'
import BookmarksDrawer from './BookmarksDrawer.vue'
import RecentsDrawer from './RecentsDrawer.vue'
import SettingsSidebar from './settings/SettingsSidebar.vue'
import TileAdd from './tiles/TileAdd.vue'
const itemsStore = useItemsStore()
const settingsStore = useSettingsStore()
const addTileKey = ref(0)

const gridModeEnabled = computed(() => settingsStore.gridModeEnabled)

const saveTile = (value) => {
  itemsStore.addItem(value).then(() => addTileKey.value++)
}
</script>

<style lang="scss"></style>
