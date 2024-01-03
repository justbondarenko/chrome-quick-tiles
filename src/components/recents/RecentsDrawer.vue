<template>
  <div class="dropdown" :class="{'dropdown-top': settingsStore.toolbarPosition === 'bottom' }" >
    <div tabindex="0" role="button" class="btn flex-nowrap"><FontAwesomeIcon :icon="['fas', 'clock-rotate-left']" class="fa-fw" /> <span
          v-if="settingsStore.showRecentlyClosedLabel">Recently closed</span></div>
    <RecentsList tabindex="0" :class="{'mb-2': settingsStore.toolbarPosition === 'bottom', 'mt-2': settingsStore.toolbarPosition === 'top'}" class="flex-nowrap dropdown-content z-[2] menu p-2 shadow-md bg-base-200 rounded-box w-96 mt-2 overflow-y-auto" />
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
