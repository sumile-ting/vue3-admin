<!--  -->
<template>
  <basic-container>
   <template #top>
    <el-tabs v-model="activeName" class="sumile-container-tabs">
      <el-tab-pane label="选项一" name="first"></el-tab-pane>
      <el-tab-pane label="选项二" name="second"></el-tab-pane>
      <el-tab-pane label="选项三" name="third"></el-tab-pane>
      <el-tab-pane label="选项四" name="fourth"></el-tab-pane>
    </el-tabs>
   </template>
   <template #aside>
      <sumile-tree :data="treeData" :props="treeDefaultProps" editable></sumile-tree>
   </template>
   <template #search>
    <SearchPanel>search</SearchPanel>
   </template>
   <template #operator>
    operator
   </template>
   <template #default>
    <sumile-table :columns="columns" :requestApi="getTableData"></sumile-table>
   </template>
  </basic-container>
</template>

<script setup>
const activeName = ref('first')
const columns = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    label: '#'
  },
  {
    label: '状态',
    prop: 'status',
    width: '120'
  }
]
function getTableData () {
  return Promise.resolve({
    data: {
      data: {
        "current": 1,
        "pages": 21,
        "size": 20,
        "total": 2,
        "records": [
          {
            "company": "政更老",
            "address": "江苏省 扬州市 高邮市",
            "content": "张手适准便再积看热口老龙分。",
            "date": "2008-07-23",
            "status": 0,
            "process": 14
          },
          {
            "company": "太本米再",
            "address": "甘肃省 兰州市 城关区",
            "content": "有深新什切养级养我则打能几。",
            "date": "1996-03-01",
            "status": 2,
            "process": 33
          }
        ]

      }
    }
  })
}

const treeDefaultProps = {
  children: 'children',
  label: 'label',
}
const treeData = [
  {
    label: '一级树行内容内容内容一二三四五六七八就是',
    children: [
      {
        label: '二级树行内容内容内容一二三四五六七八就是',
        children: [
          {
            label: '三级树行内容内容内容一二三四五六七八就是',
          },
        ],
      },
    ],
  },
  {
    label: '一级树行内容内容内容',
    children: [
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
    ],
  },
  {
    label: '一级树行内容内容内容',
    children: [
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '三级树行内容内容内容',
          },
        ],
      },
      {
        label: '二级树行内容内容内容',
        children: [
          {
            label: '最后一条三级树行内容内容内容',
          },
        ],
      }
    ],
  },
]
</script>

<style scoped>

</style>
