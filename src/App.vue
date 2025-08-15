<script>
import { defineComponent } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useItemsStore } from "@/stores/items";
import { useImageStore } from "@/stores/image";
import ToolbarComponent from "./components/ToolbarComponent.vue";
import TilesGrid from "@/components/tiles/TilesGrid.vue";
import { chromeStorage } from "./plugins/chromeStorage";

export default defineComponent({
  components: {
    ToolbarComponent,
    TilesGrid,
  },
  data() {
    return {
      settings: useSettingsStore(),
      items: useItemsStore(),
      images: useImageStore(),
    };
  },
  beforeCreate() {
    Promise.all([
      chromeStorage.get("toolbarPosition").then((value) => {
        this.settings.setToolbarPosition(value ?? "top");
      }),
      chromeStorage.get("gridWidth").then((value) => {
        this.settings.setGridWidth(value ?? "95");
      }),
      chromeStorage.get("gridGap").then((value) => {
        this.settings.setGridGap(value ?? 15);
      }),
      chromeStorage.get("tileCornerRadius").then((value) => {
        this.settings.setTileCornerRadius(value ?? "10");
      }),
      chromeStorage.get("tileFaviconSize").then((value) => {
        this.settings.setTileFaviconSize(value ?? "24");
      }),
      chromeStorage.get("hideTileLabel").then((value) => {
        this.settings.setHideTileLabel(value ?? true);
      }),
      chromeStorage.get("tileLabelPosition").then((value) => {
        this.settings.setTileLabelPosition(value ?? "bottom right");
      }),
      chromeStorage.get("showBookmarksLabel").then((value) => {
        this.settings.setLabelFor("bookmarks", value ?? false);
      }),
      chromeStorage.get("showRecentlyClosedLabel").then((value) => {
        this.settings.setLabelFor("bookmarks", value ?? false);
      }),
      chromeStorage.get("showNewTileLabel").then((value) => {
        this.settings.setLabelFor("bookmarks", value ?? false);
      }),
      chromeStorage.get("showSettingsLabel").then((value) => {
        this.settings.setLabelFor("bookmarks", value ?? false);
      }),
      chromeStorage.getLocalAll().then((res) => {
        for (const [key, value] of Object.entries(res)) {
          this.images.set(key, value);
        }
      }),
    ]);

    chromeStorage.get("links").then((value) => {
      if (value) {
        this.items.setItems(JSON.parse(value));
      }
    });
  },
  methods: {
    flexOrientation() {
      return this.settings.toolbarPosition === "top" ? "flex-col" : "flex-col-reverse";
    },
  },
});
</script>

<template>
  <div class="app flex w-100 h-screen" :class="[flexOrientation()]">
    <ToolbarComponent />
    <div class="grow p-6">
      <TilesGrid />
    </div>
  </div>
</template>

<style scoped></style>
