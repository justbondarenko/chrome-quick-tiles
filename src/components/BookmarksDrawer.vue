<template>
  <Button
    severity="secondary"
    icon="pi pi-bookmark"
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
      <span v-if="item.isDummy" class="flex items-center gap-2 px-4 py-2.5 opacity-50 select-none disabled">Empty</span>
      <a
        v-else
        v-ripple
        :href="item.url"
        class="relative flex items-center gap-2 group w-full max-w-[250px]"
        v-bind="props.action"
      >
        <img
          v-if="item.favicon"
          :src="item.favicon"
          class="w-4 h-4 rounded-sm flex-shrink-0"
          alt="favicon"
          @error="handleFaviconError(item)"
        />
        <span v-else-if="item.emoji" class="flex-shrink-0">{{ item.emoji }}</span>
        <i v-else-if="item.icon" :class="item.icon" />
        <span class="truncate w-full">{{ item.label }}</span>
        <i v-if="item.url === 'chrome://bookmarks'" class="pi pi-external-link ml-2" />
        <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
      </a>
    </template>
  </TieredMenu>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import TieredMenu from 'primevue/tieredmenu'
import { useSettingsStore } from '@/stores/settings'
import { useBookmarksStore } from '@/stores/bookmarks'
import { chromeStorage } from '@/plugins/chromeStorage'

const settingsStore = useSettingsStore()
const bookmarksStore = useBookmarksStore()

const menu = ref(null)

const menuItems = computed(() => {
  return transformBookmarksToMenuItems(bookmarksStore.bookmarksTree)
})

const transformBookmarksToMenuItems = (bookmarks) => {
  const items = []

  bookmarks.forEach((bookmark) => {
    const item = transformBookmarkToMenuItem(bookmark)
    if (item) {
      items.push(item)
    }
  })

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

const extractEmoji = (text) => {
  if (!text) return null

  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}\u200D[\p{Emoji}\u200D]*)/u
  const match = text.match(emojiRegex)
  return match ? match[0] : null
}

const stripEmoji = (text) => {
  if (!text) return text

  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}\u200D[\p{Emoji}\u200D]*)\s*/u
  return text.replace(emojiRegex, '').trim()
}

const transformBookmarkToMenuItem = (bookmark) => {
  if (bookmark.id === '0') {
    return null
  }

  const title = bookmark.title || 'Untitled'
  const emoji = extractEmoji(title)
  const label = emoji ? stripEmoji(title) : title

  const item = {
    label,
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

    if (emoji) {
      item.emoji = emoji
    } else {
      item.icon = 'pi pi-folder'
    }
  } else if (bookmark.children && bookmark.children.length === 0) {
    item.items = [
      {
        label: '',
        isDummy: true
      }
    ]

    if (emoji) {
      item.emoji = emoji
    } else {
      item.icon = 'pi pi-folder'
    }
  } else if (bookmark.url) {
    item.url = bookmark.url
    item.favicon = chromeStorage.getFaviconUrl(bookmark.url)
    item.showAddButton = true
  } else {
    return null
  }

  return item
}

const handleFaviconError = (item) => {
  if (item) {
    item.favicon = null
  }
}

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<style lang="scss" scoped></style>
