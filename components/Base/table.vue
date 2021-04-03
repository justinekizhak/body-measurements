<template>
  <div
    v-if="data.length"
    name="table"
    class="my-8 overflow-auto border-t border-b border-gray-500"
  >
    <div
      v-if="head.length"
      name="head"
      class="flex py-4 font-bold border-b border-gray-500 bg-warmGray-700 hover:bg-gray-700"
    >
      <div
        v-for="(hCell, headIndex) in head"
        :key="`head=${headIndex}`"
        class="w-full text-center"
        :class="getClass(hCell)"
      >
        {{ getText(hCell) }}
      </div>
    </div>
    <div name="body" class="divide-y divide-gray-500">
      <div
        v-for="(row, rowIndex) in body"
        :key="`row-${rowIndex}`"
        class="flex py-4 hover:bg-gray-700"
      >
        <div
          v-for="(cell, cellIndex) in row"
          :key="`cell-${cellIndex}`"
          class="w-full text-center"
          :class="getClass(cell)"
        >
          {{ getText(cell) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { array, bool } from 'vue-types'
import { get, cloneDeep } from 'lodash'
import { Table, Rows, Row } from '@/core'

export default Vue.extend({
  props: {
    noHead: bool().def(false),
    data: array<Rows>().def([]),
  },
  computed: {
    head(): Rows {
      if (this.noHead) {
        return []
      }
      return get(this, 'data.0', [])
    },
    body(): Table {
      const d = cloneDeep(this.data)
      if (this.noHead) {
        return d
      }
      return d.splice(1)
    },
  },
  methods: {
    getText(data: Row): string {
      if (typeof data === 'string') {
        return data
      }
      return data?.text || '-'
    },
    getClass(data: Row): string {
      if (typeof data === 'string') {
        return ''
      }
      return data?.class || ''
    },
  },
})
</script>
