import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useTagsStore = defineStore('tags', () => {
  const tags = reactive({
    arr: ref(useStorage('system-tag_list', []))
  })

  const diff = function (tag1, tag2) {
    return tag1.value === tag2.value
  }

  /**
   * 设置TagList
   * @param {*} tags
   */
  function setTags (tagList) {
    tags.arr = tagList
  }

  /**
   * 添加Tag
   * @param {*} tag
   */
  function addTag (tag) {
    const tagInList = tags.arr.find((ele) => diff(ele, tag))
    const order = Math.max(...tags.arr.map((item) => item.meta.order || 0), 0) + 1
    if (tagInList) {
      tagInList.meta.order = order
    } else {
      tag.meta.order = order
      tags.arr.push(tag)
    }
    setTags(tags.arr)
  }

  return { tags, setTags, addTag }
})
