<!-- 分页组件 -->
<template>
    <div class="sumile-pagination flex justify-end" :class="{'pagination--mini': miniView}">
      <el-pagination
        :page-sizes="[10, 20, 50, 100]" 
        :layout="layout"  
        v-bind="$attrs"
        :small="miniView"
        :pager-count="miniView ? 5: 7"
        :total="props.total"
        :pageSize="props.pageSize"
        :current-page="props.miniView ? Number(currentPage) : props.currentPage" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" >
        <div v-if="props.miniView" class="inline-flex ml-31px items-center">
          <span class="flex w-22px h-22px cursor-pointer items-center justify-center" @click="goPre">
            <i inline-flex class="i-ep-arrow-left text-10px"></i>
          </span>
          <el-input class="w-48px mx-15px" size="small" v-model="currentPage"></el-input> 
          / 
          <span class="mx-15px">{{totalPages}}</span>
          <span class="flex w-22px h-22px cursor-pointer items-center justify-center" @click="goNext">
            <i inline-flex class="i-ep-arrow-right text-10px"></i>
          </span>
        </div>
      </el-pagination>
    </div>
</template>

<script setup>
const props = defineProps({
  miniView: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number
  },
  pageSize: {
    type: Number
  },
  total: {
    type: Number
  }
})

const layout = computed(() => {
  if(!props.miniView) {
    return 'prev, pager, next, sizes, jumper'
  }
  return 'prev, pager, next, slot'
})

const totalPages = ref(0)
const currentPage = ref(1)

const attrs = useAttrs()

const emit = defineEmits(['update:currentPage'])

function handleCurrentChange (val) {
  currentPage.value = val
  emit('update:currentPage', Number(val))
}

function handleSizeChange (val) {
  emit('update:pageSize', Number(val))
}

watch(currentPage, (val) => {
  handleCurrentChange(val)
})

function goPre() {
  if(currentPage.value === 1) {
    return
  }
  currentPage.value = currentPage.value - 1
}

function goNext() {
  if(currentPage.value === props.total) {
    return
  }
  currentPage.value = currentPage.value + 1
}

onMounted(() => {
  totalPages.value = Math.ceil(props.total / props.pageSize)
})

onUpdated(() => {
  totalPages.value = Math.ceil(props.total / props.pageSize)
})
</script>

<style scoped>

</style>
