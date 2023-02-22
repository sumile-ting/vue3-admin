<!--设备台账 -->
<template>
  <div class="sumile-basic-container">
    <SearchPanel :option="searchOption" v-model:model="searchForm" @query-change="onQuery">
      <template #installPosition="slotProps">
        <el-input :placeholder="slotProps.placeholder" v-model="searchForm.installPosition"/>
      </template>
    </SearchPanel>
    <div class="sumile-basic-container-table">
      <div class="sumile-basic-container-table-operator">
        <el-button type="primary" @click="onAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border  style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address"  />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="220">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >Detail</el-button
            >
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

import SearchPanel from '@/components/search-panel/index.vue'

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

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

const onAdd = function () {

}


</script>

<style scoped>

</style>
