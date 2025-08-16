<template>
  <li>
    <details :open="isOpen" @toggle="handleToggle">
      <summary>
        <font-awesome-icon :icon="['fas', isOpen ? 'folder-open' : 'folder']" />{{
          title
        }}
      </summary>
      <ul>
        <template v-for="item of items" :key="item.dateAdded">
          <template v-if="item.children">
            <BookmarkFolder
              :items="item.children"
              :title="item.title"
              :folder-id="item.id"
            />
          </template>
          <template v-if="item.url">
            <BookmarkItem :url="item.url" :title="item.title" />
          </template>
        </template>
      </ul>
    </details>
  </li>
</template>

<script>
import BookmarkItem from "./BookmarkItem.vue";
import { useBookmarksPanelStore } from "@/stores/bookmarksPanel";

export default {
  name: "BookmarkFolder",
  components: { BookmarkItem },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    folderId: {
      type: String,
      required: true,
    },
  },
  computed: {
    isOpen() {
      const bookmarksPanelStore = useBookmarksPanelStore();
      return bookmarksPanelStore.isFolderOpen(this.folderId);
    },
  },
  methods: {
    async handleToggle(event) {
      const bookmarksPanelStore = useBookmarksPanelStore();
      const isOpen = event.target.open;
      if (isOpen) {
        await bookmarksPanelStore.addOpenFolder(this.folderId);
      } else {
        await bookmarksPanelStore.removeOpenFolder(this.folderId);
      }
    },
  },
};
</script>
