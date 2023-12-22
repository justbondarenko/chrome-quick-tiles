<template>
  <li>
    <a :href="url">
      <FontAwesomeIcon :icon="icon()" />
      <span class="bookmark-label ml-1 max-w-72 text-ellipsis overflow-hidden">{{ title }}</span>
      <span v-if="lastVisit" class="ml-1 opacity-40"> {{ lastVisit }}</span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'BookmarkItem',
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    lastVisit: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      icons: []
    }
  },
  methods: {
    baseDomain() {
      try {
        const { hostname } = new URL(this.url);
        const parts = hostname.split('.');
        return parts.length > 1 ? parts.slice(-2)[0] : parts[0];
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    icon() {
      let base = this.baseDomain();
      if (base === 'last') { base = 'lastfm' }
      if (base === 'stackoverflow') { base = 'stack-overflow'}
      return this.icons.includes(base) ? ['fab', base] : ['far', 'bookmark'];
    }
  },
  async mounted() {
    const { items } = await import('./icons.json')
    this.icons = items;
  }
}
</script>

<style lang="scss">
.bookmark-label {
  white-space: nowrap;
}
</style>

