<script>
import { useSettingsStore } from '@/stores/settings'
import { useImageStore } from '@/stores/image';

export default {
  name: 'TileElement',
  components: {
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    cornerRadius: {
      type: String,
    },
    size: {
      type: String,
      default: 's'
    },
    bgColor: {
      type: String,
      default: 'black'
    },
    fontColor: {
      type: String,
      default: 'white'
    },
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      imgStore: useImageStore(),
      active: false,
    }
  },
  methods: {
    style: function () {
      const width = this.size === 's' ? 128 : 128 * 2 + Number(this.settingsStore.gridGap);
      const styles = [`border-radius: ${this.settingsStore.tileCornerRadius}px !important; width: ${width}px;`];
      styles.push(`background-color: ${this.bgColor};`);
      styles.push(`color: ${this.fontColor};`);
      return styles.join('');
    },
    textAlign() {
      return this.settingsStore.tileLabelPosition.includes('right') ? 'text-right' : 'text-left'
    },
    labelPosition: function () {
      return this.settingsStore.tileLabelPosition;
    },
    controlsPosition: function () {
      return ['top right', 'top left'].includes(this.settingsStore.tileLabelPosition) ? 'bottom right' : 'top right';
    },
    faviconPosition() {
      return ['top right', 'top left'].includes(this.settingsStore.tileLabelPosition) ? 'bottom-3 left-3' : 'top-3 left-3';
    },
    changeSize() {
      this.$emit('setSize', this.size === 's' ? 'm' : 's')
    },
    favicon(size) {
      const url = new URL(chrome.runtime.getURL("/_favicon/"));
      url.searchParams.set("pageUrl", this.url);
      url.searchParams.set("size", size);
      return url.toString();
    }
  }
}
</script>


<template>
  <a class="btn tile p-1 group" :class="[size]" :href="url" :style="style()">
    <img v-if="settingsStore.tileFaviconSize && url" :src="favicon(settingsStore.tileFaviconSize)" class="favicon absolute rounded-md" :class="faviconPosition()" alt="favicon" />
    <div v-if="imgStore.items[id]" class="image-wrapper bg-gradient-to-t from-black to-50%" :style="`border-radius:${this.settingsStore.tileCornerRadius}px`" >
      <img class="w-full h-full" :src="imgStore.items[id]" :alt="`Tile background for ${label}`" />
    </div>
    <span v-if="!settingsStore.hideTileLabel" class="label absolute overflow-hidden whitespace-nowrap" :class="`${labelPosition()} ${textAlign()}`">{{ label }}</span>
    <div class="controls hover:bg-base-100 p-1 rounded-lg absolute invisible pointer-events-none" :class="controlsPosition()">
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110 cursor-grab move-handle" @click.prevent="">
        <FontAwesomeIcon :icon="['fas', 'up-down-left-right']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="changeSize()">
        <FontAwesomeIcon :icon="['fas', size === 's' ? 'chevron-right' : 'chevron-left']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('remove')">
        <FontAwesomeIcon :icon="['fas', 'trash']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('edit')">
        <FontAwesomeIcon :icon="['fas', 'edit']" />
      </button>
    </div>
  </a>
</template>

<style lang="scss" scoped>
$base: 128px;

.tile {
  padding: 10px;
  color: white;
  position: relative;
  border: none;
  transition: width 0.2s ease-in-out, left 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-out;
    > .controls {
      width: 30px;
      visibility: visible;
      transition-delay: .75s;
      pointer-events: auto;
      display: flex;
      flex-direction: row-reverse;
      gap: 1px;
      flex-wrap: nowrap;
      align-items: flex-end;
      overflow: hidden;
      transition: width 0.5s ease-in-out, left 0.5s ease-in-out;
      &:hover {
        width: fit-content;
      }
    }
  }

  > .image-wrapper {
    position: absolute;
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    overflow: hidden;

    > img { 
      object-fit: cover;
      object-position: center;
      min-width: 100%; 
      min-height: 100%;
    }
  }

  &.s {
    height: $base;

    > .label {
      max-width: 100px;
      width: fit-content;
    }
  }

  &.m {
    height: $base;
    > .label {
      max-width: 200px;
      width: fit-content;
    }
  }

  .top {
    top: 10px;
  }

  .right {
    right: 10px;
  }

  .left {
    left: 10px;
  }

  .bottom {
    bottom: 10px;
  }
}

.move-handle:active:hover {
  cursor:grabbing
}

</style>