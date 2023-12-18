<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-col">
      <div class="flex flex-col w-100">
        <div class="label">
          <span class="label-text">URL</span>
        </div>
        <input type="text" placeholder="https://" class="input input-bordered w-full" v-model="innerUrl" />
      </div>
      <div class="flex flex-col w-100">
        <div class="label">
          <span class="label-text">Label / Page title</span>
        </div>
        <input type="text" placeholder="Page title" class="input input-bordered w-full" v-model="innerLabel"
          :disabled="!innerUrl" />
      </div>
      <div class="color-pickers flex justify-between px-1 mt-2 w-100">
        <div class="flex flex-row items-center w-1/3 h-12">
          <span class="label-text">Background color</span>
          <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha lang="En"
            v-model:pureColor="innerBgColor" />
        </div>
        <div class="flex flex-row items-center w-1/3 h-12">
          <span class="label-text">Label color</span>
          <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha lang="En"
            v-model:pureColor="innerFontColor" />
        </div>
      </div>
      <div class="flex w-100">
        <button class="btn btn-ghost mt-4 ml-0 mr-2" @click="$emit('close')">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'xmark-circle' }" /> Close
        </button>
        <button class="btn btn-success mt-4 mr-0 ml-auto" @click="save" :disabled="!(!!innerUrl && !!innerLabel)">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'floppy-disk' }" /> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemsStore } from '@/stores/items'

export default {
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
    bgColor: {
      type: String,
    },
    fontColor: {
      type: String,
    },
  },
  data() {
    return {
      itemsStore: useItemsStore(),
      innerLabel: this.label,
      innerUrl: this.url,
      innerFontColor: this.fontColor,
      innerBgColor: this.bgColor,
    };
  },
  methods: {
    save() {
      const updatedData = {};
      if (this.innerLabel !== this.label) {
        updatedData.label = this.innerLabel
      }
      if (this.innerUrl !== this.url) {
        updatedData.url = this.innerUrl
      }
      if (this.innerFontColor !== this.fontColor) {
        updatedData.fontColor = this.innerFontColor
      }
      if (this.innerBgColor !== this.bgColor) {
        updatedData.bgColor = this.innerBgColor
      }
      this.itemsStore.update(this.id, updatedData);
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.vc-color-wrap {
  margin: auto auto; 
}
</style>

