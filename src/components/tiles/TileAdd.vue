<template>
  <div>
    <Button
      severity="secondary"
      icon="fa-solid fa-plus"
      :label="settingsStore.showNewTileLabel ? 'Add link' : undefined"
      @click="visible = true"
    />
    <Drawer
      v-model:visible="visible"
      header="New Tile"
      position="right"
      class="!w-96"
    >
      <div class="flex flex-col gap-4 h-full">
        <div class="new-tile-wrapper w-full flex flex-col gap-4 flex-1 overflow-y-auto">
          <TileElement
            :label="label"
            :url="url"
            :bg-color="bgColor"
            :font-color="fontColor"
            :size="size"
            class="pointer-events-none mx-auto"
          />
          <div class="flex flex-col gap-2">
            <div class="flex flex-col w-full">
              <label for="tile-url-input" class="text-sm font-medium mb-1">URL</label>
              <InputText
                id="tile-url-input"
                type="text"
                placeholder="https://"
                class="w-full"
                v-model="url"
                @input="onUrlInput"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="tile-label-input" class="text-sm font-medium mb-1">Label / Page title</label>
              <InputText
                id="tile-label-input"
                type="text"
                placeholder="Page title"
                class="w-full"
                v-model="label"
                :disabled="!url"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="tile-size-select" class="text-sm font-medium mb-1">Size</label>
              <SelectButton
                id="tile-size-select"
                v-model="size"
                :options="sizeOptions"
                optionLabel="label"
                optionValue="value"
                aria-labelledby="tile-size-select"
              />
            </div>
            <div class="color-pickers flex flex-col justify-between px-1 mt-2 w-full">
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="text-sm font-medium">Background color</span>
                <ColorPicker
                  format="hex"
                  :pure-color="{}"
                  picker-type="fk"
                  shape="circle"
                  round-history
                  disable-alpha
                  lang="En"
                  v-model:pureColor="bgColor"
                />
              </div>
              <div class="flex flex-row items-center h-12 gap-3">
                <span class="text-sm font-medium">Label color</span>
                <ColorPicker
                  format="hex"
                  :pure-color="{}"
                  picker-type="fk"
                  shape="circle"
                  round-history
                  disable-alpha
                  lang="En"
                  v-model:pureColor="fontColor"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-auto pt-4 border-t border-surface-600">
          <Button
            severity="secondary"
            icon="fa-solid fa-floppy-disk"
            label="Save"
            @click="save"
            :disabled="!url"
            class="w-full"
          />
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import TileElement from './TileElement.vue'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'

const emit = defineEmits(['saveTile'])

const settingsStore = useSettingsStore()
const visible = ref(false)
const label = ref('')
const url = ref('')
const fontColor = ref('white')
const bgColor = ref('black')
const size = ref('m')

const sizeOptions = [
  { label: 'S', value: 's' },
  { label: 'M', value: 'm' }
]

const onUrlInput = () => {
  // eslint-disable-next-line
  const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'))
  faviconUrl.searchParams.set('pageUrl', url.value)
  faviconUrl.searchParams.set('size', '32')
  console.log(faviconUrl.toString())
  getDominantColor(faviconUrl.toString(), (color) => {
    console.log(color)
  })
}

const save = () => {
  const item = {
    url: url.value,
    label: label.value,
    fontColor: fontColor.value,
    bgColor: bgColor.value,
    size: size.value
  }
  emit('saveTile', item)
  visible.value = false
  resetForm()
}

const resetForm = () => {
  label.value = ''
  url.value = ''
  fontColor.value = 'white'
  bgColor.value = 'black'
  size.value = 'm'
}

const getDominantColor = (imageUrl, callback) => {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = imageUrl

  img.onload = function () {
    const blockSize = 5
    const defaultRGB = { r: 0, g: 0, b: 0 }
    const canvas = document.createElement('canvas')
    const context = canvas.getContext && canvas.getContext('2d')

    if (!context) {
      callback(defaultRGB)
      return
    }

    const height = (canvas.height =
      img.naturalHeight || img.offsetHeight || img.height)
    const width = (canvas.width = img.naturalWidth || img.offsetWidth || img.width)

    context.drawImage(img, 0, 0)

    try {
      const imageData = context.getImageData(0, 0, width, height).data
      const colorMap = new Map()

      for (let i = 0; i < imageData.length; i += blockSize * 4) {
        const red = imageData[i]
        const green = imageData[i + 1]
        const blue = imageData[i + 2]

        const color = `rgb(${red},${green},${blue})`

        if (colorMap.has(color)) {
          colorMap.set(color, colorMap.get(color) + 1)
        } else {
          colorMap.set(color, 1)
        }
      }

      let dominantColor = null
      let maxCount = 0

      colorMap.forEach((count, color) => {
        if (count > maxCount) {
          maxCount = count
          dominantColor = color
        }
      })

      callback(dominantColor)
    } catch (e) {
      callback(defaultRGB)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-tile-wrapper {
  min-height: 0;
}
</style>
