<template>
  <div class="dropdown" :class="{'dropdown-top': settingsStore.toolbarPosition === 'bottom' }" >
    <div tabindex="0" role="button" class="btn flex-nowrap"><FontAwesomeIcon :icon="['far', 'bookmark']" /><template v-if="settingsStore.showBookmarksLabel">Bookmarks</template></div>
    <BookmarksList tabindex="0" :class="{'mb-2': settingsStore.toolbarPosition === 'bottom', 'mt-2': settingsStore.toolbarPosition === 'top'}" class="flex-nowrap dropdown-content z-[2] menu p-2 shadow-md bg-base-200 rounded-box w-96 mt-2 overflow-y-auto" />
  </div>
</template>

<script>
import BookmarksList from './BookmarksList.vue';
import { useSettingsStore } from '@/stores/settings'


export default {
  name: 'BookmarksDrawer',
  components: { BookmarksList },
  data() {
    return {
      settingsStore: useSettingsStore(),
    }
  }
}
</script>

<style lang="scss" scoped>
</style>