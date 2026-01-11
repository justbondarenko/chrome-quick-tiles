<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col w-full">
        <label for="tile-edit-url-input" class="text-sm font-medium mb-1">URL</label>
        <InputText id="tile-edit-url-input" type="text" placeholder="https://" class="w-full" v-model="innerUrl" />
      </div>
      <div class="flex flex-col w-full">
        <label for="tile-edit-label-input" class="text-sm font-medium mb-1">Label / Page title</label>
        <InputText
          id="tile-edit-label-input"
          type="text"
          placeholder="Page title"
          class="w-full"
          v-model="innerLabel"
          :disabled="!innerUrl"
        />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="use-image-bg" v-model="useImageBg" :binary="true" />
        <label for="use-image-bg" class="text-sm font-medium cursor-pointer">Use background image</label>
      </div>
      <template v-if="useImageBg">
        <div class="flex flex-col gap-2">
          <Message severity="warn" icon="pi pi-exclamation-triangle">
            Images are saved locally and are not synced between devices.
          </Message>

          <div class="flex gap-2">
            <Button
              label="Choose Image"
              severity="secondary"
              icon="pi pi-image"
              @click="fileInputRef?.click()"
              class="flex-1"
            />
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFile($event.target.files[0])"
            />
          </div>
        </div>
        <div v-if="file" class="cropper-wrapper relative">
          <div
            class="cropper-btns z-10 p-3 rounded-md flex gap-2 absolute bottom-3 right-3 bg-surface-900 bg-opacity-75"
          >
            <Button icon="pi pi-undo" size="small" severity="secondary" @click="rotate(-90)" aria-label="Rotate left" />
            <Button icon="pi pi-redo" size="small" severity="secondary" @click="rotate(90)" aria-label="Rotate right" />
            <div class="w-px bg-surface-600 mx-1" />
            <Button
              icon="pi pi-search-plus"
              size="small"
              severity="secondary"
              @click="zoom(1.5)"
              aria-label="Zoom in"
            />
            <Button
              icon="pi pi-search-minus"
              size="small"
              severity="secondary"
              @click="zoom(0.5)"
              aria-label="Zoom out"
            />
          </div>

          <Cropper
            ref="cropper"
            :src="file.src"
            class="cropper mt-2"
            :stencil-props="{
              movable: true,
              resizable: true
            }"
            @change="cropperChange"
          />
        </div>
      </template>
      <div class="color-pickers flex justify-between px-1 mt-2 w-full">
        <template v-if="!useImageBg">
          <div class="flex flex-row gap-2 items-center w-1/2 h-12">
            <span class="text-sm font-medium">Background</span>
            <ColorPicker
              format="hex"
              :pure-color="{}"
              picker-type="fk"
              shape="circle"
              round-history
              disable-alpha
              lang="En"
              v-model:pureColor="innerBgColor"
            />
          </div>
        </template>
        <div class="flex flex-row gap-2 items-center w-1/2 h-12">
          <span class="text-sm font-medium">Label</span>
          <ColorPicker
            format="hex"
            :pure-color="{}"
            picker-type="fk"
            shape="circle"
            round-history
            disable-alpha
            lang="En"
            v-model:pureColor="innerFontColor"
          />
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <Button label="Close" severity="secondary" icon="pi pi-times-circle" @click="$emit('close')" class="flex-1" />
        <Button label="Save" severity="success" icon="pi pi-save" @click="save" :disabled="!innerUrl" class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useImageStore } from '@/stores/image'
import { chromeStorage } from '@/plugins/chromeStorage'
import { Cropper } from 'vue-advanced-cropper'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  bgColor: {
    type: String
  },
  fontColor: {
    type: String
  },
  size: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const itemsStore = useItemsStore()
const imageStore = useImageStore()

const innerLabel = ref(props.label)
const innerUrl = ref(props.url)
const innerFontColor = ref(props.fontColor)
const innerBgColor = ref(props.bgColor)
const useImageBg = ref(false)
const innerBgImg64 = ref('')
const file = ref(null)
const fileInputRef = ref(null)
const cropper = ref(null)

onMounted(() => {
  chromeStorage.getLocal(props.id).then((img) => {
    if (img) {
      useImageBg.value = !!img
      innerBgImg64.value = img
    }
  })
})

const save = () => {
  itemsStore.update(props.id, {
    label: innerLabel.value,
    url: innerUrl.value,
    fontColor: innerFontColor.value,
    bgColor: innerBgColor.value
  })

  if (useImageBg.value) {
    imageStore.set(props.id, innerBgImg64.value)
    console.log('BG Image set')
  } else {
    imageStore.remove(props.id)
    console.log('BG Image removed')
  }
  emit('close')
}

const onFile = (selectedFile) => {
  if (!selectedFile) return
  const blob = URL.createObjectURL(selectedFile)
  file.value = {
    src: blob,
    type: selectedFile.type
  }
}

const cropperChange = (result) => {
  innerBgImg64.value = result.canvas.toDataURL(file.value.type)
}

const zoom = (factor) => {
  if (cropper.value) {
    cropper.value.zoom(factor)
  }
}

const rotate = (angle) => {
  if (cropper.value) {
    cropper.value.rotate(angle)
  }
}
</script>

<style lang="scss" scoped>
.vc-color-wrap {
  margin: auto auto;
}

.cropper-wrapper {
  > .cropper-btns {
    left: 50%;
    transform: translateX(-50%);
  }
  > .cropper {
    max-height: 400px;
  }
}
</style>
