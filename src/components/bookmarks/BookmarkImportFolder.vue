<template>
  <details class="dropdown">
    <summary class="btn flex-nowrap">
      <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'folder' }" />Select & import
    </summary>
    <ul
      class="overflow-y-auto p-2 shadow-md menu dropdown-content bg-base-200 rounded-box mt-1">
      <li class="pointer-events-none">All non-empty folders</li>
      <li v-for="item, index in extractFolders()" :key="index" class="w-48" @click="onItemClick(item)">
        <span>
          <FontAwesomeIcon :icon="['fas', 'folder']" />
          <span class="text-ellipsis overflow-hidden whitespace-nowrap">{{ item.title }}</span>
        </span>
      </li>
    </ul>
  </details>
</template>

<script>
import { useItemsStore } from '@/stores/items'
export default {
  name: 'BookmarkImportFolder',
  data() {
    return {
      items: useItemsStore(),
      tree: []
    }
  },
  async beforeMount() {
    // eslint-disable-next-line
    chrome.bookmarks.getTree().then((res) => this.tree = res[0].children)
  },
  methods: {
    onItemClick(item) {
      const links = item.children.filter((i) => !!i.url).map((i) => {
        return {
          url: i.url,
          label: i.title,
          fontColor: "white",
          bgColor: "black",
          size: "m"
        }
      })
      links.forEach((link) => this.items.addItem(link))
    },
    extractFolders: function () {
      let elements = [];

      function extract(obj) {
        if (obj.children && obj.children.length) {
          elements.push(obj);
        }
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach(child => {
            extract(child);
          });
        }
      }

      this.tree.forEach(obj => {
        extract(obj);
      });
      return elements;
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flow;
  columns: 2;
}
</style>