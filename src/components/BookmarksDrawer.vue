<template>
  <Button
    severity="secondary"
    icon="fa-regular fa-bookmark"
    @click="toggle"
    :label="settingsStore.showBookmarksLabel ? 'Bookmarks' : undefined"
  />
  <TieredMenu
    ref="menu"
    id="bookmarks-menu"
    :model="menuItems"
    popup
    :class="{
      'mt-2': settingsStore.toolbarPosition === 'top',
      'mb-2': settingsStore.toolbarPosition === 'bottom'
    }"
  >
    <template #item="{ item, props, hasSubmenu }">
      <span v-if="item.isDummy" class="flex items-center gap-2 p-2 opacity-50">Empty</span>
      <a v-else v-ripple :href="item.url || undefined" class="flex items-center gap-2 p-2 group" v-bind="props.action">
        <img
          v-if="item.favicon"
          :src="item.favicon"
          class="w-4 h-4 rounded-sm flex-shrink-0"
          alt="favicon"
          @error="handleFaviconError(item)"
        />
        <i v-else-if="item.icon" :class="item.icon" class="fa-fw" />
        <span class="flex-1 truncate">{{ item.label }}</span>
        <i
          v-if="item.url === 'chrome://bookmarks'"
          class="fa-solid fa-up-right-from-square fa-fw ml-2"
        />
        <Button
          v-if="item.url && item.showAddButton"
          severity="secondary"
          size="small"
          icon="fa-solid fa-plus"
          class="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
          @click.prevent="addTile(item)"
          aria-label="Add to tiles"
        />
        <i v-if="hasSubmenu" class="fa-solid fa-angle-right fa-fw ml-auto"></i>
      </a>
    </template>
  </TieredMenu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import TieredMenu from 'primevue/tieredmenu'
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items'
import { useBookmarksPanelStore } from '@/stores/bookmarksPanel'
import { chromeStorage } from '@/plugins/chromeStorage'

const settingsStore = useSettingsStore()
const itemsStore = useItemsStore()
const bookmarksPanelStore = useBookmarksPanelStore()

const menu = ref(null)
const bookmarksTree = ref([])
const menuItems = ref([])

// Initialize bookmarks panel store and load bookmarks
onMounted(async () => {
  await bookmarksPanelStore.initialize()
  loadBookmarks()
})

const loadBookmarks = () => {
  // eslint-disable-next-line
  chrome.bookmarks.getTree((tree) => {
    bookmarksTree.value = tree[0].children || []
    menuItems.value = transformBookmarksToMenuItems(bookmarksTree.value)
  })
}

const transformBookmarksToMenuItems = (bookmarks) => {
  const items = []

  // Transform bookmarks tree
  bookmarks.forEach((bookmark) => {
    const item = transformBookmarkToMenuItem(bookmark)
    if (item) {
      items.push(item)
    }
  })

  // Add "Manage" link at the bottom
  if (items.length > 0) {
    items.push(
      {
        separator: true
      },
      {
        label: 'Manage',
        url: 'chrome://bookmarks',
        command: ({ originalEvent }) => {
          originalEvent.preventDefault()
          // eslint-disable-next-line
          chrome.tabs.create({ url: 'chrome://bookmarks' })
        }
      }
    )
  }

  return items
}

const transformBookmarkToMenuItem = (bookmark) => {
  if (bookmark.id === '0') {
    return null
  }

  const item = {
    label: bookmark.title || 'Untitled',
    id: bookmark.id
  }

  if (bookmark.children && bookmark.children.length > 0) {
    const childItems = bookmark.children
      .map((child) => transformBookmarkToMenuItem(child))
      .filter((child) => child !== null)

    if (childItems.length > 0) {
      item.items = childItems
    } else {
      item.items = [
        {
          label: '',
          isDummy: true
        }
      ]
    }
    item.icon = 'fa-solid fa-folder'
  } else if (bookmark.children && bookmark.children.length === 0) {
    item.items = [
      {
        label: '',
        isDummy: true
      }
    ]
    item.icon = 'fa-solid fa-folder'
  }
  // If it's a bookmark (has URL)
  else if (bookmark.url) {
    item.url = bookmark.url
    item.favicon = getFaviconUrl(bookmark.url)
    item.showAddButton = true
  } else {
    // Skip items without URL or children
    return null
  }

  return item
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

const addTile = (item) => {
  if (item.url) {
    itemsStore.addItem({
      url: item.url,
      label: item.label,
      fontColor: '#000000',
      bgColor: '#ffffff',
      size: 's'
    })
  }
}

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<style lang="scss" scoped></style>
