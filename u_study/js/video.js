var vm = new Vue({
    el: '#app',
    data: {
        page: 1,
        header_data: ['首页', '精品课程', '在线直播', 'IT培训', 'IT培训机构', 'IT问答库'],
        footer_data: ['关于我们', '联系我们', '加入我们', '品牌荣誉', '版权声明', '网站地图', '支付方式'],
        footer_copyright: "Copyright@1999-2020北京中公教育科技有限公司.All Rights Reserved 京ICP备10218183号京ICP证161188号版权@1999-2020北京中公教育科技有限公司.All Right京icp备10218183号京icp证161188号",
        img_arr: [
            './img/logo_it.jpg',
            './img/etk_09.jpg',
            './img/shopbar.jpg',
            './img/ujyx_14.jpg'],
        reg_r_p: ['用户专享服务:', '极致的视频学习体验', '丰富的直播课程免费学', '开课提示，不错过每一次精彩', '讲、学、练、考，多种高效学习方式快速提升成绩'],
        ctrl: [{}],
        video_list: [{}],
        class_arr: [{}],
        current_vedio: 0,
        "ctrl": [
            {
                "img": "zg_shipincz03.png",
                "ctrl_name": "线路1"
            }
        ],
        "discuss": [
            {
                "user_img": "./img/t.png",
                "user_name": "刘德华1",
                "send_time": "2019-08-28 09:12",
                "content": "针对于此事物的主管或客观的自我印象阐述",
                "fav_num": "9"
            }],
        play_flag: false,
        player: null,
        v_time: null,
        v_line: null,
        v_spot: null,
        video_ctrl: null,
        time: {
            m: 0,
            s: 0
        },
        time1: {
            m: 0,
            s: 0
        },
        intervalid: null,
        disx:0,
        video:null,

    },
    created() {
        this.getJson();
    },
    methods: {
        getJson() {
            this.$http.get('./data/video.json').then(
                result => {
                    var ret = result.body;
                    this.ctrl = ret.ctrl;
                    this.discuss = ret.discuss;
                    this.video_list = ret.video_list;
                    this.class_arr = ret.class_arr;
                }
            )
        },
        changeVideo(i) {
            this.current_vedio = i;
            var video = document.querySelector('video');
        },
        changePage(n) {
            var text = document.getElementById('text');
            var change = document.getElementById('change');
            var next = document.getElementById('next');
            var previous = document.getElementById('previous');
            var max = Math.ceil(this.discuss.length / 4);
            var text_vlue = text.value;
            if (n == 1) {
                text_vlue = --text.value;
            }
            else if (n == 2) {
                text_vlue = ++text.value;
            }
            if (text_vlue >= max) {
                text_vlue = max;
                text.value = max;
                previous.className = '';
                next.className = 'nopage';
            }
            else if (text_vlue <= 1) {
                text_vlue = 1;
                text.value = 1;
                previous.className = 'nopage';
                next.className = '';
            } else {
                previous.className = '';
                next.className = '';
            }
            this.page = text_vlue;
        },
        play(ev) {
            var ele = ev.target;
            if (ele.innerHTML == '播放') {
                (this.player).play();
                ele.innerHTML = '暂停';
                this.play_flag = true;
                this.inntervalid = setInterval(() => {
                    this.time1.m = String(Math.floor(this.player.currentTime / 60)).padStart(2, '0');
                    this.time1.s = String(Math.floor(this.player.currentTime) % 60).padStart(2, '0');
                    this.v_time.innerHTML = this.time1.m + ':' + this.time1.s + '/' + this.time.m + ':' + this.time.s;

                    //更新进度条
                    var progress = parseInt(this.player.currentTime / this.player.duration * 750);
                
                    this.v_spot.style.left = progress + 'px';

                }, 500);
            }
            else {
                (this.player).pause();
                ele.innerHTML = '播放';
                this.play_flag = false;
                clearInterval(this.inntervalid);
            }
        },
        drag(ev) {
            ev.preventDefault();
            var x= ev.pageX-41-10-video.offsetLeft-this.disx;
            if(x>745) x=745;  //line宽度-5
            else if(x<0) x=0;  
            this.v_spot.style.left = x+ 'px';
            this.player.currentTime=
            parseInt(x/750*this.player.duration);
        },
        canplay() {
            //重置 必须执行
            var play = document.querySelector('#video .play');
            if(this.play_flag==true){
                this.play.innerHTML = '暂停';
                this.player.play()
            }else{
                this.play.innerHTML = '播放';
            }

            //赋值
            this.video_ctrl = document.querySelector('#video-ctrl');
            this.player = document.querySelector('#video video');
            this.v_time = document.querySelector('#video .time');
            this.v_line = document.querySelector('#video .line');
            this.v_spot = document.querySelector('#video .spot');
            this.video = document.querySelector('#video');
            this.v_line.addEventListener('click', (ev) => {
                // this.disx=0;
                this.drag(ev);
            });

            this.v_spot.addEventListener('mousedown', (ev) => {
                ev.preventDefault();
                // this.disx=ev.offsetX;
                this.disx=ev.pageX-this.v_spot.offsetLeft-51-video.offsetLeft;
                this.video_ctrl.addEventListener('mousemove', this.drag);
            });

            document.addEventListener('mouseup', (ev) => {
                ev.preventDefault();
                this.video_ctrl.removeEventListener('mousemove', this.drag);
            });

            this.time.m = String(Math.floor(this.player.duration / 60)).padStart(2, '0');
            this.time.s = String(Math.floor(this.player.duration % 60)).padStart(2, '0');
            this.time1.m = String(Math.floor(this.player.currentTime / 60)).padStart(2, '0');
            this.time1.s = String(Math.floor(this.player.currentTime) % 60).padStart(2, '0');
            this.v_time.innerHTML = this.time1.m + ':' + this.time1.s + '/' + this.time.m + ':' + this.time.s;
        }
    }
})