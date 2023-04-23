<!--设备台账 -->
<template>
  <BasicContainer :show-pagination="!!tableData.total">
    <template #search>
      <SearchPanel :option="searchOption" v-model:model="searchForm" @query-change="onQuery">
        <template #installPosition="slotProps">
          <el-input :placeholder="slotProps.placeholder" v-model="searchForm.installPosition"/>
        </template>
      </SearchPanel>
    </template>

    <template #operator>
      <el-button type="primary" icon="Plus" @click="onAdd">新增</el-button>
      <el-button type="primary" icon="Upload" plain>导入</el-button>
      <el-button type="danger" icon="Delete" plain @click="onDelete" :disabled="!selected.length">删除</el-button>
    </template>
    <template #default >
      <el-table :data="tableData.records" border stripe height="100%" ref="tableRef" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="company" label="公司" min-width="150" width="150"/>
        <el-table-column prop="content" label="内容" show-overflow-tooltip/>
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column prop="address" label="地址" width="200" show-overflow-tooltip/>
        <el-table-column prop="status" label="状态" width="120" >
          <template #default="{row}">
            <sumile-status-column type="primary" :color="statusColor(row.status)">{{ statusFilter(row.status) }}</sumile-status-column>
          </template>
        </el-table-column>
        <el-table-column prop="process" label="进度" width="150" >
          <template #default="{row}">
            <el-progress :percentage="row.process" />
          </template>
          
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="{row}">
            <sumile-operator-list :operators="operatorList(row.status)" @click="handleClick"></sumile-operator-list>
          </template>
        </el-table-column>
      </el-table>
      <div class="sumile-table-alert mt-15px">
        <el-tag>
          <div>
            <span class="c-gray">已选择<span style="color: var(--el-color-primary-light-3)">{{ selected.length }}</span>项</span>
            <span class="c-black-085 ml-10px">共计<span class="mx-5px">{{tableData.total}}</span>条数据</span>
          </div>
          <el-button type="primary" text @click="clearSelection()">
          清空已选
          </el-button>
        </el-tag>
      </div>
      <div class="sumile-pagination" v-if="tableData.total">
        <el-pagination
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next, sizes, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>


  </BasicContainer>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()
// 引入unplugin-vue-components后底下的导入可去掉
// import SearchPanel from '@/components/search-panel/index.vue'

// 查询面板选项
const searchOption = reactive({
  columns: [
    {
      label: '设备名称',
      prop: 'name',
      type: 'input'
    },
    {
      label: '设备编号',
      prop: 'number',
      type: 'input'
    },
    {
      label: '设备种类',
      prop: 'category',
      type: 'select',
      dictData: [
        {
          label: '动设备',
          value: 1
        },
        {
          label: '静设备',
          value: 2
        },
        {
          label: '电气设备',
          value: 3
        }
      ]
    },
    {
      label: 'ABC分类',
      prop: 'abc',
      type: 'select',
      props: {
        label: 'dictValue',
        value: 'dictKey',
      },
      dictUrl: `/api/${import.meta.env.VITE_REQUEST_PREFIX}-system/dict-biz/dictionary?code=abc_classify`,
    },
    {
      label: '安装日期',
      prop: 'date',
      type: 'datepicker',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '管理部门',
      prop: 'manageDeptId',
      type: 'tree',
      dictUrl: `/api/${import.meta.env.VITE_REQUEST_PREFIX}-system/dept/tree?tenantId=000000`,
      props: {
        nodeKey: 'id',
        props: {
          label: 'title'
        }
      }
    },
    {
      label: '安装位置',
      prop: 'installPosition',
      slot: true
    }
  ]
})

 // 查询参数
const searchForm = ref({})
// 分页数据
const page = reactive({
  currentPage: 1,
  pageSize: 20
})
// 表格数据
const tableData = ref({total: 0, records: []})
// 表格已选
const selected = ref([])
const tableRef = ref() // 表格ref
const { proxy } = getCurrentInstance();

// 获取表格数据
function getTableData () {
  const params = {
    ...page,
    ...searchForm.value
  }
  proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-companies/page`, params).then(({data}) => {
    tableData.value = data.data
  })
}

function handleSizeChange(val) {
  page.pageSize = val
  getTableData()
}

function handleCurrentChange(val) {
  page.currentPage = val
  getTableData()
}

// 初始化
getTableData()

// 点击查询
const onQuery = (params) => {
  getTableData()
}

const handleSelectionChange = function (val) {
 selected.value = val
}

const clearSelection = function(val) {
  tableRef.value.clearSelection()
}

// 表格操作栏按钮事件
const handleClick = (type) => {
  console.log('click', type)
  if(type === 'show') {
    router.push('/device-management/device-ledger/detail')
  }
}


// 新增按钮
const onAdd = function () {
  router.push('/device-management/device-ledger/add')
}

// 删除按钮
const onDelete = function () {
  if(!selected.value.length) {
    return
  }
  proxy.$sumileMsgBox({
    title: '提示',
    type: 'warning',
    subTitle: '确认删除？',
    message: '操作后将无法恢复，请谨慎操作！',
    showCancelButton: true
  })

}

// 表格操作栏按钮定义
const operatorList = function (status) {
  return [
    {
      label: '查看',
      icon: 'Reading',
      type: 'primary',
      operator: 'show'
    },
    {
      label: '编辑',
      icon: 'EditPen',
      type: 'primary',
      operator: 'edit',
      disabled: status === 2
    },
    {
      label: '删除',
      icon: 'Delete',
      type: 'danger',
      operator: 'delete'
    },
    {
      label: '打印',
      icon: 'Printer',
      type: 'primary',
      operator: 'print'
    },
    {
      label: '导出',
      icon: 'Download',
      type: 'primary',
      operator: 'export',
      show: status !== 2
    }
  ]

}
/**
 * 状态过滤器
 * @param {*} status 
 */
function statusFilter(status) {
  const statusArr = ['未开始', '进行中', '出错']
  return statusArr[status]
}

function statusColor(status) {
  const color = ['#62A6ED', '#47D56D', '#E35A7C']
  return color[status]
}



</script>

<style scoped>

</style>
