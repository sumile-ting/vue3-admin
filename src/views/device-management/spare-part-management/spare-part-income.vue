<!--  -->
<template>
  <sumile-page-layout :showFooter="false">
    <sumile-table :columns="columns" :requestApi="getTableData"></sumile-table>
  </sumile-page-layout>
</template>

<script setup>
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
</script>

<style scoped></style>
