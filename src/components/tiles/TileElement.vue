<script>
import { useSettingsStore } from '@/stores/settings'
export default {
  name: 'TileElement',
  components: {
    
  },
  props: {
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
      active: false
    }
  },
  methods: {
    style: function () {
      return `color: ${this.fontColor};background-color: ${this.bgColor};border-radius: ${this.settingsStore.tileCornerRadius}px !important;`
    },
    labelPosition: function () {
      return this.settingsStore.tileLabelPosition;
    },
    controlsPosition: function () {
      return this.settingsStore.tileLabelPosition === 'top right' ? 'bottom right' : 'top right';
    },
    changeSize() {
      this.$emit('setSize', this.size === 's' ? 'm' : 's')
    }
  }
}
</script>


<template>
  <a class="btn tile p-1 group" :class="[size]" :href="url" :style="style()">
    <span class="label absolute" :class="labelPosition()">{{ label }}</span>
    <div class="controls absolute hidden group-hover:inline-flex" :class="controlsPosition()">
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('edit')">
        <FontAwesomeIcon :icon="['fas', 'edit']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="$emit('remove')">
        <FontAwesomeIcon :icon="['fas', 'trash']" />
      </button>
      <button class="btn btn-ghost btn-square btn-xs hover:scale-110" @click.prevent="changeSize()">
        <FontAwesomeIcon :icon="['fas', size === 's' ? 'chevron-right' : 'chevron-left']" />
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

  &.s {
    height: $base;
    width: $base;
  }

  &.m {
    height: $base;
    width: $base * 2;
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
</style>
../store/settings

<style lang="scss"></style>