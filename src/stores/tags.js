import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { setStore, getStore } from '@/util/store'

export const useTagsStore = defineStore('tags', () => {
  let tags = reactive(getStore({ name: 'tag_list' }) || [])

  const diff = function (tag1, tag2) {
    return tag1.value === tag2.value
  }

  /**
   * 设置TagList
   * @param {*} tags
   */
  function setTags (tagList) {
    tags = tagList
    setStore({ name: 'tag_list', content: tags })
  }

  /**
   * 添加Tag
   * @param {*} tag
   */
  function addTag (tag) {
    const tagInList = tags.find((ele) => diff(ele, tag))
    const order = Math.max(...tags.map((item) => item.meta.order || 0), 0) + 1
    if (tagInList) {
      tagInList.meta.order = order
    } else {
      tag.meta.order = order
      tags.push(tag)
    }
    setTags(tags)
  }

  return { tags, setTags, addTag }
})
