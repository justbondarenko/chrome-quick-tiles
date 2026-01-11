<template>
  <Button
    severity="secondary"
    icon="fa-solid fa-gear"
    :label="settingsStore.showSettingsLabel ? 'Settings' : undefined"
    @click="visible = true"
    class="flex flex-nowrap"
  />
  <Drawer v-model:visible="visible" header="Settings" position="right" class="!w-[30rem]">
    <div class="flex flex-col gap-4 h-full">
      <div class="settings-wrapper flex flex-col gap-4 flex-1 overflow-y-auto overflow-x-hidden">
        <Accordion :value="[]" multiple>
          <AccordionPanel value="0">
            <AccordionHeader>
              <span class="text-xl font-medium">Page settings</span>
            </AccordionHeader>
            <AccordionContent>
              <GridSettings :settings-store="settingsStore" />
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="1">
            <AccordionHeader>
              <span class="text-xl font-medium">Toolbar settings</span>
            </AccordionHeader>
            <AccordionContent>
              <ToolbarSettings :settings-store="settingsStore" />
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="2">
            <AccordionHeader>
              <span class="text-xl font-medium">Tile settings</span>
            </AccordionHeader>
            <AccordionContent>
              <TileSettings :settings-store="settingsStore" />
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="3">
            <AccordionHeader>
              <span class="text-xl font-medium">Export & Import settings</span>
            </AccordionHeader>
            <AccordionContent>
              <ExportImport :settings-store="settingsStore" />
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <MyContacts :settings-store="settingsStore" class="mt-auto" />
    </div>
  </Drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import GridSettings from './GridSettings.vue'
import ToolbarSettings from './ToolbarSettings.vue'
import TileSettings from './TileSettings.vue'
import ExportImport from './ExportImport.vue'
import MyContacts from './MyContacts.vue'

const settingsStore = useSettingsStore()
const visible = ref(false)
</script>

<style lang="scss" scoped>
.settings-wrapper {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  :deep(.p-accordion-content) {
    padding: 1rem;
  }
}
</style>
