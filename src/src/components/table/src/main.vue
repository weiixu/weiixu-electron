<template>
  <div class="ww-table el-table el-table--fit el-table--enable-row-transition" style="width: 100%; height: 100%;">
    <div class="el-table__header-wrapper">
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__header card-table-header">
        <colgroup>
          <col :width="item" v-for="(item, index) in colgroup" :key="index">
        </colgroup>
        <thead class="has-gutter">
          <tr class="">
            <th colspan="1" rowspan="1" class="el-table_1_column_1">
              <div class="cell">Products</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_1_column_2">
              <div class="cell">Range</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_1_column_3">
              <div class="cell">Middle</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_1_column_4">
              <div class="cell">Change</div>
            </th>
            <th colspan="1" rowspan="1" class="el-table_1_column_5">
              <div class="cell">Date</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="el-table__body-wrapper table-fixed-body">
      <el-scrollbar>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
          <colgroup>
            <col :width="item" v-for="(item, index) in colgroup" :key="index">
          </colgroup>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in data" :key="index" @click="rowClick(data[index], index)">
              <td rowspan="1" colspan="1" class="el-table_1_column_1">
                <div class="cell">
                  <el-tooltip effect="light" :content="item.name" popper-class="cell-detail" :hide-after="0" placement="top-start">
                    <span>{{item.name}}</span>
                  </el-tooltip>
                </div>
              </td>
              <td rowspan="1" colspan="1" class="el-table_1_column_2">
                <div class="cell" v-if="item.type === 'premiums'">{{upDownIdentify(item.low) + '' + absValue(item.low)}} - {{upDownIdentify(item.high) + '' + absValue(item.high)}}</div>
                <div class="cell" v-else>{{$handleValue(item.low)}} - {{$handleValue(item.high)}}</div>
              </td>
              <td rowspan="1" colspan="1" class="el-table_1_column_3">
                <div class="cell" v-if="item.type === 'premiums'">{{upDownIdentify(item.middle) + '' + absValue(item.middle)}}</div>
                <div class="cell" v-else>{{$handleValue(item.middle)}}</div>
              </td>
              <td rowspan="1" colspan="1" class="el-table_1_column_4">
                <div class="cell"><span class="color-relative" :class="upDownClass(item.change)">{{$handleValue(item.change, true)}}</span></div>
              </td>
              <td rowspan="1" colspan="1" class="el-table_1_column_5">
                <div class="cell">{{item.time}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { upDownClass } from '@/utils/util'
export default {
  name: 'WwTable',
  componentName: 'WwTable',
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      colgroup: [120, 140, 90, 80, 80]
    }
  },
  methods: {
    rowClick(item, index) {
      this.$emit('row-click', item, index)
    },
    upDownClass(value) {
      return upDownClass(value)
    },
    upDownIdentify(value) {
      let identify = '';
      if (value && Number(value) > 0) {
        // 升是B
        identify = 'b'
      } else if (value && Number(value) < 0) {
        // 贴是C
        identify = 'c'
      }
      return identify
    },
    absValue(value) {
      return this.$handleValue(Math.abs(value))
    }
  }
};

</script>
