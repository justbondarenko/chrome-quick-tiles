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
  async beforeCreate() {
    try {
      // Batch all settings into a single storage call for better performance
      const settings = await chromeStorage.getMultiple([
        "toolbarPosition",
        "gridWidth",
        "gridGap",
        "tileCornerRadius",
        "tileFaviconSize",
        "hideTileLabel",
        "tileLabelPosition",
        "showBookmarksLabel",
        "showRecentlyClosedLabel",
        "showNewTileLabel",
        "showSettingsLabel",
      ]);

      // Set all settings with fallback values
      const settingsToSet = {
        toolbarPosition: settings.toolbarPosition ?? "top",
        gridWidth: settings.gridWidth ?? "95",
        gridGap: settings.gridGap ?? 15,
        tileCornerRadius: settings.tileCornerRadius ?? "10",
        tileFaviconSize: settings.tileFaviconSize ?? "24",
        hideTileLabel: settings.hideTileLabel ?? true,
        tileLabelPosition: settings.tileLabelPosition ?? "bottom right",
        showBookmarksLabel: settings.showBookmarksLabel ?? false,
        showRecentlyClosedLabel: settings.showRecentlyClosedLabel ?? false,
        showNewTileLabel: settings.showNewTileLabel ?? false,
        showSettingsLabel: settings.showSettingsLabel ?? false,
      };

      // Batch set all settings at once - much more efficient
      await this.settings.setMultipleSettings(settingsToSet);

      // Load images and links in parallel
      const [localImages, links] = await Promise.all([
        chromeStorage.getLocalAll(),
        chromeStorage.get("links"),
      ]);

      // Set images
      for (const [key, value] of Object.entries(localImages)) {
        this.images.set(key, value);
      }

      // Set items
      if (links) {
        this.items.setItems(JSON.parse(links));
      }
    } catch (error) {
      console.error("Failed to load app settings:", error);
      // Set default values on error
      this.settings.setToolbarPosition("top");
      this.settings.setGridWidth("95");
      this.settings.setGridGap(15);
      this.settings.setTileCornerRadius("10");
      this.settings.setTileFaviconSize("24");
      this.settings.setHideTileLabel(true);
      this.settings.setTileLabelPosition("bottom right");
      this.settings.setLabelFor("bookmarks", false);
      this.settings.setLabelFor("recentlyClosed", false);
      this.settings.setLabelFor("newTile", false);
      this.settings.setLabelFor("settings", false);
    }
  },
  methods: {
    flexOrientation() {
      return this.settings.toolbarPosition === "top" ? "flex-col" : "flex-col-reverse";
    },
  },
});
</script>

<template>
  <div class="app flex w-full h-screen gap-4" :class="[flexOrientation()]">
    <ToolbarComponent />
    <div class="grow p-4 flex flex-col justify-start items-start overflow-auto">
      <TilesGrid />
    </div>
  </div>
</template>

<style scoped></style>
