<template>
  <div class="drawer drawer-end">
    <input id="settings-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="settings-drawer" class="btn drawer-button">
        <FontAwesomeIcon :icon="{prefix: 'fas', iconName: 'gear'}" />
      </label>
    </div>
    <div class="drawer-side z-50">
      <label for="settings-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="p-4 w-fit h-full bg-base-200 text-base-content flex flex-col">
        <p class="prose-2xl">Settings</p>
        <div class="divider" />
        <div class="settings-wrapper flex flex-col gap-4 h-full">
          <GridSettings :settings-store="settingsStore" />
          <TileSettings :settings-store="settingsStore" />
          <MyContacts :settings-store="settingsStore" class="mt-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSettingsStore } from '@/stores/settings'
import GridSettings from './GridSettings.vue';
import TileSettings from './TileSettings.vue';
import MyContacts from './MyContacts.vue';

export default {
    name: 'SettingsSidebar',
    setup() {
    },
    data() {
      return {
          settingsStore: useSettingsStore()
      };
    },
    methods: {
      onTileCornerRadiusChange(value) {
          return this.settingsStore.setTileCornerRadius(value);
      },
      onTileLabelPosChange(value) {
          return this.settingsStore.setTileLabelPosition(value);
      },
    },
    components: { GridSettings, TileSettings, MyContacts }
}
</script>

<style lang="scss">
.page-settings-item {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 15px;
}
</style>
