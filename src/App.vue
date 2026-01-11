<template>
  <div class="app w-screen h-screen relative">
    <ToolbarComponent
      class="absolute left-0 w-full px-6"
      :class="{
        'top-0 pt-6 pb-3': settingsStore.toolbarPosition === 'top',
        'bottom-0 pb-6 pt-3': settingsStore.toolbarPosition === 'bottom'
      }"
    />
    <Message
      v-if="gridModeEnabled"
      class="absolute top-4 left-1/2 -translate-x-1/2"
      size="small"
      severity="error"
      icon="pi pi-pencil"
      :closable="false"
    >
      Edit Mode Enabled
    </Message>
    <div
      class="w-full h-full p-6 flex flex-col items-start justify-start overflow-auto py-[65px] transition-all duration-300"
      :style="`box-shadow: ${editModeShadow};`"
    >
      <TilesGrid />
    </div>
    <DropArea @drop="handleDrop" align-x="left" align-y="bottom" :width="300" :height="150" />
    <Message
      v-if="gridModeEnabled"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      size="small"
      severity="secondary"
      icon="pi pi-info-circle"
      :closable="false"
    >
      Hint: Hover over a tile to see the controls, or drag to reorder.
    </Message>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
import { useImageStore } from '@/stores/image'
import { useBookmarksStore } from '@/stores/bookmarks'
import ToolbarComponent from './components/ToolbarComponent.vue'
import TilesGrid from '@/components/tiles/TilesGrid.vue'
import DropArea from './components/DropArea.vue'
import { chromeStorage } from './plugins/chromeStorage'
import Message from 'primevue/message'

const settingsStore = useSettingsStore()
const itemsStore = useItemsStore()
const imagesStore = useImageStore()
const bookmarksStore = useBookmarksStore()
const gridModeEnabled = computed(() => settingsStore.gridModeEnabled)

onBeforeMount(async () => {
  try {
    await Promise.all([settingsStore.initializeStore(), bookmarksStore.initializeStore()])

    const [localImages, links] = await Promise.all([chromeStorage.getLocalAll(), chromeStorage.get('links')])

    // Set images
    for (const [key, value] of Object.entries(localImages)) {
      imagesStore.set(key, value)
    }

    // Set items
    if (links) {
      itemsStore.setItems(JSON.parse(links))
    }
  } catch (error) {
    console.error('Failed to load app data:', error)
  }
})

const editModeShadow = computed(() => {
  return gridModeEnabled.value ? 'rgba(220, 38, 38, 0.5) 0px 0px 50px 0px inset' : 'none'
})

const addTile = (url) => {
  itemsStore.addItem({
    url,
    label: '(untitled)'
  })
}

const handleDrop = (url) => {
  addTile(url)
}
</script>

<style lang="scss" scoped></style>
