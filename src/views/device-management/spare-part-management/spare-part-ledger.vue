<!--设备台账 -->
<template>
  <BasicContainer :show-pagination="!!tableData.length" :show-alert="showAlert" :show-operator="false">
    <template #search>
      <SearchPanel :option="searchOption" v-model:model="searchForm" @query-change="onQuery">
        <template #installPosition="slotProps">
          <el-input :placeholder="slotProps.placeholder" v-model="searchForm.installPosition"/>
        </template>
      </SearchPanel>
    </template>
    <template #default >
      <el-table :data="tableData" border stripe height="100%">
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
      <div class="sumile-table-alert mt-15px" v-if="showAlert">
        <el-tag>
          <div>
            <span class="c-gray">已选择<span style="color: var(--el-color-primary-light-3)">2</span>项</span>
            <span class="c-black-085 ml-10px">共计<span class="mx-5px">200</span>条数据</span>
          </div>
          <el-button type="primary" text>
          清空已选
          </el-button>
        </el-tag>
      </div>
      <div class="sumile-pagination" v-if="tableData.length">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next, sizes, jumper"
          :total="400"
          hide-on-single-page
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>


  </BasicContainer>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

// 引入unplugin-vue-components后底下的导入可去掉
// import SearchPanel from '@/components/search-panel/index.vue'

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

const searchForm = ref({})

// 点击查询
const onQuery = (params) => {
  console.log('query ing...', params)
}

const handleClick = (type) => {
  console.log('click', type)
}

const tableData = [
  {
    company: '公司名称',
    content: '主营化工品',
    date: '2016-05-03',
    address: '西安市雁塔区大寨路129号',
    status: 0,
    process: 78,
  },

]

const tableHeight = computed(() => {
  const otherHeight = 44 + 53 + (tableData.length ? 48 : 0)
  return `calc(100% - ${otherHeight}px)`
})

const onAdd = function () {

}

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


// 分页相关
const currentPage = ref(1)
const pageSize = ref(20)

function handleSizeChange(val) {

}

function handleCurrentChange(val) {

}

const showAlert = false

</script>

<style scoped>

</style>
