<script>
import { defineComponent } from 'vue';
import { useSettingsStore } from '@/stores/settings'
import { useItemsStore } from '@/stores/items';
import ToolbarComponent from './components/ToolbarComponent.vue';
import TilesGrid from '@/components/tiles/TilesGrid.vue';
import { chromeStorage } from './plugins/chromeStorage';
import { v4 as uuid } from 'uuid';

export default defineComponent({
  components: {
    ToolbarComponent,
    TilesGrid
  },
  data() {
    return {
      settings: useSettingsStore(),
      items: useItemsStore(),
      mockItems: [
        {
          "id": uuid(),
          "label": "Facebook",
          "url": "https://www.facebook.com",
          "bgColor": "#1877F2",
          "size": "s"
        },
        {
          "id": uuid(),
          "url": "https://www.twitter.com",
          "label": "Twitter",
          "bgColor": "#1DA1F2",
          "size": "m"
        },
        {
          "id": uuid(),
          "url": "https://www.instagram.com",
          "label": "Instagram",
          "bgColor": "#C13584",
          "size": "s"
        },
        {
          "id": uuid(),
          "url": "https://www.linkedin.com",
          "label": "LinkedIn",
          "bgColor": "#0A66C2",
          "size": "m"
        },
        {
          "id": uuid(),
          "url": "https://www.youtube.com",
          "label": "YouTube",
          "bgColor": "#FF0000",
          "size": "s"
        }
      ]
    }
  },
  beforeCreate() {
    chromeStorage.get('links').then((value) => {
      value
        ? this.items.setItems(value)
        : chromeStorage.set('links', JSON.stringify(this.mockItems))
    }),
    chromeStorage.get('toolbarPosition').then((value) => {
      this.settings.setToolbarPosition(value ?? 'top');
    }),
    chromeStorage.get('gridWidth').then((value) => {
      this.settings.setGridWidth(value ?? '85');
    }),
    chromeStorage.get('gridGap').then((value) => {
      this.settings.setGridGap(value ?? '4');
    }),
    chromeStorage.get('tileCornerRadius').then((value) => {
      this.settings.setTileCornerRadius(value ?? '10');
    }),
    chromeStorage.get('tileLabelPosition').then((value) => {
      this.settings.setTileLabelPosition(value ?? 'bottom right');
    }),
    chromeStorage.get('showBookmarksLabel').then((value) => {
      this.settings.setLabelFor('bookmarks', value ?? false);
    }),
    chromeStorage.get('showRecentlyClosedLabel').then((value) => {
      this.settings.setLabelFor('bookmarks', value ?? false);
    }),
    chromeStorage.get('showNewTileLabel').then((value) => {
      this.settings.setLabelFor('bookmarks', value ?? false);
    }),
    chromeStorage.get('showSettingsLabel').then((value) => {
      this.settings.setLabelFor('bookmarks', value ?? false);
    })
  },
  methods : {
    flexOrientation() {
      return this.settings.toolbarPosition === 'top' ? 'flex-col' : 'flex-col-reverse'
    }
  }
})
</script>



<template>
  <div class="app flex w-100 h-screen" :class="[flexOrientation()]">
    <ToolbarComponent />
    <div class="grow">
      <TilesGrid />
    </div>
  </div>
</template>

<style scoped>
</style>
