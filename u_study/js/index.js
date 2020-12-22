
var vm = new Vue({
    el: '#app',
    data: {
        header_data: ['首页', '精品课程', '在线直播', 'IT培训', 'IT培训机构', 'IT问答库'],
        footer_data: ['关于我们', '联系我们', '加入我们', '品牌荣誉', '版权声明', '网站地图', '支付方式'],
        footer_copyright: "Copyright@1999-2020北京中公教育科技有限公司.All Rights Reserved 京ICP备10218183号京ICP证161188号版权@1999-2020北京中公教育科技有限公司.All Right京icp备10218183号京icp证161188号",
        img_arr: [
            './img/logo_it.jpg',
            './img/etk_09.jpg',
            './img/shopbar.jpg',
            './img/ujyx_14.jpg'],
        reg_r_p: ['用户专享服务:', '极致的视频学习体验', '丰富的直播课程免费学', '开课提示，不错过每一次精彩', '讲、学、练、考，多种高效学习方式快速提升成绩'],
        banner_descript: ['./img/study-1.jpg', './img/study-2.jpg', './img/study-3.jpg', './img/study-4.jpg'],
        "platform_descript":[
            {
                "title":"支持苹果、安卓所有设备",
                "content":"支持苹果、安卓所有设备支持苹果、安卓所有设备",
                "img":"./img/ujyx_08.jpg"
            },
            {
                "title":"APP支持离线，随时学",
                "content":"优学在线课程均可同到移动端，支持苹果和安卓主流设备",
                "img":"./img/ujyx_10.jpg"
            },
            {
                "title":"直播、录播多种学习方式",
                "content":"既有直播互动课程，也有录播视频，适配不同需求",
                "img":"./img/ujyx_09.jpg"
            }
        ],
        banner_img: [, , , , , ,],
        nav: [],
        hot_live: [{}],
        "boutique_title": [],
        "boutique_content1": [[{}]],
        "boutique_content2": [[{}]],
        "boutique_content3": [[{}]],
        "firend_link":[
            {
                "name":"IT培训",
                "link":["IT培训"]
            },
            {
                "name":"友情链接",
                "link":["友情链接"]
            }
        ],
        current_flag: 0,
        banners: null,
        circles: null,
        intervalid: null,
        current_live: 0,
        current_boutique1:0,
        current_boutique2:0,
        current_boutique3:0,
        current_link_title:0,
    },
    created() {
        this.getIndexAjax();
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.banners = document.querySelectorAll('.banner-img>li');
            this.banners[this.current_flag].style.opacity = '1';
            this.circles = document.querySelectorAll('.circle>li');
            this.circles[this.current_flag].style.background = '#ff0000';
            this.setTimer(this, 'init');
        },
        getIndexAjax(){
            var ajax = new XMLHttpRequest();
            ajax.open('get', './data/index.json', true);
            ajax.send();
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4) {
                    var json = JSON.parse(ajax.responseText)
                    this.banner_img = json.banner_img;
                    this.nav = json.nav;
                    this.hot_live = json.hot_live;
                    this.boutique_title=json.boutique_title;
                    this.boutique_content1=json.boutique_content1;
                    this.boutique_content2=json.boutique_content2;
                    this.boutique_content3=json.boutique_content3;
                    this.firend_link=json.firend_link;
                }
            }
        },
        nextBanner(n) {
            if (n == 1) {
                //向前
                if (this.current_flag <= 0) this.current_flag = this.banner_img.length - 1;
                else
                    this.current_flag--;
            }
            else if (n == 2) {
                //向后
                if (this.current_flag >= 5) this.current_flag = 0;
                else this.current_flag++;
            }
            this.$options.methods.changeBanner(this);
        },
        changeBanner(that, i) {
            // 处理click切换图片
            if (that == 0) {
                that = this;
                that.current_flag = i
            }
            for (var i = 0; i < that.banner_img.length; i++) {
                that.banners[i].style.opacity = '0';
                that.circles[i].style.background = '#fff';
            }
            // bufferMove(that.banners[that.current_flag], { opacity: 1 }, function () { });
            that.banners[that.current_flag].style.opacity = '1';

            that.circles[that.current_flag].style.background = '#ff0000';
        },
        clearTimer() {
            clearInterval(this.intervalid);
        },
        setTimer(that, n) {
            if (n != 'init') that = this;
            that.intervalid = setInterval(() => {
                if (that.current_flag < that.banner_img.length - 1)
                    that.current_flag++;
                else that.current_flag = 0;
                that.$options.methods.changeBanner(that);
            }, 1000);
        },
        changeLive(i) {
            this.current_live = i;
        },
        changeBoutique(i,index) {
            console.log(i,index);
            if(index==0)
            this.current_boutique1= i;
            if(index==1)
            this.current_boutique2= i;
            if(index==2)
            this.current_boutique3= i;
        },
        changeLink(i){
            this.current_link_title=i
            var link_title_lis=document.querySelectorAll('.firend-link .title li');
            for(var j=0; j<link_title_lis.length;j++){
                // link_title_as[j].style.color='#000';
                link_title_lis[j].className='';
            }
            link_title_lis[i].className='active';
        }
    }
})



// 全链路UI/UE交互设计软件基础平面设计网页设计移动UI设计
// 全链路UI/UE交互设计软件基础平面设计网页设计移动UI设计

// 程序开发
// 程序开发

// 软件测试Linux云计算大数据开发Unity游戏开发+VR/AR PHP
// 软件测试linux云计算大数据开发统一游戏开发+VR/AR PHP -->