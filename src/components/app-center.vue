<template>
    <div>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in this.imageList" :key="item">
          <h3 class="medium">
            <img data-v-e3426062="" :src=item class="emptyGif">
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>

</template>

<script>
    export default {
        name: "AppCenter",
      data(){
        return {
          imageList: [
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0825%252F78fc1434j00qydfd5000vc000hs00bzc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635501709&t=1bd1405eb6e8293f84b73adae01cfb4f',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2F7SJLkW5TbO%3DOTikUc2lW2Nu44jnpd8hFXidBIZmoksrXO1534801832903.jpeg&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635501950&t=0b3da68d64d7b37b4e81eab45028b84d',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg49.51tietu.net%2Fpic%2F2017-040402%2F201704040220073plelsmjkcx19221.jpg&refer=http%3A%2F%2Fimg49.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635502034&t=2604c89753887e5cb7b909624daf302c',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0831%252F98858af4p00qyolf10051c000mb00fvm.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635501889&t=57aadef73576f59ee58909a549eaf47a'
          ]

        };
      },
      methods:{

      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
