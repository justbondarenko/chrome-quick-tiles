<script>

export default {
  name: 'GridSettings',
  props: {
    settingsStore: {
      required: true
    }
  },
  methods: {
    onGridWidthChange(value) {
      return this.settingsStore.setGridWidth(value);
    },
    onGridGapChange(value) {
      return this.settingsStore.setGridGap(value);
    },
    onToolbarPositionChange(value) {
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
      Page settings
    </div>
    <div class="collapse-content flex flex-col gap-2">
      <div class="page-settings-item hover:bg-base-200">
        <label class="w-1/3 mb-1 whitespace-nowrap">Grid width: {{ settingsStore.gridWidth }}%</label>
        <input type="range" min="0" max="100" class="range range-xs" step="5" :value="settingsStore.gridWidth"
          @input="onGridWidthChange($event.target.value)" />
      </div>
      <div class="page-settings-item hover:bg-base-200">
        <label class="w-1/3 mb-1 whitespace-nowrap">Grid gap: {{ settingsStore.gridGap }}px</label>
        <input type="range" min="2" max="50" class="range range-xs" step="1" :value="settingsStore.gridGap"
          @input="onGridGapChange($event.target.value)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
