<!--设备台账 -->
<template>
  <BasicContainer>
    <template #search>
      <SearchPanel :option="searchOption" v-model:model="searchForm" @query-change="onQuery">
        <template #installPosition="slotProps">
          <el-input :placeholder="slotProps.placeholder" v-model="searchForm.installPosition" />
        </template>
      </SearchPanel>
    </template>

    <template #default>

      <sumile-table :columns="columns" :requestApi="getTableData" ref="myTable">

        <template #tableHeader="scope">
          <el-button type="primary" icon="Plus" @click="onAdd">新增</el-button>
          <el-button type="primary" icon="Upload" plain>导入</el-button>
          <el-button type="danger" icon="Delete" plain @click="onDelete(scope.selectedList)"
            :disabled="!scope.selectedList.length">删除</el-button>
        </template>
        <template #status="{ row }">
          <sumile-status-column type="primary" :color="statusColor(row.status)">{{ statusFilter(row.status)
          }}</sumile-status-column>
        </template>
        <template #process="{ row }">
          <el-progress :percentage="row.process" />
        </template>
        <template #operation="{ row }">
          <sumile-operator-list :operators="operatorList(row.status)"
            @click="(type) => handleClick(type, row)"></sumile-operator-list>
        </template>
      </sumile-table>

    </template>


  </BasicContainer>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

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

const myTable = ref()
// 表格列定义
const columns = [
  {
    type: 'selection'
  },
  {
    label: '公司',
    prop: 'company',
    width: 150
  },
  {
    label: '内容',
    prop: 'content',
    showOverflowTooltip: true
  },
  {
    label: '日期',
    prop: 'date',
    width: 150
  },
  {
    label: '地址',
    prop: 'address',
    width: 200,
    showOverflowTooltip: true
  },
  {
    label: '状态',
    prop: 'status',
    width: '120',
    slot: true
  },
  {
    label: '进度',
    prop: 'process',
    width: '150',
    slot: true
  },
  {
    label: '操作',
    prop: 'operation',
    width: '160',
    slot: true
  },
]
const { proxy } = getCurrentInstance();

// 获取表格数据
function getTableData (page) {
  const params = {
    ...page,
    ...searchForm.value
  }
  console.log('查询参数:', params)
  return proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-companies/page`, params)
}


// 点击查询
const onQuery = (params, op) => {
  if (op === 'query') {
    myTable.value.page.currentPage = 1
    myTable.value.page.pageSize = 20
  }
  myTable.value.getTableData()
}

// 删除按钮
const onDelete = function (selected) {
  if (!selected.length) {
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


// 表格操作栏按钮事件
const handleClick = (type, row) => {
  console.log('click', type)
  if (type === 'show') {
    router.push('/device-management/device-ledger/detail')
  } else if (type === 'delete') {
    onDelete([row])
  }
}


// 新增按钮
const onAdd = function () {
  router.push('/device-management/device-ledger/add')
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
function statusFilter (status) {
  const statusArr = ['未开始', '进行中', '出错']
  return statusArr[status]
}

function statusColor (status) {
  const color = ['#62A6ED', '#47D56D', '#E35A7C']
  return color[status]
}



</script>

<style scoped></style>
