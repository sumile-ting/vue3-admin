<!-- 封装表格组件 -->
<template>
  <div class="sumile-table-wrapper">
    <el-table border stripe height="100%" ref="tableRef" v-bind="$attrs" :data="tableData.records" :row-key="props.rowKey"
      @selection-change="selectionChange">
     
      <template v-for="(item, index) in props.columns">
        <el-table-column v-bind="item">          
            <template #default="{row}" v-if="item.slot">
              <slot :name="item.prop" v-bind="{row}" v-if="$slots[item.prop]"></slot>
              <template v-else>{{ row[item.prop] }}</template>
            </template>
            <template #header="{column}"  v-if="item.headerSlot">
              <slot :name="item.prop + 'Header'" v-bind="{column}" v-if="$slots[item.prop + 'Header']"></slot>
              <template v-else>{{ item.label }}</template>
            </template>         
        </el-table-column>

      </template>


    </el-table>
    <div class="sumile-table-alert mt-15px" v-if="props.showAlert">
      <el-tag>
        <div>
          <span class="c-gray">已选择<span style="color: var(--el-color-primary-light-3)">{{ selected.length
              }}</span>项</span>
          <span class="c-black-085 ml-10px">共计<span class="mx-5px">{{ tableData.total }}</span>条数据</span>
        </div>
        <el-button type="primary" text @click="clearSelection()">
          清空已选
        </el-button>
      </el-tag>
    </div>
    <div class="sumile-pagination" v-if="props.pagination && tableData.total">
      <el-pagination v-model:current-page="page.currentPage" v-model:page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next, sizes, jumper" :total="tableData.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>

import useSelect from './select'
import useTable from './table.js'
const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    default: 20
  },
  requestApi: {
    type: Function,
    required: true,
    default: () => { }
  },
  // 是否显示表格底部的alert
  showAlert: {
    type: Boolean,
    default: true
  },
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  // 对返回的数据进行数据处理
  dataCallBack: {
    type: Function,
    default: null
  }
})
const tableRef = ref() // 表格ref
const { selected, selectionChange, clearSelection } = useSelect(props.rowKey, tableRef)

const { tableData, getTableData, page, handleSizeChange, handleCurrentChange } = useTable(props.requestApi, props.dataCallBack, props.pagination, props.pageSize)

onMounted(() => { getTableData() })

</script>

<style scoped>
.sumile-table-wrapper {
  height: calc(100% - 5px);
  display: flex;
  flex-direction: column;
}

.sumile-table-wrapper:deep(>.el-table) {
  flex: 1;
}
</style>