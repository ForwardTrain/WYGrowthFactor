<template>
  <section class="cloud-bed">
    <div class="cloud-box">
      <span
        v-for="(item, index) in dataList"
        :key="index"
        :style="`color: ${colorList[index]};font-size: ${item.fontSize}px`"
        @click="getDataInfo(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </section>
</template>
 
<script>
  export default {
    props: ['keyword',],
    name: "word-cloud",
    data() {
      return {
        timer: 15, // 球体转动速率
        radius: 0, // 词云球体面积大小
        dtr: Math.PI/180, //鼠标滑过球体转动速度
        active: false, // 默认加载是否开启转动
        lasta: 0, // 上下转动
        lastb: 0.5, // 左右转动
        distr: true,
        tspeed: 0, // 鼠标移动上去时球体转动
        mouseX: 0,
        mouseY: 0,
        tagAttrList: [],
        tagContent: null,
        cloudContent: null,
        sinA: '',
        cosA: '',
        sinB: '',
        cosB: '',
        sinC: '',
        cosC: '',
        dataList: [],
        // dataList: [
        //   {
        //     name: '测试1',
        //     value: '1'
        //   },
        //   {
        //     name: '测试2',
        //     value: '2'
        //   },
        //   {
        //     name: '测试3',
        //     value: '3'
        //   },
        //   {
        //     name: '测试4',
        //     value: '4'
        //   },
        //   {
        //     name: '测312试5',
        //     value: '5'
        //   },
        //   {
        //     name: '测312321试6',
        //     value: '6'
        //   },
        //   {
        //     name: '测321312试7',
        //     value: '7'
        //   },
        //   {
        //     name: '测12323123试8',
        //     value: '8'
        //   },
        //   {
        //     name: '测32312试5',
        //     value: '5'
        //   },
        //   {
        //     name: '3123123测试6',
        //     value: '6'
        //   },
        //   {
        //     name: '测32131试7',
        //     value: '7'
        //   },
        //   {
        //     name: '测试31231238',
        //     value: '8'
        //   },
        //   {
        //     name: '测试12',
        //     value: '9'
        //   },{
        //     name: '测试13',
        //     value: '10'
        //   },{
        //     name: '测试14',
        //     value: '11'
        //   },{
        //     name: '测试15',
        //     value: '12'
        //   },{
        //     name: '测试16',
        //     value: '13'
        //   },{
        //     name: '测试17',
        //     value: '14'
        //   }
        // ]
        colorList: [
          "#FF5733", // 活力橙
          "#33FF57", // 鲜艳绿
          "#3357FF", // 明亮蓝
          "#FF33A1", // 甜美粉
          "#8C33FF", // 神秘紫
          "#FFBD33", // 温暖黄
          "#33FFF6", // 清新薄荷
          "#FF3333", // 强烈红
          "#33FFF1", // 海洋蓝绿
          "#E633FF", // 柔和紫
          "#33D4FF", // 天空蓝
          "#FF8F33", // 日落橙
          "#33FF8B", // 苹果绿
          "#FF33CC", // 玫瑰红
          "#6A33FF", // 深紫
          "#FFFF33", // 阳光黄
          "#33FFCE", // 水鸭蓝
          "#FF336E", // 热情粉红
          "#339BFF", // 宝石蓝
          "#FF33E6", // 丁香紫
          
          "#FF7F50", // 珊瑚色
          "#40E0D0", // 青绿色
          "#DE3163", // 猩红色
          "#CCCCFF", // 淡紫色
          "#FFBF00", // 阳光金
          "#6495ED", // 矢车菊蓝
          "#FFF8DC", // 玉米色
          "#FF7F50", // 橙红色
          "#20B2AA", // 亮海绿色
          "#008080", // 海军蓝绿
          "#D8BFD8", // 薄荷花
          "#FF6347", // 番茄红
          "#4682B4", // 钢蓝色
          "#D2691E", // 巧克力色
          "#FFFAF0", // 象牙白
          "#DB7093", // 淡紫罗兰
          "#FFDEAD", // 纳瓦霍白
          "#FA8072", // 珊瑚玫瑰
          "#8FBC8F", // 暗草绿
          "#ADD8E6", // 浅蓝色
          "#E0FFFF", // 蓝绿色
          "#FFB6C1"  // 亮粉色
      ],
      }
    },
    created() {
      
      // this.dataList = this.keyword
      console.log(this.keyword, 222)
    },
    mounted () {
      
    },
    beforeDestroy () {
      // 
      clearInterval(this.timer)
    },
    methods:{
      showText() {
        this.keyword.forEach((item, index) => {
          console.log(item, 333)
          this.dataList.push({
            name: item.name,
            value: index,
            fontSize: item.font
          })
        })
        this.$nextTick(() => {
          this.radius = document.querySelector('.cloud-box').offsetWidth / 2.7
          this.initWordCloud()
        })
      },

      // 获取点击文本信息
      getDataInfo (item) {
        this.$emit('postWord', item)
        console.log(item, 'item')
      },
      initWordCloud () {
        this.cloudContent = document.querySelector('.cloud-box');
        this.tagContent = this.cloudContent.getElementsByTagName('span');
        for (let i = 0; i < this.tagContent.length; i++) {
          let tagObj = {};
          tagObj.offsetWidth = this.tagContent[i].offsetWidth;
          tagObj.offsetHeight = this.tagContent[i].offsetHeight;
          this.tagAttrList.push(tagObj);
        }
        this.sineCosine(0, 0, 0);
        this.positionAll();
        this.cloudContent.onmouseover = () => {
          this.active=true;
        };
        this.cloudContent.onmouseout = () => {
          this.active=false;
        };
        this.cloudContent.onmousemove = (ev) => {
          let oEvent = window.event || ev;
          this.mouseX = oEvent.clientX - (this.cloudContent.offsetLeft + this.cloudContent.offsetWidth/2);
          this.mouseY = oEvent.clientY - (this.cloudContent.offsetTop + this.cloudContent.offsetHeight/2);
          this.mouseX/= 5;
          this.mouseY/= 5;
        };
	      setInterval(this.update, this.timer);
      },
      positionAll () {
        let phi = 0;
        let theta = 0;
        let max = this.tagAttrList.length;
        let aTmp = [];
        let oFragment = document.createDocumentFragment();
        //随机排序
        for (let i=0; i < this.tagContent.length; i++) {
          aTmp.push(this.tagContent[i]);
        }
        aTmp.sort(() => {
          return Math.random() < 0.5 ? 1 : -1;
        });
        for (let i = 0; i < aTmp.length; i++) {
          oFragment.appendChild(aTmp[i]);
        }
        this.cloudContent.appendChild(oFragment);
        for(let i = 1; i < max + 1; i++){
          if (this.distr) {
            phi = Math.acos(-1 + (2 * i - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
          } else {
            phi = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
          }
          //坐标变换
          this.tagAttrList[i-1].cx = this.radius * Math.cos(theta) * Math.sin(phi);
          this.tagAttrList[i-1].cy = this.radius * Math.sin(theta) * Math.sin(phi);
          this.tagAttrList[i-1].cz = this.radius * Math.cos(phi);
          this.tagContent[i-1].style.left = this.tagAttrList[i-1].cx + this.cloudContent.offsetWidth / 2 - this.tagAttrList[i-1].offsetWidth / 2 + 'px';
          this.tagContent[i-1].style.top = this.tagAttrList[i-1].cy + this.cloudContent.offsetHeight / 2 - this.tagAttrList[i-1].offsetHeight / 2 + 'px';
        }
      },
      update () {
        let angleBasicA;
        let angleBasicB;
 
        if (this.active) {
          angleBasicA = (-Math.min(Math.max(-this.mouseY, -200 ), 200) / this.radius) * this.tspeed;
          angleBasicB = (Math.min(Math.max(-this.mouseX, -200 ), 200) / this.radius) * this.tspeed;
        } else {
          angleBasicA = this.lasta * 0.98;
          angleBasicB = this.lastb * 0.98;
        }
 
        //默认转动是后是否需要停下
        // lasta=a;
        // lastb=b;
 
        // if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
        // {
        // return;
        // }
        this.sineCosine(angleBasicA, angleBasicB, 0);
        for(let j = 0; j < this.tagAttrList.length; j++) {
          let rx1 = this.tagAttrList[j].cx;
          let ry1 = this.tagAttrList[j].cy * this.cosA + this.tagAttrList[j].cz * (-this.sinA);
          let rz1 = this.tagAttrList[j].cy * this.sinA + this.tagAttrList[j].cz * this.cosA;
 
          let rx2 = rx1 * this.cosB + rz1 * this.sinB;
          let ry2 = ry1;
          let rz2 = rx1 * (-this.sinB) + rz1 * this.cosB;
 
          let rx3 = rx2 * this.cosC + ry2 * (-this.sinC);
          let ry3 = rx2 * this.sinC + ry2 * this.cosC;
          let rz3 = rz2;
          this.tagAttrList[j].cx = rx3;
          this.tagAttrList[j].cy = ry3;
          this.tagAttrList[j].cz = rz3;
 
          let per = 350 / (350 + rz3);
 
          this.tagAttrList[j].x = rx3 * per - 2;
          this.tagAttrList[j].y = ry3 * per;
          this.tagAttrList[j].scale = per;
          this.tagAttrList[j].alpha = per;
 
          this.tagAttrList[j].alpha = (this.tagAttrList[j].alpha - 0.6) * (10/6);
        }
        this.doPosition();
        this.depthSort();
      },
      doPosition() {
        let len = this.cloudContent.offsetWidth/2;
        let height = this.cloudContent.offsetHeight/2;
        for (let i=0;i < this.tagAttrList.length;i++) {
          this.tagContent[i].style.left = this.tagAttrList[i].cx + len - this.tagAttrList[i].offsetWidth/2 + 'px';
          this.tagContent[i].style.top = this.tagAttrList[i].cy + height - this.tagAttrList[i].offsetHeight/2 + 'px';
          // this.tagContent[i].style.fontSize = Math.ceil(12 * this.tagAttrList[i].scale/2) + 16 + 'px';
          this.tagContent[i].style.filter = "alpha(opacity="+100 * this.tagAttrList[i].alpha+")";
          this.tagContent[i].style.opacity = this.tagAttrList[i].alpha;
        }
      },
      depthSort(){
        let aTmp = [];
        for (let i = 0; i < this.tagContent.length; i++) {
          aTmp.push(this.tagContent[i]);
        }
        aTmp.sort((item1, item2) => item2.cz - item1.cz);
        for (let i = 0; i < aTmp.length; i++) {
          aTmp[i].style.zIndex=i;
        }
      },
      sineCosine (a, b, c) {
        this.sinA = Math.sin(a * this.dtr);
        this.cosA = Math.cos(a * this.dtr);
        this.sinB = Math.sin(b * this.dtr);
        this.cosB = Math.cos(b * this.dtr);
        this.sinC = Math.sin(c * this.dtr);
        this.cosC = Math.cos(c * this.dtr);
      }
    }
  };
</script>
 
 
<style scoped lang="scss">
.cloud-bed {
  width: 380px;
  height: 320px;
  // border: 1px solid red;
  // overflow: hidden;
  .cloud-box{
    position:relative;
    // margin:20px auto 0px;
    width: 100%;
    height: 100%;
    background:	#00000000;
    span{
      cursor: pointer;
      white-space: nowrap;
      // border: 1px solid red;
      position: absolute;
      padding: 3px 6px;
      top: 0px;
      font-weight: bold;
      text-decoration:none;
      left:0px;
      color: #fff;
      // background-image: #fff;
      background-image: linear-gradient(to bottom, #000, #fff);
      background-clip: text;
      color: transparent;
      // font-size: 26px;
    }
  }
}
</style>
 