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
        name="row"
        class="flex"
        :class="getRowStyle(rowIndex)"
        @click="handleRowClick(row, rowIndex)"
      >
        <div
          v-for="(cell, cellIndex) in row"
          :key="`cell-${cellIndex}`"
          name="cell"
          class="w-48 lg:min-w-[16rem] py-4 text-center lg:w-full"
          :class="getClass(cell, rowIndex, cellIndex)"
          @click="handleCellClick(cell, rowIndex, cellIndex)"
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
import { Row, Cell } from '@/core'
import { get } from 'lodash'

export default Vue.extend({
  props: {
    noHead: bool().def(false),
    data: array<Row>().def([]),
    cellClickable: bool().def(false),
    rowClickable: bool().def(false),
    headClickable: bool().def(false),
  },
  methods: {
    getText(data: Cell): string {
      if (typeof data === 'string') {
        return data
      }
      return data?.text || '-'
    },
    getClass(
      data: Cell,
      rowIndex: number = -1
      // columnIndex: number = null
    ): object {
      const customStyle = get(data, 'class', '')
      const isHead = !this.noHead && rowIndex === 0
      return {
        [customStyle]: true,
        'cursor-pointer hover:bg-blue-900':
          (isHead && this.headClickable) || this.cellClickable,
      }
    },
    getRowStyle(rowIndex: number) {
      const isHead = !this.noHead && rowIndex === 0
      return {
        'bg-warmGray-700': isHead,
        'hover:bg-gray-700':
          (!this.cellClickable && !this.headClickable) ||
          (!this.cellClickable && !isHead),
        'cursor-pointer hover:bg-blue-900': this.rowClickable,
      }
    },
    handleCellClick(cell: Cell, rowIndex: number, columnIndex: number) {
      if (!this.cellClickable) {
        return
      }
      this.$emit('cell-click', {
        cell,
        rowIndex,
        columnIndex,
      })
    },
    handleRowClick(row: Row, rowIndex: number) {
      if (!this.rowClickable) {
        return
      }
      this.$emit('row-click', {
        row,
        rowIndex,
      })
    },
  },
})
</script>
