<template>
  <div
    v-if="gridModeEnabled"
    ref="dropAreaRef"
    class="drop-area fixed z-30 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300/30 bg-gray-700/10 backdrop-blur-sm transition-all duration-300"
    :style="positionStyle"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragend="handleDragEnd"
    @drop="handleDrop"
  >
    <div class="text-center p-6 flex flex-col items-center gap-4 justify-center">
      <i class="fa-solid fa-arrows-to-dot text-4xl text-gray-300" />
      <p class="text-lg font-semibold text-surface-900">
        Drag here to add to the grid
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  alignX: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  alignY: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'middle', 'bottom'].includes(value)
  },
  width: {
    type: [Number, String],
    default: 400,
    validator: (value) => {
      if (typeof value === 'number') {
        return value > 0
      } else if (typeof value === 'string') {
        // ends with px or rem
        return value.endsWith('px') || value.endsWith('rem')
      }
      return false
    }
  },
  height: {
    type: [Number, String],
    default: 250,
    validator: (value) => {
      if (typeof value === 'number') {
        return value > 0
      } else if (typeof value === 'string') {
        // ends with px or rem
        return value.endsWith('px') || value.endsWith('rem')
      }
      return false
    }
  }
})

const emit = defineEmits(['drop'])

const settingsStore = useSettingsStore()
const gridModeEnabled = computed(() => settingsStore.gridModeEnabled)
const isDragOver = ref(false)
const dropAreaRef = ref(null)

const positionStyle = computed(() => {
  const margin = 40
  const style = {}
  style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  style.height = typeof props.height === 'number' ? `${props.height}px` : props.height

  switch (props.alignY) {
    case 'top':
      style.top = `${margin}px`
      break
    case 'middle':
      style.top = '50%'
      style.transform = 'translateY(-50%)'
      break
    case 'bottom':
      style.bottom = `${margin}px`
      break
  }

  switch (props.alignX) {
    case 'left':
      style.left = `${margin}px`
      if (props.alignY === 'middle') {
        style.transform = 'translateY(-50%)'
      }
      break
    case 'center':
      style.left = '50%'
      if (props.alignY === 'middle') {
        style.transform = 'translate(-50%, -50%)'
      } else {
        style.transform = 'translateX(-50%)'
      }
      break
    case 'right':
      style.right = `${margin}px`
      if (props.alignY === 'middle') {
        style.transform = 'translateY(-50%)'
      }
      break
  }

  return style
})

const handleDragOver = (event) => {
  if (!gridModeEnabled.value) return
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'copy'
  isDragOver.value = true
}

const handleDragEnter = (event) => {
  if (!gridModeEnabled.value) return
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  if (!gridModeEnabled.value) return
  event.stopPropagation()

  if (!dropAreaRef.value) {
    isDragOver.value = false
    return
  }

  const relatedTarget = event.relatedTarget

  if (!relatedTarget || dropAreaRef.value.contains(relatedTarget)) {
    return
  }

  isDragOver.value = false
}

const handleDragEnd = () => {
  isDragOver.value = false
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isDragOver.value) {
    isDragOver.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleDrop = (event) => {
  if (!gridModeEnabled.value) return
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false

  let url = null

  if (event.dataTransfer.getData('text/plain')) {
    url = event.dataTransfer.getData('text/plain')
  } else if (event.dataTransfer.getData('text/uri-list')) {
    url = event.dataTransfer.getData('text/uri-list')
  } else if (event.dataTransfer.getData('text/html')) {
    const html = event.dataTransfer.getData('text/html')
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const link = doc.querySelector('a[href]')
    if (link) {
      url = link.getAttribute('href')
    }
  }

  if (url) {
    try {
      new URL(url)
      emit('drop', url)
    } catch (e) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        emit('drop', url)
      } else if (url.includes('.')) {
        emit('drop', `https://${url}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-area {
  pointer-events: all;
}
</style>
