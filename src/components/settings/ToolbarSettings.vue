<script>

export default {
  name: 'ToolbarSettings',
  props: {
    settingsStore: {
      required: true
    }
  },
  methods: {
    onToolbarPositionChange(value) {
      console.log(value)
      return this.settingsStore.setToolbarPosition(value ? 'top' : 'bottom');
    },
    toolbarPositions() {
      return ['top', 'bottom']
    }
  }
}
</script>

<template>
  <div class="collapse bg-base-100">
    <input type="radio" name="settings-accordion" />
    <div class="collapse-title text-xl font-medium">
      Toolbar settings
    </div>
    <div class="collapse-content flex flex-col gap-2">
      <div class="page-settings-item hover:bg-base-200">
        <label class="mb-1 whitespace-nowrap">Toolbar position:</label>
        <div class="flex gap-1 items-center">
          <div class="join w-fit">
            <input v-for="option of toolbarPositions()" :key="option" class="join-item btn btn-sm"  type="radio" name="size-options" :aria-label="option.toUpperCase()" :checked="settingsStore.toolbarPosition === option" @click="settingsStore.setToolbarPosition(option)" />
          </div>
        </div>
      </div>
      <div class="page-settings-item hover:bg-base-200">
        <label class="mb-1 whitespace-nowrap">Show labels for:</label>
        <div class="flex flex-col gap-2">
          <div class="form-control w-100">
            <label class="cursor-pointer label">
              <span class="label-text">Bookmarks</span> 
              <input type="checkbox" class="toggle toggle-sm" :checked="settingsStore.showBookmarksLabel"  @input="settingsStore.toggleLabelFor('bookmarks')"/>
            </label>
          </div>
          <div class="form-control w-100">
            <label class="cursor-pointer label">
              <span class="label-text">Recently Closed</span> 
              <input type="checkbox" class="toggle toggle-sm" :checked="settingsStore.showRecentlyClosedLabel" @input="settingsStore.toggleLabelFor('recentlyClosed')"/>
            </label>
          </div>
          <!-- <div class="form-control w-52">
            <label class="cursor-pointer label">
              <span class="label-text">Add New Tile</span> 
              <input type="checkbox" class="toggle" :checked="settingsStore.showNewTileLabel" @input="settingsStore.toggleLabelFor('newTile')"/>
            </label>
          </div>
          <div class="form-control w-52">
            <label class="cursor-pointer label">
              <span class="label-text">Settings</span> 
              <input type="checkbox" class="toggle" :checked="settingsStore.showSettingsLabel" @input="settingsStore.toggleLabelFor('settings')"/>
            </label>
          </div> -->
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
