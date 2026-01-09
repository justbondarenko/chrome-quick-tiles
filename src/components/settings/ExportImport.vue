<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2">
      <Button
        label="Import"
        severity="secondary"
        icon="fa-solid fa-download"
        @click="fileInputRef?.click()"
        class="flex-1"
      />
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        accept=".zip"
        @change="importSettings"
      />
      <Button
        label="Export"
        severity="secondary"
        icon="fa-solid fa-upload"
        @click="exportSettings"
        class="flex-1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { useItemsStore } from '@/stores/items'
import Button from 'primevue/button'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

const props = defineProps({
  settingsStore: {
    type: Object,
    required: true
  }
})

const imagesStore = useImageStore()
const itemsStore = useItemsStore()
const fileInputRef = ref(null)

const exportSettings = () => {
  const links = itemsStore.items
  const settings = props.settingsStore.$state
  const images = imagesStore.items

  const zip = new JSZip()

  zip.file('links.json', JSON.stringify(links))
  zip.file('settings.json', JSON.stringify(settings))
  zip.file('images.json', JSON.stringify(images))

  zip.generateAsync({ type: 'blob' }).then((content) => {
    FileSaver.saveAs(content, 'quick-tiles-settings.zip')
  })
}

const importSettings = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  const reader = new FileReader()
  reader.onload = (e) => {
    JSZip.loadAsync(e.target.result).then((zip) => {
      zip.forEach((relativePath, zipEntry) => {
        zipEntry.async('text').then((text) => {
          const jsonData = JSON.parse(text)
          switch (relativePath) {
            case 'images.json':
              return processImages(jsonData)
            case 'links.json':
              return processLinks(jsonData)
            case 'settings.json':
              return processSettings(jsonData)
            default:
              return
          }
        }, (err) => {
          console.error(err)
        })
      })
    }, (err) => {
      console.error(err)
    })
  }
  reader.readAsArrayBuffer(selectedFile)
  
  // Reset file input
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const processSettings = async (settings) => {
  const promises = Object.entries(settings).map(([key, value]) => {
    switch (key) {
      case 'gridWidth':
        return props.settingsStore.setGridWidth(value)
      case 'gridGap':
        return props.settingsStore.setGridGap(value)
      case 'tileCornerRadius':
        return props.settingsStore.setTileCornerRadius(value)
      case 'tileLabelPosition':
        return props.settingsStore.setTileLabelPosition(value)
      case 'tileFaviconSize':
        return props.settingsStore.setTileFaviconSize(value)
      case 'toolbarPosition':
        return props.settingsStore.setToolbarPosition(value)
      case 'showBookmarksLabel':
        return props.settingsStore.setShowBookmarksLabel(value)
      case 'showRecentlyClosedLabel':
        return props.settingsStore.setShowRecentlyClosedLabel(value)
      case 'showNewTileLabel':
        return props.settingsStore.setShowNewTileLabel(value)
      case 'showSettingsLabel':
        return props.settingsStore.setShowSettingsLabel(value)
      default:
        console.warn(`Unhandled setting: ${key}`)
        return Promise.resolve()
    }
  })

  await Promise.all(promises)
}

const processLinks = (data) => {
  data.forEach((item) => itemsStore.addItem(item))
}

const processImages = (imgData) => {
  for (const [key, value] of Object.entries(imgData)) {
    imagesStore.set(key, value)
  }
}
</script>

<style lang="scss" scoped></style>