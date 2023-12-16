<script>
import { defineComponent } from 'vue';
import { useSettingsStore } from '@/stores/settings'
import ToolbarComponent from './components/ToolbarComponent.vue';
import { chromeStorage } from './plugins/chromeStorage';

export default defineComponent({
  components: {
    ToolbarComponent
  },
  data() {
    return {
      settings: useSettingsStore()
    }
  },
  beforeCreate() {
    chromeStorage.get('gridWidth').then((value) => {
      this.settings.setGridWidth(value ?? '85');
    }),
    chromeStorage.get('gridGap').then((value) => {
      this.settings.setGridGap(value ?? '4');
    }),
    chromeStorage.get('tileCornerRadius').then((value) => {
      this.settings.setTileCornerRadius(value ?? '10');
    }),
    chromeStorage.get('tileLabelPosition').then((value) => {
      this.settings.setTileLabelPosition(value ?? 'bottom right');
    })
  }
})
</script>



<template>
  <div class="app flex flex-col w-100">
    <ToolbarComponent />
    <div> 
      bla bla bla
    </div>
  </div>
</template>

<style scoped>
</style>
