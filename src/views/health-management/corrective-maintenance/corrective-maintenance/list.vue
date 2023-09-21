<template>
  <basic-container>
    <div class="virtual-list">
      <el-table :data="visibleItems" height="400px">
        <!-- Define your table columns here -->
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="age" label="Age" />
        <!-- ... more columns ... -->
      </el-table>
      <div ref="sentinel" class="sentinel"></div>
    </div>
</basic-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],          // All items in the list
      visibleItems: [],   // Items currently visible in the table
      batchSize: 20,      // Number of items to render at a time
    };
  },
  mounted() {
    this.initIntersectionObserver();
    this.loadItems();
  },
  methods: {
    initIntersectionObserver() {
      this.observer = new IntersectionObserver(this.handleIntersection, {
        root: this.$el,
        rootMargin: '0px',
        threshold: 0,
      });

      this.observer.observe(this.$refs.sentinel);
    },
    handleIntersection(entries) {
      if (entries[0].isIntersecting) {
        this.loadItems();
      }
    },
    loadItems() {
      // Simulate loading data from API
      setTimeout(() => {
        const startIndex = this.visibleItems.length;
        const endIndex = startIndex + this.batchSize;
        this.visibleItems = this.visibleItems.concat(this.items.slice(startIndex, endIndex));

        // Disconnect and reconnect the observer to trigger new intersection checks
        this.observer.disconnect();
        this.observer.observe(this.$refs.sentinel);
      }, 500);
    },
  },
  created() {
    // Simulate loading initial data
    for (let i = 1; i <= 1000; i++) {
      this.items.push({ id: i, name: `Name ${i}`, age: Math.floor(Math.random() * 50) + 20 });
    }
    this.loadItems();
  },
};
</script>

<style scoped>
.virtual-list {
  position: relative;
  overflow: auto;
  height: 400px;
}

.sentinel {
  height: 1px;
  margin-top: -1px;
}
</style>
