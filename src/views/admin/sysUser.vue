<template>
  <div>
    <div id="myChart1" :style="{width: '800px', height: '200px'}"></div>
    <div id="myChart2" :style="{width: '800px', height: '200px'}"></div>
    <div id="myChart3" :style="{width: '800px', height: '200px'}"></div>
  </div>
</template>

<script>
let echarts = require('echarts')
    export default {
        name: "sysUser",
        data(){
          return {
            input_width: 200,
          }
        },
      mounted(){
        this.drawLine();
      },
      methods: {
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart1 = echarts.init(document.getElementById('myChart1'));
          let myChart2 = echarts.init(document.getElementById('myChart2'));
          let myChart3 = echarts.init(document.getElementById('myChart3'));
          // 绘制图表
          const colors = ['#2f24c6', '#91CC75', '#EE6666'];

          let option1 = {
            color: colors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              right: '20%'
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['超级资金']
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                // prettier-ignore
                data: ['06-20', '06-21', '06-22', '06-23', '06-24', '06-27', '06-28', '06-29', '06-30', '07-01', '07-04']
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '净流入(万元)',
                position: 'left',
                alignTicks: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value} '
                }
              }
            ],
            series: [
              {
                name: '超级资金',
                type: 'bar',
                data: [
                  10,-20,30,40,50,10,0,10,100,-50,-30
                ],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
              },
              {
                name: '超级资金',
                type: 'line',
                yAxisIndex: 0,
                data: [ 10,-20,30,40,50,10,0,10,100,-50,-30],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
                lineStyle: {
                  color: colors[2]
                }
              }
            ]
          };

          let option2 = {
            color: colors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              right: '20%'
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['大户资金']
            },
            dataZoom: [
              {
                type: 'slider',
                xAxisIndex: [0, 1],
                realtime: false,
                start: 20,
                end: 70,
                top: 65,
                height: 20,
                handleIcon:
                  'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '100%'
              },
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 40,
                end: 70,
                top: 30,
                height: 20
              }
              ],
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                // prettier-ignore
                data: ['06-20', '06-21', '06-22', '06-23', '06-24', '06-27', '06-28', '06-29', '06-30', '07-01', '07-04']
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '净流入(万元)',
                position: 'left',
                alignTicks: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value} '
                }
              }
            ],
            series: [
              {
                name: '大户资金',
                type: 'bar',
                data: [
                  10,-20,30,40,50,10,0,10,100,-50,-30
                ],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
              },
              {
                name: '大户资金',
                type: 'line',
                yAxisIndex: 0,
                data: [ 10,-20,30,40,50,10,0,10,100,-50,-30],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
                lineStyle: {
                  color: colors[2]
                }
              }
            ]
          };

          let option3 = {
            color: colors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            grid: {
              right: '20%'
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              data: ['散户资金']
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                // prettier-ignore
                data: ['06-20', '06-21', '06-22', '06-23', '06-24', '06-27', '06-28', '06-29', '06-30', '07-01', '07-04']
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '净流入(万元)',
                position: 'left',
                alignTicks: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value} '
                }
              }
            ],
            series: [
              {
                name: '散户资金',
                type: 'bar',
                data: [
                  10,-20,30,40,50,10,0,10,100,-50,-30
                ],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
              },
              {
                name: '散户资金',
                type: 'line',
                yAxisIndex: 0,
                data: [ 10,-20,30,40,50,10,0,10,100,-50,-30],
                itemStyle:{
                  normal :{
                    color : function(params){
                      if (params.value > 0){
                        return colors[2]
                      } else{
                        return colors[1]
                      }
                    }
                  }
                },
                lineStyle: {
                  color: colors[2]
                }
              }
            ]
          };
          myChart1.setOption(option1,true);
          myChart2.setOption(option2,true);
          myChart3.setOption(option3,true);

          myChart1.group = 'group1';
          myChart2.group = 'group2';
          myChart2.group = 'group3';
          echarts.connect([myChart1,myChart2,myChart3]);
        },
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: left;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
