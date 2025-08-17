<template>
  <li>
    <a :href="url">
      <img
        v-if="faviconUrl"
        :src="faviconUrl"
        class="favicon w-4 h-4 mr-2 rounded-sm"
        alt="favicon"
        @error="handleFaviconError"
      />
      <font-awesome-icon v-else :icon="['far', 'bookmark']" class="mr-2" />
      <span class="bookmark-label text-md max-w-72 text-ellipsis overflow-hidden">{{
        title
      }}</span>
      <span v-if="lastVisit" class="ml-1 opacity-40">{{ lastVisit }}</span>
    </a>
  </li>
</template>

<script>
import { chromeStorage } from "@/plugins/chromeStorage";

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
