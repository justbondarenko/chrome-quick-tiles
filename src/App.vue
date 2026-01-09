<template>
  <div class="app w-screen h-screen relative" >
    <ToolbarComponent class="absolute left-0 w-full" :class="{
      'top-0 px-6 pt-4 pb-1': settingsStore.toolbarPosition === 'top',
      'bottom-0 px-6 pb-4 pt-1': settingsStore.toolbarPosition === 'bottom',
    }"/>
    <div class="w-full h-full p-6 flex flex-col items-start overflow-auto py-[65px]" :class="{
      'justify-start': settingsStore.gridAlign === 'start',
      'justify-center': settingsStore.gridAlign === 'center',
      'justify-end': settingsStore.gridAlign === 'end',
    }">
      <TilesGrid />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
import { useImageStore } from '@/stores/image'
import ToolbarComponent from './components/ToolbarComponent.vue'
import TilesGrid from '@/components/tiles/TilesGrid.vue'
import { chromeStorage } from './plugins/chromeStorage'

const settingsStore = useSettingsStore()
const itemsStore = useItemsStore()
const imagesStore = useImageStore()

onBeforeMount(async () => {
  try {
    await settingsStore.initializeStore()

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
</script>

<style scoped></style>
