<script>
import { useSettingsStore } from '@/stores/settings'

export default {
  name: 'TileElement',
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
      required: true
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
      settingsStore: useSettingsStore()
    }
  },
  methods: {
    style: function() {
      return`color: ${this.fontColor};background-color: ${this.bgColor};border-radius: ${this.settingsStore.tileCornerRadius}px !important;`
    },
    labelPosition: function () {
      return this.settingsStore.tileLabelPosition;
    }
  }
}
</script>


<template>
  <a 
    class="btn tile" 
    :class="[size]" 
    :href="url"
    :style="style()"
  >
    <span class="label" :class="[settingsStore.tileLabelPosition]">{{ label }}</span>
  </a>
</template>

<style lang="scss" scoped>
$base: 128px;

.tile {
  padding: 10px;
  color: white;
  position: relative;
  border: none;

  &.s {
    height: $base;
    width: $base;
  }

  &.m {
    height: $base;
    width: $base * 2;
  }

  > .label {
    position: absolute;
    &.top {
      top: 10px;
    }
    &.right {
      right: 20px;
    }
    &.left {
      left: 20px;
    }
    &.bottom {
      bottom: 10px;
    }
  }
}
</style>
../store/settings

<style lang="scss">

</style>