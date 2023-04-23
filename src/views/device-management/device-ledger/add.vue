<!-- add -->
<template>
  <sumile-page-layout title="新增设备" :subTitles="subTitles" @cancel="handleCancel" @confirm="handleConfirm">
    <template #info1><div>基本信息1XXX</div></template>
    <template #info2><div>基本信息2XXX</div></template>
    <template #info3><div>基本信息3XXX</div></template>
  </sumile-page-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
const subTitles = [
  {
    name: 'info1',
    label: '基本信息1'
  },
  {
    name: 'info2',
    label: '基本信息2'
  },
  {
    name: 'info3',
    label: '基本信息3'
  }
]

const router = useRouter()

const handleCancel = function () {
  router.go(-1)
}

const handleConfirm = function () {
  router.go(-1)
}
</script>

<style scoped>

</style>
