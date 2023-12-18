<template>
  <li>
    <details>
      <summary><FontAwesomeIcon :icon="['fas', 'folder']" /> {{ title }}</summary>
      <ul>
        <template v-for="item of items" :key="item.dateAdded">
          <template v-if="item.children">
            <BookmarkFolder :items="item.children" :title="item.title" />
          </template>
          <template v-if="item.url">
            <BookmarkItem :url="item.url" :title="item.title" />
          </template>
        </template>
      </ul>
    </details>
  </li>
</template>


<script>

import BookmarkItem from './BookmarkItem.vue'
export default {
  name: 'BookmarkFolder',
  components: { BookmarkItem },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false,
      tree: [] 
    }
  },
  methods:{
    
  },
  
}
</script>


