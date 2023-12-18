<template>
  <ul class="menu bg-base-200 w-full rounded-box">
    <BookmarkItem v-for="item of tree" :key="item.id" :url="item.url" :title="item.title" />
  </ul>
</template>


<script>
import BookmarkItem from '../bookmarks/BookmarkItem.vue'
export default {
  name: 'RecentsList',
  components: { BookmarkItem },
  data() {
    return {
      tree: [] 
    }
  },
  beforeMount() {
    // eslint-disable-next-line
    chrome.history.search({ maxResults: 10, text: "" }, (items) => {
      this.tree = items;
    });
  }
}
</script>

<style lang="scss" scoped>
::v-deep ul, li {
  max-width: 100%;
}
</style>


