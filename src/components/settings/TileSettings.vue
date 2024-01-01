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
      favIconSizes() {
          const sizes = [{ value: 16, }, { value: 24 }, { value: 32 }, { value: 0 }];
          sizes.forEach((size) => {
              size.checked = size.value === this.settingsStore.tileFaviconSize;
          });
          return sizes;
      },
      onTileLabelInput(event) {
        this.settingsStore.setHideTileLabel(event.target.checked)
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
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Hide labels?</span> 
              <input type="checkbox" :checked="settingsStore.hideTileLabel" class="toggle" @input="onTileLabelInput($event)"/>
            </label>
          </div>
          <div v-if="!settingsStore.hideTileLabel" class="page-settings-item hover:bg-base-200">
            <span>Label position:</span>
            <div class="mt-1 rounded-md border-transparent p-3 grid grid-cols-2 grid-rows-2 gap-5">
              <input v-for="position, index of positions()" :key="index" type="radio" name="label-position" class="radio" @input="settingsStore.setTileLabelPosition(position.value)" :checked="position.checked" />
            </div>
          </div>
          <div class="page-settings-item hover:bg-base-200">
            <label class="w-1/3 mb-1 whitespace-nowrap">
              Tile corner radius: {{ settingsStore.tileCornerRadius }}px
            </label>
            <div class="flex flex-row gap-2 items-center">
              <input type="range" min="0" max="30" :value="settingsStore.tileCornerRadius" class="range range-xs" step="1" @input="settingsStore.setTileCornerRadius($event.target.value)"/>
            </div>
          </div>
          <div class="page-settings-item hover:bg-base-200">
            <label class="w-1/3 mb-1 whitespace-nowrap">
              Favicon size: {{ settingsStore.tileFaviconSize }}px
            </label>
            <div class="mt-1 rounded-md border-transparent grid grid-cols-4 grid-rows-1 p-3">
              <label v-for="size, index of favIconSizes()" :key="index" class="label cursor-pointer flex flex-col gap-2 flex-nowrap">
                <input type="radio" name="radio-10" class="radio" @input="settingsStore.setTileFaviconSize(size.value)" :checked="size.checked"  />
                <span class="label-text">{{ size.value ? `${size.value} px ` : 'Hide'}}</span> 
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>