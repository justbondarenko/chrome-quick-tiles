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
              <span><FontAwesomeIcon :icon="['fas', 'triangle-exclamation']" class="mr-2 mx-2" />Images are saved locally and are not synced between devices.</span>
            </div>
            <input id="bgImageFileUpload" type="file" accept="image/*" class="file-input file-input-bordered file-input-md w-full max-w-100" @change="onFile($event.target.files[0])"/>
          </label>
          <div v-if="file" class="cropper-wrapper relative">
            <div class="cropper-btns z-10 p-3 rounded-md flex absolute bottom-3 right-3">
              <div class="join">
                <button class="join-item btn btn-sm" @click="rotate(-90)"><FontAwesomeIcon :icon="['fas', 'rotate-left']"/></button>
                <button class="join-item btn btn-sm" @click="rotate(90)"><FontAwesomeIcon :icon="['fas', 'rotate-right']"/></button>
              </div>
              <div class="divider divider-horizontal" />
              <div class="join">
                <button class="join-item btn btn-sm" @click="zoom(1.5)"><FontAwesomeIcon :icon="['fas', 'magnifying-glass-plus']"/></button>
                <button class="join-item btn btn-sm" @click="zoom(0.5)"><FontAwesomeIcon :icon="['fas', 'magnifying-glass-minus']"/></button>
              </div>
            </div>

            <Cropper
              ref="cropper"
              :src="file.src"
              class="cropper mt-2"
              :stencil-props="{
                aspectRatio: 2,
                movable: true,
                resizable: true
              }"
              @change="cropperChange"
            />
          </div>
        </template>
        <div class="color-pickers flex justify-between px-1 mt-2 w-100">
          <template v-if="!useImageBg">
          <div class="flex flex-row gap-2 items-center w-1/2 h-12">
            <span class="label-text">Background</span>
            <ColorPicker format="hex" :pure-color="{}" picker-type="fk" shape="circle" round-history disable-alpha
              lang="En" v-model:pureColor="innerBgColor" />
          </div>
          </template>
          <div class="flex flex-row gap-2 items-center w-1/2 h-12">
            <span class="label-text">Label</span>
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
import { useImageStore } from '@/stores/image'
import { chromeStorage } from '@/plugins/chromeStorage';
import { Cropper } from "vue-advanced-cropper";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: { Cropper, FontAwesomeIcon },
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
      imageStore: useImageStore(),
      innerLabel: this.label,
      innerUrl: this.url,
      innerFontColor: this.fontColor,
      innerBgColor: this.bgColor,
      useImageBg: false,
      innerBgImg64: '',
      imageBgFile: null,
      file: null,
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
        this.imageStore.set(this.id, this.innerBgImg64);
        console.log('BG Image set');
      } else {
        this.imageStore.remove(this.id);
        console.log('BG Image removed');
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
    onFile(file) {
      const blob = URL.createObjectURL(file);
      this.file = {
        src: blob,
        type: file.type,
      };
    },
    cropperChange(result) {
      this.innerBgImg64 = result.canvas.toDataURL(this.file.type)
    },
    zoom(factor) {
			this.$refs.cropper.zoom(factor);;
		},
		rotate(angle) {
			this.$refs.cropper.rotate(angle);
		},
  }
}
</script>

<style lang="scss" scoped>
.vc-color-wrap {
  margin: auto auto;
}

.cropper-wrapper {
  > .cropper-btns {
    left: 50%;
    transform: translateX(-50%);
  }
  > .cropper {
    max-height: 400px;
  }
}
</style>

