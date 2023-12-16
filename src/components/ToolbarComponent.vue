<template>
  <div class="flex gap-4">
    <SettingsSidebar />
  </div>
</template>

<script>
import SettingsSidebar from './settings/SettingsSidebar.vue';
export default {
  components: {
    SettingsSidebar
  },

  setup() {
    
  },
}
</script>

<style lang="scss"> 
.toolbar {
  border: 1px solid red;
}
</style>