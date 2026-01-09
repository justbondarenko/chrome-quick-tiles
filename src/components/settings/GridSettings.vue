<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium mb-1 whitespace-nowrap">
        Grid width: {{ settingsStore.gridWidth }}%
      </label>
      <Slider
        v-model="gridWidth"
        :min="0"
        :max="100"
        :step="5"
        class="w-full"
        @update:modelValue="onGridWidthChange"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium mb-1 whitespace-nowrap">
        Grid gap: {{ settingsStore.gridGap }}px
      </label>
      <Slider
        v-model="gridGap"
        :min="5"
        :max="25"
        :step="1"
        class="w-full"
        @update:modelValue="onGridGapChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Slider from 'primevue/slider'

const props = defineProps({
  settingsStore: {
    type: Object,
    required: true
  }
})

const gridWidth = ref(Number(props.settingsStore.gridWidth))
const gridGap = ref(Number(props.settingsStore.gridGap))

watch(() => props.settingsStore.gridWidth, (newValue) => {
  gridWidth.value = Number(newValue)
})

watch(() => props.settingsStore.gridGap, (newValue) => {
  gridGap.value = Number(newValue)
})

const onGridWidthChange = (value) => {
  props.settingsStore.setGridWidth(String(value))
}

const onGridGapChange = (value) => {
  props.settingsStore.setGridGap(value)
}
</script>

<style lang="scss" scoped></style>
