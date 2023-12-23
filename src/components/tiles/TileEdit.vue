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
      <label class="label cursor-pointer mt-2">
        <span class="label-text">Use background image</span>
        <input type="checkbox" :checked="useImageBg" v-model="useImageBg" class="checkbox" />
      </label>
        <template v-if="useImageBg">
          <label class="form-control w-full max-w-100">
            <div class="label">
              <span class="label-text">Image with dimensions W:{{ size === 's' ? '128' : '256' }}px H:128px (up to 250kb)</span>
            </div>
            <input id="bgImageFileUpload" type="file" accept="image/*" class="file-input file-input-bordered file-input-md w-full max-w-100" @change="onFilesChange($event.target.files[0])"/>
          </label>
        </template>
        <div class="color-pickers flex justify-between px-1 mt-2 w-100">
          <template v-if="!useImageBg">
          <div class="flex flex-row items-center w-1/3 h-12">
            <span class="label-text">Background color</span>
            <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
              lang="En" v-model:pureColor="innerBgColor" />
          </div>
          </template>
          <div class="flex flex-row items-center w-1/3 h-12">
            <span class="label-text">Label color</span>
            <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
              lang="En" v-model:pureColor="innerFontColor" />
          </div>
        </div>
      <div class="flex w-100">
        <button class="btn btn-ghost mt-4 ml-0 mr-2" @click="$emit('close')">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'xmark-circle' }" /> Close
        </button>
        <button class="btn btn-success mt-4 mr-0 ml-auto" @click="save" :disabled="!(!!innerUrl)">
          <FontAwesomeIcon :icon="{ prefix: 'fas', iconName: 'floppy-disk' }" /> Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useItemsStore } from '@/stores/items'
import { chromeStorage } from '@/plugins/chromeStorage';

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
    size: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      itemsStore: useItemsStore(),
      innerLabel: this.label,
      innerUrl: this.url,
      innerFontColor: this.fontColor,
      innerBgColor: this.bgColor,
      useImageBg: false,
      innerBgImg64: '',
      imageBgFile: null
    };
  },
  mounted() {
    chromeStorage.getLocal(this.id).then((img) => this.useImageBg = !!img);
  },
  methods: {
    save() {
      this.itemsStore.update(this.id, {
        label: this.innerLabel,
        url: this.innerUrl,
        fontColor: this.innerFontColor,
        bgColor: this.innerBgColor,
      })

      if (this.useImageBg) {
        chromeStorage.setLocal(this.id, this.innerBgImg64)
          .then(() => console.log('BG Image set'));
      } else {
        chromeStorage.removeLocal(this.id)
          .then(() => console.log('BG Image removed'));
      }
      this.$emit('close');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    },
    imageUrlToBase64: async function (url) {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = reject;
      });
    },
    getBase64: function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      })
    },
    onFilesChange: async function (f) {
      if (f.size > 250000) {
        alert('Maximum file size up to 250kb')
        return 
      }
      await this.getBase64(f).then((base64) => {
        this.innerBgImg64 = base64;
        this.innerBgColor = null;
        navigator.clipboard.writeText(base64);
      });
    },
  }
}
</script>

<style lang="scss">
.vc-color-wrap {
  margin: auto auto;
}
</style>

