<template>
  <div
    v-if="data.length"
    name="table"
    class="my-8 overflow-auto border-t border-b border-gray-500"
  >
    <div class="grid divide-y divide-gray-500">
      <div
        v-for="(row, rowIndex) in data"
        :key="`row-${rowIndex}`"
        class="flex hover:bg-gray-700"
        :class="{
          'bg-warmGray-700': !noHead && rowIndex === 0,
        }"
      >
        <div
          v-for="(cell, cellIndex) in row"
          :key="`cell-${cellIndex}`"
          class="w-48 py-4 text-center lg:w-full"
          :class="getClass(cell)"
          @click="handleClick(cell, rowIndex, cellIndex)"
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
import { Rows, Cell } from '@/core'

export default Vue.extend({
  props: {
    noHead: bool().def(false),
    data: array<Rows>().def([]),
  },
  methods: {
    getText(data: Cell): string {
      if (typeof data === 'string') {
        return data
      }
      return data?.text || '-'
    },
    getClass(data: Cell): string {
      if (typeof data === 'string') {
        return ''
      }
      return data?.class || ''
    },
    handleClick(cell: Cell, rowIndex: number, columnIndex: number) {
      this.$emit('click', {
        cell,
        rowIndex,
        columnIndex,
      })
    },
  },
})
</script>
