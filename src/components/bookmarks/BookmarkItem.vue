<template>
  <li class="group">
    <a :href="url">
      <img
        v-if="faviconUrl"
        :src="faviconUrl"
        class="favicon w-4 h-4 mr-2 rounded-sm relative"
        alt="favicon"
        @error="handleFaviconError"
      />
      <i v-else class="fa-regular fa-bookmark mr-2" />
      <span class="bookmark-label text-md max-w-72 text-ellipsis overflow-hidden">{{
        title
      }}</span>
      <span v-if="lastVisit" class="ml-1 opacity-40">{{ lastVisit }}</span>

      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 btn btn-xs btn-square invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-100 delay-300"
        @click.prevent.stop="addTile"
      >
        <i class="fa-solid fa-plus fa-xs" />
      </button>
    </a>
  </li>
</template>

<script>
import { chromeStorage } from "@/plugins/chromeStorage";
import { useItemsStore } from "@/stores/items";

export default {
  name: "BookmarkItem",
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lastVisit: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      faviconLoadError: false,
      items: useItemsStore(),
    };
  },
  computed: {
    faviconUrl() {
      if (!this.url || this.faviconLoadError) {
        return null;
      }
      const url = new URL(chromeStorage.getRuntimeURL("/_favicon/"));
      url.searchParams.set("pageUrl", this.url);
      url.searchParams.set("size", "24");
      return url.toString();
    },
  },
  mounted() {
    this.preloadFavicon();
  },
  methods: {
    preloadFavicon() {
      if (this.faviconUrl) {
        const img = new Image();
        img.src = this.faviconUrl;
        img.onload = () => {};
        img.onerror = () => {
          console.warn(`Failed to load favicon for: ${this.url}`);
          this.faviconLoadError = true;
        };
      }
    },
    handleFaviconError() {
      this.faviconLoadError = true;
    },
    baseDomain() {
      try {
        const { hostname } = new URL(this.url);
        const parts = hostname.split(".");
        return parts.length > 1 ? parts.slice(-2)[0] : parts[0];
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    addTile() {
      this.items.addItem({
        url: this.url,
        label: this.title,
        fontColor: "#000000",
        bgColor: "#ffffff",
        size: "s",
      });
    },
  },
};
</script>

<style lang="scss">
.bookmark-label {
  white-space: nowrap;
}

.favicon {
  object-fit: contain;
}
</style>
