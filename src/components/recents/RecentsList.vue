<template>
  <div class="recents-wrapper">
    <ul class="flex-nowrap overflow-y-auto">
      <li class="pointer-events-none"><a>Recently closed <span class="opacity-40">(15)</span></a></li>
      <BookmarkItem v-for="item of tree" :key="item.id" :url="item.url" :title="item.title" :last-visit="timeAgo(item.lastVisitTime)" />
    </ul>
  </div>
</template>


<script>
import BookmarkItem from '../bookmarks/BookmarkItem.vue'
export default {
  name: 'RecentsList',
  components: { BookmarkItem },
  data() {
    return {
      tree: [] 
    }
  },
  methods: {
    timeAgo: function (timeStamp) {
      let now = new Date(),
        secondsPast = (now.getTime() - timeStamp) / 1000;
      if(secondsPast < 60){
        return `${parseInt(secondsPast)}s ago`;
      }
      if(secondsPast < 3600){
        return `${parseInt(secondsPast / 60)}m ago`;
      }
      if(secondsPast <= 86400){
        return `${parseInt(secondsPast / 3600)}h ago`;
      }
      if(secondsPast > 86400){
        let day = now.getDate(),
            month = now.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ",""),
            year = now.getFullYear() == timeStamp.getFullYear() ? "" :  " "+now.getFullYear();
        return `Day ${day} ${month}${year}`;
      }
    }
  },
  beforeMount() {
    // eslint-disable-next-line
    chrome.history.search({ maxResults: 15, text: "" }, (items) => {
      this.tree = items;
    });
  }
}
</script>

<style lang="scss" scoped>
::v-deep ul, li {
  max-width: 100%;
}

.recents-wrapper {
  max-height: 85vh;
}
</style>


