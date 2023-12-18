<script>
import TileElement from './TileElement.vue'
import { useSettingsStore } from '@/stores/settings'
export default {
  name: 'TilesGrid',
  components: { TileElement },
  data() {
    return {
      settingsStore: useSettingsStore(),
      items: [
        {
          "id": 1,
          "label": "Facebook",
          "url": "https://www.facebook.com",
          "bgColor": "#1877F2",
          "size": "s"
        },
        {
          "id": 2,
          "url": "https://www.twitter.com",
          "label": "Twitter",
          "bgColor": "#1DA1F2",
          "size": "m"
        },
        {
          "id": 3,
          "url": "https://www.instagram.com",
          "label": "Instagram",
          "bgColor": "#C13584",
          "size": "s"
        },
        {
          "id": 4,
          "url": "https://www.linkedin.com",
          "label": "LinkedIn",
          "bgColor": "#0A66C2",
          "size": "m"
        },
        {
          "id": 5,
          "url": "https://www.youtube.com",
          "label": "YouTube",
          "bgColor": "#FF0000",
          "size": "s"
        }
      ]
    }
  },
  methods: {
    style: function () {
      console.log(`gap:${this.settingsStore.gradGap}px;max-width:${this.settingsStore.gradWidth}%;`)
      return `gap:${this.settingsStore.gridGap}px;max-width:${this.settingsStore.gridWidth}%;`
    }
  }
}


</script>

<template>
  <div class="tiles-grid flex overflow-y-auto flex-wrap mx-auto" :style="style()">
    <TileElement v-for="item, index of items" :key="index" :url="item.url" :label="item.label" :bg-color="item.bgColor" :font-color="item.fontColor" :size="item.size" />
  </div>
</template>

<style lang="scss" scoped>
.tiles-grid {
  min-width: 260px;
}
</style>