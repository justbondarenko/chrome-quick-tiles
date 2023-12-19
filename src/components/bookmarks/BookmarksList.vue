<template>
  <ul class="menu bg-base-200 rounded-box">
    <li class="pointer-events-none"><a>Bookmarks</a></li>
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
import BookmarkFolder from './BookmarkFolder.vue'
import BookmarkItem from './BookmarkItem.vue'
export default {
  name: 'BookmarksList',
  components: { BookmarkFolder, BookmarkItem },
  data() {
    return {
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


