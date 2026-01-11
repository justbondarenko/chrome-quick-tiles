<template>
  <Button
    severity="secondary"
    icon="pi pi-history"
    @click="toggle"
    :label="settingsStore.showRecentlyClosedLabel ? 'Recently closed' : undefined"
  />
  <Menu
    ref="menu"
    id="recents-menu"
    :model="menuItems"
    popup
    :class="{
      'mt-2': settingsStore.toolbarPosition === 'top',
      'mb-2': settingsStore.toolbarPosition === 'bottom'
    }"
    class="w-96 max-h-[85vh] overflow-y-auto"
  >
    <template #item="{ item, props }">
      <a
        v-if="item.url && !item.disabled"
        v-ripple
        :href="item.url"
        class="flex items-center gap-2 p-2 group"
        v-bind="props.action"
      >
        <img
          v-if="item.favicon"
          :src="item.favicon"
          class="w-4 h-4 rounded-sm flex-shrink-0"
          alt="favicon"
          @error="handleFaviconError(item)"
        />
        <span class="flex-1 truncate">{{ item.label }}</span>
        <span v-if="item.timeAgo" class="text-xs opacity-60 ml-2">{{ item.timeAgo }}</span>
      </a>
      <span v-else class="flex items-center gap-2 p-2 opacity-50 pointer-events-none">
        {{ item.label }}
      </span>
    </template>
  </Menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useSettingsStore } from '@/stores/settings'
import { chromeStorage } from '@/plugins/chromeStorage'

const settingsStore = useSettingsStore()
const menu = ref(null)
const menuItems = ref([])

const timeAgo = (timeStamp) => {
  const now = new Date()
  const secondsPast = (now.getTime() - timeStamp) / 1000

  if (secondsPast < 60) {
    return `${parseInt(secondsPast)}s ago`
  }
  if (secondsPast < 3600) {
    return `${parseInt(secondsPast / 60)}m ago`
  }
  if (secondsPast <= 86400) {
    return `${parseInt(secondsPast / 3600)}h ago`
  }
  if (secondsPast > 86400) {
    const date = new Date(timeStamp)
    const day = date.getDate()
    const month = date
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(' ', '')
    const year = now.getFullYear() === date.getFullYear() ? '' : ` ${date.getFullYear()}`
    return `${day} ${month}${year}`
  }
}

const getFaviconUrl = (url) => {
  try {
    const faviconUrl = new URL(chromeStorage.getRuntimeURL('/_favicon/'))
    faviconUrl.searchParams.set('pageUrl', url)
    faviconUrl.searchParams.set('size', '24')
    return faviconUrl.toString()
  } catch (error) {
    console.error('Error generating favicon URL:', error)
    return null
  }
}

const handleFaviconError = (item) => {
  if (item) {
    item.favicon = null
  }
}

const loadHistory = () => {
  // eslint-disable-next-line
  chrome.history.search({ maxResults: 15, text: 'http' }, (items) => {
    menuItems.value = items
      .filter((item) => item.url)
      .map((item) => ({
        label: item.title || item.url,
        url: item.url,
        favicon: getFaviconUrl(item.url),
        timeAgo: timeAgo(item.lastVisitTime)
      }))

    if (menuItems.value.length === 0) {
      menuItems.value = [
        {
          label: 'No recent history',
          disabled: true
        }
      ]
    } else {
      menuItems.value.unshift({
        label: `Recently closed (${menuItems.value.length})`,
        disabled: true
      })
    }
  })
}

const toggle = (event) => {
  menu.value.toggle(event)
}

onMounted(() => {
  loadHistory()
})
</script>

<style lang="scss" scoped></style>
