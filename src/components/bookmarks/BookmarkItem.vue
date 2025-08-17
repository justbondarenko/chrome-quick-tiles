<template>
  <li>
    <a :href="url">
      <font-awesome-icon :icon="['far', 'bookmark']" />
      <span class="bookmark-label text-md ml-1 max-w-72 text-ellipsis overflow-hidden">{{
        title
      }}</span>
      <span v-if="lastVisit" class="ml-1 opacity-40"> {{ lastVisit }}</span>
    </a>
  </li>
</template>

<script>
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
      icons: [],
    };
  },
  methods: {
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
</style>
