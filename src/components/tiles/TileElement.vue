<script>
import { useSettingsStore } from '@/stores/settings'
import { useImageStore } from '@/stores/image';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  name: 'TileElement',
  components: {
    Swiper, SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination ],
    };
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
    rssFeed: {
      type: String,
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
      rssItems: null,
      activeSlideIndex: 0
    }
  },
  async mounted() {
    if (this.rssFeed) { await this.getRssItems(); }
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
    },
    async getRssItems() {
      axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.rssFeed)}`)
        .then(response => {
          if (response.data.status === 'ok') {
            this.rssItems = response.data.items.map((item) => {
              if (item.title.length > 100) {
                item.title = item.title.slice(0,100) + "..."
              }
              return item
            });
          } else {
            console.error('Error fetching RSS feed:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
        });
    },
    onIndexChange(value) {
      this.activeSlideIndex = value.activeIndex;
    },
    getUrl() {
      if (this.rssFeed && this.rssItems) { return this.rssItems[this.activeSlideIndex].link };
      return this.url
    }
  }
}
</script>


<template>
  <a class="btn tile p-1 group" :class="[size]" :href="getUrl()" :style="style()">
    <div class="favicon-wrapper z-[1] flex flex-row flex-nowrap w-fit gap-2 absolute items-center" :class="faviconPosition()">
      <img v-if="settingsStore.tileFaviconSize && url" :src="favicon(settingsStore.tileFaviconSize)"
      class="favicon rounded-md"  alt="favicon" />
      <FontAwesomeIcon v-if="rssFeed && rssItems" :icon="{ prefix: 'fas', iconName: 'rss' }" />
    </div>
    <div v-if="imgStore.items[id]" class="image-wrapper bg-gradient-to-t from-black to-50%"
      :style="`border-radius:${this.settingsStore.tileCornerRadius}px`">
      <img class="w-full h-full" :src="imgStore.items[id]" :alt="`Tile background for ${label}`" />
    </div>
    <template v-if="rssItems">
      <Swiper 
        class="h-full w-full"
        :spaceBetween="30"
        :autoplay="{
          delay: Math.floor(Math.random() * (7001 - 4000)) + 4000,
          disableOnInteraction: true
        }"
        :direction="'vertical'"
        :loop="true"
        :modules="modules"
        @activeIndexChange="onIndexChange"
      >
        <SwiperSlide v-for="item, index of rssItems" :virtual-index="index" :key="index">
          <div class="slide-content flex h-full w-full items-end">
            <span class="w-full max-h-60% min-h-fit mt-auto mb-0 p-1 text-right leading-5 overflow-hidden text-ellipsis" v-text="item.title" />
          </div>
        </SwiperSlide>
      </Swiper>
    </template>
    <template v-else>
      <span v-if="!settingsStore.hideTileLabel" class="label absolute overflow-hidden whitespace-nowrap"
        :class="`${labelPosition()} ${textAlign()}`">{{ label }}</span>
    </template>
    <div class="controls z-[2] hover:bg-slate-100 hover:text-slate-800 p-1 rounded-lg absolute invisible pointer-events-none"
      :class="controlsPosition()">
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

    >.controls {
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

  >.image-wrapper {
    position: absolute;
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    overflow: hidden;

    >img {
      object-fit: cover;
      object-position: center;
      min-width: 100%;
      min-height: 100%;
    }
  }

  &.s {
    height: $base;

    >.label {
      max-width: 100px;
      width: fit-content;
    }
  }

  &.m {
    height: $base;

    >.label {
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
  cursor: grabbing
}
</style>