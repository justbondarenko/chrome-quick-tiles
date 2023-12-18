<script>
import TileElement from '../tiles/TileElement.vue';

export default {
    name: 'TileSettings',
    props: {
        settingsStore: {
            required: true
        }
    },
    methods: {
        positions() {
            const positions = [{ value: 'top left' }, { value: 'top right' }, { value: 'bottom left' }, { value: 'bottom right' }];
            positions.forEach((p) => {
                p.checked = p.value === this.settingsStore.tileLabelPosition;
            });
            return positions;
        },
        onGridWidthChange(value) {
            return this.settingsStore.setGridWidth(value);
        },
        onGridGapChange(value) {
            return this.settingsStore.setGridGap(value);
        }
    },
    components: { TileElement }
}
</script>

<template>
  <div class="collapse bg-base-100">
      <input type="radio" name="settings-accordion" />
      <div class="collapse-title text-xl font-medium">
        Tile settings
      </div>
      <div class="collapse-content">
        <TileElement class="pointer-events-none" label="Tile Preview" size="m" bg-color="black"
          :label-position="settingsStore.tileLabelPosition" url="http://google.com"
          :corner-radius="settingsStore.tileCornerRadius + 'px'" />
        
        <div class="card-body p-0 mt-3">
          <div class="page-settings-item hover:bg-zinc-100">
            <span>Label position:</span>
            <div class="mt-1 rounded-md border-transparent p-3 grid grid-cols-2 grid-rows-2 gap-5">
              <input v-for="position, index of positions()" :key="index" type="radio" name="label-position" class="radio" @input="settingsStore.setTileLabelPosition(position.value)" :checked="position.checked" />
            </div>
          </div>
          <div class="page-settings-item hover:bg-zinc-100">
            <label class="w-1/3 mb-1 whitespace-nowrap">
              Tile corner radius: {{ settingsStore.tileCornerRadius }}px
            </label>
            <div class="flex flex-row gap-2 items-center">
              <input type="range" min="0" max="30" :value="settingsStore.tileCornerRadius" class="range range-xs" step="1" @input="settingsStore.setTileCornerRadius($event.target.value)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>