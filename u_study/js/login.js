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
            './img/ujyx_14.jpg'
        ],
        reg_r_p: ['用户专享服务:', '极致的视频学习体验', '丰富的直播课程免费学', '开课提示，不错过每一次精彩', '讲、学、练、考，多种高效学习方式快速提升成绩'],
        login_img_arr: [
            {
                src_1: 'dsf_03.jpg',
                src_2: 'dsh_h_03.jpg',
                href: 'www.qq.com/',
            },
            {
                src_1: 'dsf_05.jpg',
                src_2: 'dsh_h_05.jpg',
                href: 'www.sina.com.cn/',
            },
            {
                src_1: 'dsf_07.jpg',
                src_2: 'dsh_h_07.jpg',
                href: 'weixin.qq.com/'
            },
        ],
        temp: null,

    },
    methods: {
        checkImg(n) {
            var temp = n.src_1;
            n.src_1 = n.src_2;
            n.src_2 = temp;
        },
        login() {
            var tel = document.querySelector('#tel').value;
            var password = document.querySelector('#password').value;
            var arr = JSON.parse(localStorage.getItem('userData'));
            // var translate=false;
            var flag=0;
            
            for (n in arr) {
     
                if (arr[n].tel == tel) {
                    if (arr[n].password == password) {
                        flag=1;
                    } else {
                        flag=2;
                    }
                    break;
                }
                else {
                    flag=3;
                }
            }
            switch(flag){
                case 0:alert('手机号不存在');break;
                case 1:alert('登录成功');break;
                case 2:alert('密码错误');break;
                case 3:alert('手机号错误');break;
            }

        }
    }})