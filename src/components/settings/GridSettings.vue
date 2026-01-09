<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label for="grid-width" class="text-sm font-medium mb-1 whitespace-nowrap">
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
    <div class="flex flex-col gap-2">
      <label for="grid-gap" class="text-sm font-medium mb-1 whitespace-nowrap">
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
    <div class="flex flex-row gap-2 items-center">
      <label for="grid-align" class="text-sm font-medium mb-1 whitespace-nowrap">
        Align grid
      </label>
      <SelectButton
        id="grid-align"
        :allowEmpty="false"
        v-model="gridAlign"
        :options="gridAlignOptions"
        optionLabel="label"
        optionValue="value"
        @update:modelValue="onGridAlignChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const gridWidth = ref(Number(settingsStore.gridWidth))
const gridGap = ref(Number(settingsStore.gridGap))
const gridAlign = ref(settingsStore.gridAlign)

const gridAlignOptions = [
  { label: 'Top', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'end' }
]

watch(() => settingsStore.gridAlign, (newValue) => {
  gridAlign.value = newValue
})

watch(() => settingsStore.gridWidth, (newValue) => {
  gridWidth.value = Number(newValue)
})

watch(() => settingsStore.gridGap, (newValue) => {
  gridGap.value = Number(newValue)
})

const onGridWidthChange = (value) => {
  settingsStore.setGridWidth(String(value))
}

const onGridGapChange = (value) => {
  settingsStore.setGridGap(value)
}

const onGridAlignChange = (value) => {
  settingsStore.setGridAlign(value)
}
</script>

<style lang="scss" scoped></style>
