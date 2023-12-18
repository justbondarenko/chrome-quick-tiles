<template>
  <ul class="menu bg-base-200 w-full rounded-box">
    <template v-for="item of tree" :key="item.dateAdded">
      <template v-if="item.children">
        <BookmarkFolder :items="item.children" :title="item.title" />
      </template>
      <template v-if="item.url">
        <BookmarkItem :url="item.url" :title="item.title" />
      </template>
    </template>
  </ul>
</template>


<script>
import { useSettingsStore } from '@/stores/settings'
import BookmarkFolder from './BookmarkFolder.vue'
import BookmarkItem from './BookmarkItem.vue'
export default {
  name: 'BookmarksList',
  components: { BookmarkFolder, BookmarkItem },
  data() {
    return {
      settingsStore: useSettingsStore(),
      open: false,
      tree: [] 
    }
  },
  methods:{
    
  },
  mounted() {
    // eslint-disable-next-line
    chrome.bookmarks.getTree((tree) => {
      this.tree = tree[0].children;
    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep ul, li {
  max-width: 100%;
}
</style>


