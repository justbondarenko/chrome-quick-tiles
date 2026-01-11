<template>
  <Button severity="secondary" @click="visible = true" outlined>
    <i class="pi pi-search" />
    <span>Search Bookmarks</span>
    <span
      class="scale-75 whitespace-nowrap ml-auto border opacity-75 border-primary-600 text-primary-600 rounded-md text-xs py-1 px-2"
    >
      CTRL + K
    </span>
  </Button>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    position="top"
    header="Search"
    :style="{ width: '40rem', maxHeight: '80vh' }"
    @hide="resetSearch"
  >
    <div class="flex flex-col gap-4 overflow-hidden max-h-[60vh]" v-focustrap>
      <IconField class="w-full flex-shrink-0">
        <InputIcon class="pi pi-search" />
        <InputText autofocus v-model="searchValue" placeholder="Search" class="w-full" />
      </IconField>
      <div v-if="searchResults.length > 0" class="flex-1 min-h-0 flex flex-col overflow-y-auto">
        <Menu :model="menuItems" class="w-full border-none">
          <template #item="{ item, props }">
            <a v-ripple :href="item.url" class="flex items-center gap-2 p-2 w-full" v-bind="props.action">
              <img :src="item.favicon" alt="favicon" class="w-6 h-6 rounded-full flex-shrink-0" />
              <span class="truncate flex-1">{{ item.label }}</span>
              <span
                v-if="item.shortcut"
                class="scale-75 whitespace-nowrap ml-auto border opacity-75 border-primary-600 text-primary-600 rounded-md text-xs py-1 px-2"
              >
                {{ item.shortcut }}
              </span>
            </a>
          </template>
        </Menu>
      </div>
      <div v-else class="flex-1 min-h-0 flex items-center justify-center">
        <span>No results found</span>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useBookmarksStore } from '@/stores/bookmarks'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import { chromeStorage } from '@/plugins/chromeStorage'

const visible = ref(false)
const searchValue = ref('')
const searchResults = ref([])
const bookmarksStore = useBookmarksStore()

const menuItems = computed(() => {
  return searchResults.value.map((result, index) => ({
    label: result.title,
    url: result.url,
    favicon: chromeStorage.getFaviconUrl(result.url),
    shortcut: index < 9 ? `CTRL + ${index + 1}` : null
  }))
})

const resetSearch = () => {
  searchValue.value = ''
  searchResults.value = []
}

const searchBookmarks = async () => {
  const res = await bookmarksStore.search(searchValue.value)
  console.log('🚀 ~ searchBookmarks ~ res:', res)
  searchResults.value = res.slice(0, 10)
}

const handleOpenModal = (event) => {
  if (visible.value) return

  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    visible.value = true
  }
}

const handleKeyboardShortcut = (event) => {
  if (!visible.value || searchResults.value.length === 0) return

  if (!event.ctrlKey) return

  if (event.key === 'k') {
    return
  }

  const key = event.key
  const number = parseInt(key, 10)

  if (number >= 1 && number <= 9) {
    const index = number - 1
    if (index < searchResults.value.length) {
      event.preventDefault()
      const result = searchResults.value[index]
      if (result?.url) {
        // eslint-disable-next-line
        chrome.tabs.create({ url: result.url })
        visible.value = false
      }
    }
  }
}

watch(
  () => searchValue.value,
  () => {
    searchBookmarks()
  },
  { immediate: true }
)

watch(
  () => visible.value,
  (isVisible) => {
    if (isVisible) {
      window.addEventListener('keydown', handleKeyboardShortcut)
    } else {
      window.removeEventListener('keydown', handleKeyboardShortcut)
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleOpenModal)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut)
  window.removeEventListener('keydown', handleOpenModal)
})
</script>
