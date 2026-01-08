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
  async created() {
    try {
      await this.settings.initializeStore();

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
      console.error("Failed to load app data:", error);
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

<style scoped>
</style>
