<template>
  <div class="app flex w-full h-screen gap-4" :class="[computedFlexOrientation]">
    <ToolbarComponent />
    <div class="grow p-4 flex flex-col justify-start items-start overflow-auto">
      <TilesGrid />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
import { useImageStore } from '@/stores/image'
import ToolbarComponent from './components/ToolbarComponent.vue'
import TilesGrid from '@/components/tiles/TilesGrid.vue'
import { chromeStorage } from './plugins/chromeStorage'
import MyPreset from '@/assets/primevue/theme';

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

const computedFlexOrientation = computed(() => {
  return settingsStore.toolbarPosition === 'top' ? 'flex-col' : 'flex-col-reverse'
});
</script>

<style scoped></style>
