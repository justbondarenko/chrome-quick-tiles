<template>
  <div class="list-wrapper">
    <ul class="flex-nowrap overflow-y-auto">
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
  </div>
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
.list-wrapper {
  max-height: 85vh;
}

::v-deep ul, li {
  max-width: 100%;
}
</style>


