<template>
  <div class="flex flex-col gap-4">
    <TileElement
      class="pointer-events-none mx-auto"
      label="Tile Preview"
      size="m"
      bg-color="black"
      :label-position="settingsStore.tileLabelPosition"
      url="http://google.com"
      :corner-radius="settingsStore.tileCornerRadius + 'px'"
    />
    
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <label for="hide-labels" class="cursor-pointer">Label</label>
        <ToggleButton
          id="hide-labels"
          v-model="showTileLabel"
          onLabel="Show"
          offLabel="Hide"
          @update:modelValue="onHideTileLabelChange"
          aria-label="Hide tile labels"
        />
      </div>
      
      <div v-if="!settingsStore.hideTileLabel" class="flex flex-col gap-2">
        <span class="font-medium mb-1">Label position:</span>
        <div class="grid grid-cols-2 gap-2">
          <Button
            v-for="position in labelPositions"
            :key="position.value"
            :label="position.label"
            :severity="settingsStore.tileLabelPosition === position.value ? undefined : 'secondary'"
            :outlined="settingsStore.tileLabelPosition !== position.value"
            @click="settingsStore.setTileLabelPosition(position.value)"
            class="text-xs"
          />
        </div>
      </div>
      
      <div class="flex flex-col gap-2">
        <span class="font-medium mb-1 whitespace-nowrap">
          Tile corner radius: {{ settingsStore.tileCornerRadius }}px
        </span>
        <Slider
          v-model="tileCornerRadius"
          :min="0"
          :max="30"
          :step="1"
          class="w-full"
          @update:modelValue="onTileCornerRadiusChange"
        />
      </div>
      
      <div class="flex flex-col gap-2">
        <span class="font-medium mb-1 whitespace-nowrap">
          Favicon size: {{ settingsStore.tileFaviconSize ? `${settingsStore.tileFaviconSize}px` : 'Hide' }}
        </span>
        <SelectButton
          v-model="tileFaviconSize"
          :options="faviconSizes"
          optionLabel="label"
          optionValue="value"
          @update:modelValue="onTileFaviconSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TileElement from '../tiles/TileElement.vue'
import ToggleButton from 'primevue/togglebutton'
import Slider from 'primevue/slider'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const labelPositions = [
  { label: 'Top Left', value: 'top left' },
  { label: 'Top Right', value: 'top right' },
  { label: 'Bottom Left', value: 'bottom left' },
  { label: 'Bottom Right', value: 'bottom right' }
]

const faviconSizes = [
  { label: '16px', value: 16 },
  { label: '24px', value: 24 },
  { label: '32px', value: 32 },
  { label: 'Hide', value: 0 }
]

const showTileLabel = computed(() => !settingsStore.hideTileLabel)
const tileCornerRadius = computed(() => Number(settingsStore.tileCornerRadius))
const tileFaviconSize = computed(() => Number(settingsStore.tileFaviconSize))

const onHideTileLabelChange = () => {
  settingsStore.setHideTileLabel(!settingsStore.hideTileLabel)
}

const onTileCornerRadiusChange = (value) => {
  settingsStore.setTileCornerRadius(String(value))
}

const onTileFaviconSizeChange = (value) => {
  settingsStore.setTileFaviconSize(value)
}
</script>

<style lang="scss" scoped></style>