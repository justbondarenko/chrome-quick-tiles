<template>
  <div class="drawer">
    <input id="bookmarks-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="bookmarks-drawer" class="btn drawer-button"><FontAwesomeIcon :icon="['far', 'bookmark']" />Bookmarks</label>
    </div>
    <div class="drawer-side z-50">
      <label for="bookmarks-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="p-4 w-96 h-full bg-base-200 text-base-content flex flex-col overflow-y-auto">
        <BookmarksList />
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksList from './BookmarksList.vue';


export default {
  name: 'BookmarksDrawer',
  components: { BookmarksList }
}
</script>
