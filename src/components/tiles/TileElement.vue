<script>
import { useSettingsStore } from '@/stores/settings'
import { useImageStore } from '@/stores/image';
import { chromeStorage } from '@/plugins/chromeStorage';

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
      const styles = [`border-radius: ${this.settingsStore.tileCornerRadius}px !important;`];
      styles.push(`background-color: ${this.bgColor};`)
      styles.push(`color: ${this.fontColor};`)
      
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
    changeSize() {
      this.$emit('setSize', this.size === 's' ? 'm' : 's')
    }
  }
}
</script>


<template>
  <a class="btn tile p-1 group" :class="[size]" :href="url" :style="style()">
    <div v-if="imgStore.items[id]" class="image-wrapper bg-gradient-to-t from-black to-50%" :style="`border-radius:${this.settingsStore.tileCornerRadius}px`" >
      <img class="w-full h-full" :src="imgStore.items[id]" :alt="`Tile background for ${label}`" />
    </div>
    <span class="label absolute" :class="`${labelPosition()} ${textAlign()}`">{{ label }}</span>
    <div class="controls absolute invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto group-hover:delay-300" :class="controlsPosition()">
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('edit')">
        <FontAwesomeIcon :icon="['fas', 'edit']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('remove')">
        <FontAwesomeIcon :icon="['fas', 'trash']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="changeSize()">
        <FontAwesomeIcon :icon="['fas', size === 's' ? 'chevron-right' : 'chevron-left']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110 cursor-grab move-handle" @click.prevent="">
        <FontAwesomeIcon :icon="['fas', 'up-down-left-right']" />
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
    width: $base;
  }

  &.m {
    height: $base;
    width: $base * 2;

    > .image-wrapper {
      width: $base * 2;
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