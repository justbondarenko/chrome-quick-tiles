<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="font-medium mb-1 whitespace-nowrap">Toolbar position:</span>
      <SelectButton
        v-model="toolbarPosition"
        :options="toolbarPositions"
        optionLabel="label"
        optionValue="value"
        @update:modelValue="onToolbarPositionChange"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span class="font-medium mb-1 whitespace-nowrap">Labels</span>
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <label for="bookmarks-label" class="cursor-pointer">Bookmarks</label>
          <ToggleButton
            id="bookmarks-label"
            v-model="showBookmarksLabel"
            onLabel="Show"
            offLabel="Hide"
            @update:modelValue="settingsStore.toggleLabelFor('bookmarks')"
            aria-label="Show bookmarks label"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="recently-closed-label" class="cursor-pointer">Recently Closed</label>
          <ToggleButton
            id="recently-closed-label"
            v-model="showRecentlyClosedLabel"
            onLabel="Show"
            offLabel="Hide"
            @update:modelValue="settingsStore.toggleLabelFor('recentlyClosed')"
            aria-label="Show recently closed label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SelectButton from 'primevue/selectbutton'
import ToggleButton from 'primevue/togglebutton'

const props = defineProps({
  settingsStore: {
    type: Object,
    required: true
  }
})

const toolbarPositions = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' }
]

const toolbarPosition = ref(props.settingsStore.toolbarPosition)
const showBookmarksLabel = ref(props.settingsStore.showBookmarksLabel)
const showRecentlyClosedLabel = ref(props.settingsStore.showRecentlyClosedLabel)

watch(() => props.settingsStore.toolbarPosition, (newValue) => {
  toolbarPosition.value = newValue
})

watch(() => props.settingsStore.showBookmarksLabel, (newValue) => {
  showBookmarksLabel.value = newValue
})

watch(() => props.settingsStore.showRecentlyClosedLabel, (newValue) => {
  showRecentlyClosedLabel.value = newValue
})

const onToolbarPositionChange = (value) => {
  props.settingsStore.setToolbarPosition(value)
}
</script>

<style lang="scss" scoped></style>
