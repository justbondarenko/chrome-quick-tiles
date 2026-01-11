<script>
import { useSettingsStore } from '@/stores/settings'
import { useImageStore } from '@/stores/image'
import { chromeStorage } from '@/plugins/chromeStorage'
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
export default {
  name: 'TileElement',
  components: { Button, ButtonGroup },
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
      type: String
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
    }
  },
  data() {
    return {
      settingsStore: useSettingsStore(),
      imgStore: useImageStore(),
      active: false
    }
  },
  computed: {
    gridModeEnabled() {
      return this.settingsStore.gridModeEnabled
    },
    // Cache favicon URL to avoid reconstruction on every render
    faviconUrl() {
      if (!this.url || !this.settingsStore.tileFaviconSize) {
        return null
      }
      // Create URL only once and cache it
      const url = new URL(chromeStorage.getRuntimeURL('/_favicon/'))
      url.searchParams.set('pageUrl', this.url)
      url.searchParams.set('size', this.settingsStore.tileFaviconSize)
      return url.toString()
    }
  },
  mounted() {
    // Preload favicon for better performance
    this.preloadFavicon()
  },
  methods: {
    // Preload favicon to improve perceived performance
    preloadFavicon() {
      if (this.faviconUrl) {
        const img = new Image()
        img.src = this.faviconUrl
        img.onload = () => {
          // Favicon loaded successfully
        }
        img.onerror = () => {
          // Handle favicon loading errors gracefully
          console.warn(`Failed to load favicon for: ${this.url}`)
        }
      }
    },
    style: function () {
      const width = this.size === 's' ? 128 : 128 * 2 + Number(this.settingsStore.gridGap)
      const styles = [`border-radius: ${this.settingsStore.tileCornerRadius}px !important; width: ${width}px;`]
      styles.push(`background-color: ${this.bgColor};`)
      styles.push(`color: ${this.fontColor};`)
      return styles.join('')
    },
    textAlign() {
      return this.settingsStore.tileLabelPosition.includes('right') ? 'text-right' : 'text-left'
    },
    labelPosition: function () {
      return this.settingsStore.tileLabelPosition
    },
    controlsPosition: function () {
      return ['top right', 'top left'].includes(this.settingsStore.tileLabelPosition)
        ? 'bottom-0.5 right-0.5'
        : 'top-0.5 right-0.5'
    },
    faviconPosition() {
      return ['top right', 'top left'].includes(this.settingsStore.tileLabelPosition)
        ? 'bottom-3 left-3'
        : 'top-3 left-3'
    },
    changeSize() {
      this.$emit('setSize', this.size === 's' ? 'm' : 's')
    }
  }
}
</script>

<template>
  <a
    class="cursor-pointer tile p-1 group"
    :class="[
      size,
      {
        '!cursor-move': gridModeEnabled
      }
    ]"
    :href="url"
    :style="style()"
  >
    <img
      v-if="settingsStore.tileFaviconSize && url"
      :src="faviconUrl"
      class="favicon absolute rounded-md"
      :class="faviconPosition()"
      alt="favicon"
    />
    <div
      v-if="imgStore.items[id]"
      class="image-wrapper bg-gradient-to-t from-black to-50%"
      :style="`border-radius:${this.settingsStore.tileCornerRadius}px`"
    >
      <img class="w-full h-full" :src="imgStore.items[id]" :alt="`Tile background for ${label}`" />
    </div>
    <span
      v-if="!settingsStore.hideTileLabel"
      class="label absolute overflow-hidden whitespace-nowrap text-ellipsis truncate"
      :class="`${labelPosition()} ${textAlign()}`"
    >
      {{ label }}
    </span>
    <ButtonGroup
      v-if="gridModeEnabled"
      class="!hidden group-hover:!flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Button
        size="small"
        severity="secondary"
        :icon="`pi ${size === 's' ? 'pi-arrows-h' : 'pi-arrow-down-left-and-arrow-up-right-to-center'}`"
        :icon-class="size === 's' ? undefined : 'rotate-45'"
        @click.prevent="changeSize()"
      />
      <Button size="small" severity="secondary" icon="pi pi-pencil" @click.prevent="$emit('edit')" />
      <Button size="small" severity="danger" icon="pi pi-trash" @click.prevent="$emit('remove')" />
    </ButtonGroup>
  </a>
</template>

<style lang="scss" scoped>
$base: 128px;

.tile {
  padding: 8px;
  color: white;
  position: relative;
  border: none;
  transition:
    width 0.2s ease-in-out,
    left 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-out;
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

  .tile-controls {
    z-index: 100;
  }
}

.move-handle:active:hover {
  cursor: grabbing;
}
</style>
