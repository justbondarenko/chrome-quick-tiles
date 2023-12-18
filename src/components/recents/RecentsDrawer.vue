<template>
  <div class="drawer">
    <input id="recents-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="recents-drawer" class="btn drawer-button"><FontAwesomeIcon :icon="['fas', 'clock-rotate-left']" class="fa-fw" /> <template
          v-if="settingsStore.showRecentlyClosedLabel">Recently closed</template></label>
    </div>
    <div class="drawer-side z-50">
      <label for="recents-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="p-4 w-96 h-full bg-base-200 text-base-content flex flex-col overflow-y-auto">
        <RecentsList />
      </div>
    </div>
  </div>
</template>

<script>
import { useSettingsStore } from '@/stores/settings';
import RecentsList from './RecentsList.vue';

export default {
  name: 'RecentsDrawer',
  components: { RecentsList },
  data() {
    return {
      settingsStore: useSettingsStore()
    }
  }
}
</script>
