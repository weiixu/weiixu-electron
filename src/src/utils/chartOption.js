// 提示框位置
const tooltipPos = function (pos, params, el, elRect, size) {
  var obj = { top: 10 };
  // console.log(pos, params, el, elRect, size)
  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
  // console.log(obj)
  return obj;
};

// Y坐标保留小数位
let yAxisToFixed = 0;
let yAxisToFixed_timeShare = 2;
const yAxisValue = {};
const setYAxisToFixed = value => {
  let fixedTo = 0
  if (value && value.toString().indexOf('.') !== -1) {
    fixedTo = value.toString().split('.')[1].length;
  }
  return fixedTo;
}
// 向下取一位整
var floorNum = num => {
  const len = setYAxisToFixed(num)
  var i;
  for (i = 0; i < len - 1; i++) {
    num = num * 10
  }
  num = Math.floor(num)
  for (i = 0; i < len - 1; i++) {
    num = num / 10
  }
  return num
}
// 向上取一位整
var ceilNum = num => {
  const len = setYAxisToFixed(num);
  var i;
  for (i = 0; i < len - 1; i++) {
    num = num * 10
  }
  num = Math.ceil(num)
  for (i = 0; i < len - 1; i++) {
    num = num / 10
  }
  return num
}

// 无数据网格配置
const chartOptionNoData = {
  grid: {
    top: 4,
    bottom: 24,
    left: 4,
    right: 4
  },
  xAxis: [{
    show: true,
    type: 'category',
    data: ['', '', '', ''],
    axisLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    },
    axisLabel: {
      show: true
    },
    axisTick: {
      show: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    scale: true,
    position: 'left',
    splitNumber: 5,
    offset: 0,
    min: -5000,
    max: 5000,
    interval: 2500,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    },
    axisLabel: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    }
  }],
  series: []
};

// 图表配置
const chartOptionPhysicals = {
  // backgroundColor: '#161922',
  grid: [{
    top: 16,
    bottom: 24,
    left: 0,
    right: 0
  }],
  tooltip: {
    show: true,
    trigger: 'axis',
    position: tooltipPos,
    backgroundColor: 'RGBA(224, 230, 233, 1)',
    extraCssText: 'box-shadow:0px 0px 4px 0px rgba(179,189,193,0.5);',
    // formatter: function (data) {
    //   console.log(data)
    // },
    textStyle: {
      fontSize: 12,
      color: '#5D7480'
    },
    axisPointer: {
      // show: false,
      snap: true,
      animation: false,
      type: 'cross',
      axis: 'x',
      label: {
        // show: false,
        margin: -16,
        padding: [3, 3, 3, 3],
        fontSize: 10,
        color: '#5D7480',
        backgroundColor: 'RGBA(224, 230, 233, 1)'
      },
      lineStyle: {
        color: '#ADCDFF',
        width: 1,
        opacity: 1
      }
    }
  },
  axisPointer: {
    snap: true,
    label: {
      precision: 2
    }
  },
  // 缩放
  dataZoom: [{
    type: 'inside',
    disabled: true
  }],
  xAxis: [{
    show: true,
    type: 'category',
    scale: true,
    boundaryGap: false,
    data: [],
    // inverval: 1,
    // boundaryGap: ['20%', '20%'],
    // splitNumber:4,
    // silent:true,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      // show: false,
      margin: 7,
      color: '#888383'
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        show: false,
        margin: 8
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#979797',
        type: 'dashed'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    scale: true,
    position: 'right',
    splitNumber: 4,
    offset: 0,
    // min: 'dataMin',
    min: function (value) {
      console.log(value)
      return floorNum(value.min)
    },
    // max: 'dataMax',
    max: function (value) {
      return ceilNum(value.max)
    },
    boundaryGap: ['5%', '5%'],
    axisLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    },
    axisLabel: {
      inside: true,
      margin: 2,
      padding: [0, 0, 14, 0],
      // formatter: function (value, index) {
      //   return value.toFixed(yAxisToFixed_timeShare)
      // },
      color: '#828282'
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        formatter: function (params) {
          return params.value ? params.value : ''
        }
      }
    },
    splitLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    }
  }],
  series: [{
    type: 'line',
    name: 'value',
    data: [],
    yAxisIndex: 0,
    showSymbol: false,
    // smooth: true, // 平滑线
    symbolSize: 0,
    connectNulls: true,
    animation: false,
    lineStyle: {
      color: '#2D7FE6',
      width: 1,
      opacity: 1
    },
    areaStyle: {
      normal: {
        origin: 'start',
        color: '#2C4B83',
        opacity: 0.03
      }
    }
  }]
}

// 分时图配置
const chartOptionMinutes = {
  // backgroundColor: '#161922',
  grid: [{
    top: 16,
    bottom: 24,
    left: 0,
    right: 0
  }, {
    top: 16,
    bottom: 24,
    left: 0,
    right: 0
  }],
  tooltip: {
    show: true,
    trigger: 'axis',
    position: tooltipPos,
    backgroundColor: 'RGBA(224, 230, 233, 1)',
    extraCssText: 'box-shadow:0px 0px 4px 0px rgba(179,189,193,0.5);',
    // formatter: function (data) {
    //   console.log(data)
    // },
    textStyle: {
      fontSize: 12,
      color: '#5D7480'
    },
    axisPointer: {
      // show: false,
      snap: true,
      animation: false,
      type: 'cross',
      axis: 'x',
      label: {
        // show: false,
        margin: -16,
        padding: [3, 3, 3, 3],
        fontSize: 10,
        color: '#5D7480',
        backgroundColor: 'RGBA(224, 230, 233, 1)'
      },
      lineStyle: {
        color: '#ADCDFF',
        width: 1,
        opacity: 1
      }
    }
  },
  axisPointer: {
    snap: true,
    label: {
      precision: 2
    }
  },
  // 缩放
  dataZoom: [{
    type: 'inside',
    disabled: true
  }],
  xAxis: [{
    show: true,
    type: 'category',
    data: [],
    // inverval: 1,
    // boundaryGap: ['20%', '20%'],
    // splitNumber:4,
    // silent:true,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      // show: false,
      margin: 7,
      color: '#888383'
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        show: false,
        margin: 8
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#979797',
        type: 'dashed'
      }
    }
  }, {
    show: true,
    type: 'category',
    data: [],
    // inverval: 1,
    // boundaryGap: ['20%', '20%'],
    // splitNumber:4,
    // silent:true,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      // show: false,
      margin: 7,
      color: '#888383'
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        show: false,
        margin: 8
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#979797',
        type: 'dashed'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    scale: true,
    position: 'left',
    splitNumber: 4,
    offset: 0,
    // min: 'dataMin',
    min: function (value) {
      // console.log(value)
      yAxisToFixed_timeShare = Math.max(setYAxisToFixed(value.min), setYAxisToFixed(value.max))
      // yAxisToFixed_timeShare = yAxisToFixed_timeShare >= 1 ? yAxisToFixed_timeShare - 1 : 0;
      return floorNum(value.min)
    },
    // max: 'dataMax',
    max: function (value) {
      return ceilNum(value.max)
    },
    boundaryGap: ['5%', '5%'],
    axisLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    },
    axisLabel: {
      inside: true,
      margin: 2,
      padding: [0, 0, 14, 0],
      formatter: function (value, index) {
        return value.toFixed(yAxisToFixed_timeShare)
      },
      color: '#828282'
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        formatter: function (params) {
          return params.value ? params.value.toFixed(yAxisToFixed_timeShare) : ''
        }
      }
    },
    splitLine: {
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    }
  }, {
    scale: true,
    position: 'right',
    offset: 0,
    splitNumber: 5,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      inside: true,
      margin: 2,
      padding: [0, 0, 14, 0],
      color: function (val) {
        if (val > 0) {
          return '#b93f3f'
        } else if (val === '0') {
          return 'white'
        } else {
          return '#45bd62'
        }
      },
      formatter: function (value, index) {
        const sign = value >= 0 ? '+' : ''
        return sign + (value * 100).toFixed(2) + '%'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisPointer: {
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      },
      label: {
        formatter: function (params) {
          return (params.value * 100).toFixed(2) + '%'
        }
      }
    }
  }],
  series: [{
    type: 'line',
    name: 'value',
    data: [],
    yAxisIndex: 0,
    showSymbol: false,
    // smooth: true, // 平滑线
    symbolSize: 0,
    connectNulls: true,
    animation: false,
    lineStyle: {
      color: '#2D7FE6',
      width: 1,
      opacity: 1
    }
  }, {
    type: 'line',
    name: 'percent',
    data: [],
    yAxisIndex: 1,
    showSymbol: false,
    symbolSize: 0,
    animation: false,
    lineStyle: {
      color: 'red',
      width: 0,
      opacity: 0
    }
  }]
}

// k线图配置
const chartOptionCandleStick = {
  // backgroundColor: '#161922',
  grid: [{
    top: 16,
    bottom: 24,
    left: 4,
    right: 4
  }],
  legend: {
    show: false,
    data: ['Day', 'MA5', 'MA10', 'MA20', 'MA30'],
    inactiveColor: '#777',
    textStyle: {
      color: '#979797'
    }
  },
  // tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //         type: 'cross'
  //     },
  //     backgroundColor: 'rgba(245, 245, 245, 0.8)',
  //     borderWidth: 1,
  //     borderColor: '#ccc',
  //     padding: 10,
  //     textStyle: {
  //         color: '#000'
  //     },
  //     position: function (pos, params, el, elRect, size) {
  //         var obj = {top: 10};
  //         obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
  //         return obj;
  //     },
  //     extraCssText: 'width: 170px'
  // },
  tooltip: {
    // show: false,
    trigger: 'axis',
    // triggerOn: 'click',
    textStyle: {
      fontSize: 12,
      color: '#5D7480'
    },
    axisPointer: {
      show: true,
      snap: false,
      animation: false,
      type: 'cross',
      label: {
        // show: false,
        precision: 2,
        // margin: -20,
        padding: [3, 3, 3, 3],
        fontSize: 10,
        backgroundColor: 'RGBA(224, 230, 233, 1)'
      },
      lineStyle: {
        color: '#ADCDFF',
        width: 1,
        opacity: 1,
        type: 'solid'
      }
    },
    backgroundColor: 'RGBA(224, 230, 233, 1)',
    position: tooltipPos,
    extraCssText: 'box-shadow:0px 0px 4px 0px rgba(179,189,193,0.5);'
  },
  axisPointer: {
    // snap: false,
    label: {
      precision: 2
    },
    link: [{
      xAxisIndex: [0, 1]
    }]
    // triggerOn: 'click'
  },
  dataZoom: [{
    type: 'inside',
    // 表示这个 dataZoom 组件控制 第一个 和 第二个 xAxis
    xAxisIndex: [0]
    // moveOnMouseMove: false
  }],
  xAxis: [{
    show: true,
    type: 'category',
    data: [],
    splitNumber: 4,
    scale: true,
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      show: false,
      color: '#888383',
      margin: 7
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      label: {
        show: false,
        margin: 4
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#282828',
        type: 'dashed'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    scale: true,
    position: 'right',
    splitNumber: 3,
    offset: 0,
    // zlevel: 2,
    // min: 'dataMin',
    min: function (value) {
      // console.log(value)
      yAxisToFixed = Math.max(setYAxisToFixed(value.min), setYAxisToFixed(value.max))
      // yAxisToFixed = yAxisToFixed >= 1 ? yAxisToFixed - 1 : 0;
      const gap = (value.max - value.min) / 20
      const min = value.min - gap
      // const min = floorNum(value.min)
      yAxisValue.min = min
      return min
    },
    // max: 'dataMax',
    max: function (value) {
      const gap = (value.max - value.min) / 20
      const max = value.max + gap
      // const max = ceilNum(value.max)
      yAxisValue.max = max
      return max
    },
    boundaryGap: ['5%', '5%'],
    axisLine: {
      show: false,
      lineStyle: {
        color: '#363448',
        type: 'dashed'
      }
    },
    axisLabel: {
      inside: true,
      margin: 2,
      padding: [0, 0, 14, 0],
      color: '#979797',
      formatter: function (value, index) {
        // console.log(yAxisValue)
        // console.log(value)
        if (value === yAxisValue.max || value === yAxisValue.min) {
          return ''
        }
        // console.log(value)
        return value.toFixed(yAxisToFixed)
      }
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      label: {
        show: false,
        margin: 0,
        padding: [3, 3, 3, 3],
        formatter: function (params) {
          return params.value ? params.value.toFixed(yAxisToFixed) : ''
        }
      },
      lineStyle: {
        color: '#ADCDFF',
        type: 'solid'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#F2F2F4',
        type: 'dashed'
      }
    }
  }],
  series: [{
    type: 'candlestick',
    name: '日K',
    data: [],
    itemStyle: {
      color: '#EB3434',
      color0: '#3AA61C',
      borderColor: '#EB3434',
      borderColor0: '#3AA61C'
    },
    markPoint: {
      label: {
        normal: {
          formatter: function (param) {
            // console.log(param)
            return param != null ? param.value : '';
          }
        }
      },
      data: [
        {
          name: 'close value',
          type: 'max',
          valueDim: 'highest',
          label: {
            position: 'insideBottom',
            padding: [3, 6],
            color: '#888383',
            offset: [0, 6]
            // backgroundColor: 'transparent',
          },
          itemStyle: {
            normal: {
              color: 'transparent'
              // color: 'rgba(128, 128, 128, 0.5)',
            }
          }
        },
        {
          name: 'close value',
          type: 'min',
          valueDim: 'lowest',
          label: {
            position: 'bottom',
            padding: [3, 6],
            color: '#888383',
            offset: [0, -6]
            // backgroundColor: 'transparent',
          },
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          }
        }
        // {
        //   name: 'average value on close',
        //   type: 'average',
        //   valueDim: 'close',
        //   itemStyle: {
        //     normal: { color: '#16ABBA' }
        //   }
        // }
      ],
      tooltip: {
        formatter: function (param) {
          return param.name + '<br>' + (param.data.coord || '');
        }
      }
    }
    // markLine: {
    //   symbol: ['none', 'none'],
    //   lineStyle: {
    //     color: 'rgba(93,116,128,.5)',
    //     type: 'solid'
    //   },
    //   data: [
    //     // [{
    //     //     name: 'from lowest',
    //     //     type: 'average',
    //     //     valueDim: 'average',
    //     //     x:0,
    //     //     y:'50%',
    //     //     label: {
    //     //       normal: { show: false },
    //     //       emphasis: { show: false }
    //     //     }
    //     //   },
    //     //   {
    //     //     type: 'average',
    //     //     x:'100%',
    //     //     y:'50%',
    //     //     valueDim: 'average',
    //     //     label: {
    //     //       normal: { show: false },
    //     //       emphasis: { show: false }
    //     //     }
    //     //   }
    //     // ],
    //     {
    //       name: 'max line',
    //       type: 'max',
    //       valueDim: 'highest',
    //       label: {
    //         position: 'start',
    //       }
    //     },
    //     // {
    //     //   name: 'min line on close',
    //     //   type: 'average',
    //     //   valueDim: 'close',
    //     //   label: {
    //     //     position: 'start'
    //     //   }
    //     // },
    //     {
    //       name: 'min line',
    //       type: 'min',
    //       valueDim: 'lowest',
    //       label: {

    //         position: 'start'
    //       }
    //     }
    //   ]
    // }
  }
  /*,
    {
      name: 'MA5',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#1dc578'
      },
      lineStyle: {
        normal: {
          color: '#1dc578',
          width: 1
        }
      },
      emphasis: {
        itemStyle: {
          opacity: 0
        }
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#fbf540'
      },
      lineStyle: {
        normal: {
          color: '#fbf540',
          width: 1
        }
      },
      emphasis: {
        itemStyle: {
          opacity: 0
        }
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#bd2cb9'
      },
      lineStyle: {
        normal: {
          color: '#bd2cb9',
          width: 1
        }
      },
      emphasis: {
        itemStyle: {
          opacity: 0
        }
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: [],
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: '#c5c5c5'
      },
      lineStyle: {
        normal: {
          color: '#c5c5c5',
          width: 1
        }
      },
      emphasis: {
        itemStyle: {
          opacity: 0
        }
      }
    }*/
  ]
}

// 地图配置
const chartOptionMap = {
  tooltip: {
    trigger: 'item',
    enterable: true,
    confine: true,
    position: 'top',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#555',
    textStyle: {
      fontSize: 12
    }
  },
  textStyle: {
    color: '#333',
    fontFamily: 'Microsoft YaHei'
  },
  geo: {
    map: 'china',
    center: [115.97, 37.71],
    zoom: '',
    silent: true,
    roam: true,
    large: true,
    scaleLimit: {
      min: 1,
      max: 5
    },
    label: {
      normal: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
        areaColor: '#fff'
      }
    }
  },
  visualMap: {
    type: 'piecewise',
    seriesIndex: [1],
    pieces: [
      { min: 1200, color: '#187DD9' },
      { min: 960, max: 1200, color: '#3997EC' },
      { min: 720, max: 960, color: '#61AAEB' },
      { min: 480, max: 720, color: '#8EC3F2' },
      { min: 240, max: 480, color: '#B8DAF8' },
      { min: 0, max: 240, color: '#D5E7F7' }
    ],
    show: false,
    hoverLink: false,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    // top: '',
    left: 10
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'geo', // 对应上面的配置
      data: [],
      large: true,
      hoverAnimation: false,
      label: {
        normal: {
          formatter: function(params) {
            // var valueType = params.data.value[2] > 0 ? 'valueUp' : 'valueDown'
            // return params.name +
            //           ' ' + '{' + valueType + '|' + '\n' + params.value[2] + '} '
            return params.name
          },
          position: 'top',
          distance: 5,
          show: true
          // rich: {
          //   valueUp: {
          //     color: '#f63e3f'
          //   },
          //   valueDown: {
          //     color: '#019D2D'
          //   }
          // }
        }
      },
      itemStyle: {
        normal: {
          color: '#000',
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    },
    {
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      roam: true,
      data: []
    }
  ]
}
export {
  chartOptionNoData,
  chartOptionMinutes,
  chartOptionCandleStick,
  chartOptionPhysicals,
  chartOptionMap
}
