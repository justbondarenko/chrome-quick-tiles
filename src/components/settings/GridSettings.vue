<template>
  <div class="flex flex-col gap-6 pb-3">
    <div class="flex flex-col gap-3">
      <label for="grid-width" class="font-medium mb-1 whitespace-nowrap inline-flex items-center gap-2">
        <i class="pi pi-arrows-h" />
        Grid width: {{ settingsStore.gridWidth }}%
      </label>
      <Slider
        id="grid-width"
        v-model="gridWidth"
        :min="0"
        :max="100"
        :step="5"
        class="w-full"
        @update:modelValue="onGridWidthChange"
      />
    </div>
    <div class="flex flex-col gap-3">
      <label for="grid-gap" class="font-medium mb-1 whitespace-nowrap inline-flex items-center gap-2">
        <i class="pi pi-th-large" />
        Grid gap: {{ settingsStore.gridGap }}px
      </label>
      <Slider
        id="grid-gap"
        v-model="gridGap"
        :min="5"
        :max="25"
        :step="1"
        class="w-full"
        @update:modelValue="onGridGapChange"
      />
    </div>
    <div class="flex flex-col gap-3">
      <label for="grid-margin" class="font-medium mb-1 whitespace-nowrap inline-flex items-center gap-2">
        <i class="pi pi-arrows-v" />
        Grid positioning: {{ settingsStore.gridMargin }}px
      </label>
      <Slider
        id="grid-margin"
        v-model="gridMargin"
        :min="25"
        :max="600"
        :step="25"
        class="w-full"
        @update:modelValue="onGridMarginChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Slider from 'primevue/slider'
// import SelectButton from 'primevue/selectbutton'

import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const gridWidth = computed(() => Number(settingsStore.gridWidth))
const gridGap = computed(() => Number(settingsStore.gridGap))
const gridMargin = computed(() => Number(settingsStore.gridMargin))

const onGridWidthChange = (value) => {
  settingsStore.setGridWidth(String(value))
}

const onGridGapChange = (value) => {
  settingsStore.setGridGap(value)
}

const onGridMarginChange = (value) => {
  settingsStore.setGridMargin(value)
}
</script>

<style lang="scss" scoped></style>
