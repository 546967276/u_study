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
        reg_name: ['手机号', '创建密码', '确认密码', '邮箱', '验证码'],
        reg_r_p: ['用户专享服务:', '极致的视频学习体验', '丰富的直播课程免费学', '开课提示，不错过每一次精彩', '讲、学、练、考，多种高效学习方式快速提升成绩'],
        reg_msg: [],
        privious_pwd: '',
        test_code: '4256',
        test_flag:[false, false, false, false, false],
        userData:{
            tel:"",
            password:"",
            email:""
        }
    },
    mounted(){
        var ele=document.querySelector('.register .test-code');
        this.changeTestCode(ele);
    },
    methods: {
        changeTestCode(ele) {
            this.test_code = Math.floor((9999 - 1000 + 1) * Math.random() + 1000);
        },
        testReg(event, n) {
            var ele = event.srcElement;
            var spans = document.querySelectorAll('.register .left span');
            var msg = '';
            var reg_tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[6])\d{8}$/;
            var reg_password = /^[a-zA-Z]\w{5,7}$/;
            var reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var value = ele.value;
            this.test_flag[n] = false;

            switch (n) {
                case 0: {
                    //账号
                    msg = '手机号码不符合规则';
                    if (reg_tel.test(value)) {
                        this.test_flag[n] = true;
                        this.userData.tel=value;
                        msg = '手机号码可以使用';
                        
                    }
                } break;
                case 1: {
                    // 密码
                    msg = '密码不符合规则';
                    if (reg_password.test(value)) {
                        this.privious_pwd = value;
                        this.test_flag[n] = true;
                        msg = '密码可以使用';
                    }
                } break;
                case 2: {
                    //两次密码不一致
                    msg = '密码不符合规则';
                    if (value != this.privious_pwd && value!="") {
                        console.log(value, this.privious_pwd);
                        msg = '两次密码输入不一致';
                    }
                    else if (reg_password.test(value)) {
                        this.test_flag[n] = true;
                        this.userData.password=value;
                        msg = '确认成功';
                    }


                } break;
                case 3: {
                    //邮箱
                    msg = '邮箱不符合规则';
                    if (reg_email.test(value)) {
                        this.test_flag[n] = true;
                        this.userData.email=value;
                        msg = '邮箱可以使用';
                    }
                } break;
                case 4: {
                    //验证码
                    msg = '验证码格式不正确';
                    if (this.test_code == value) {
                        this.test_flag[n] = true;
                        msg = '验证码正确';
                    }
                } break;
            }

            if (this.test_flag[n] == true) spans[n].style.color = 'green';
            else spans[n].style.color = 'red';
            spans[n].innerHTML = '<i>* </i>' + msg;
            spans[n].style.display = 'inline-block';
        },
        submitData(){
            var flag=true;
            for(var i=0;i<this.test_flag.length;i++){
                if(this.test_flag[i]==false){
                    flag=false;
                    break;
                }
            }
            if(flag!=false){
                //成功  提交
                var translate=false;
                var arr=
                JSON.parse(localStorage.getItem("userData"));
                //检查重复
                for(n in arr){
                    if(arr[n].tel==this.userData.tel){
                        translate=true;
                        break;
                    }
                }
                if(translate==false){
                    //如果不重复
                    if(arr==null) arr=[];
                    arr.push(this.userData);
                    localStorage.setItem("userData",JSON.stringify(arr));
                    console.log("localStorage添加成功");
                    console.log(localStorage);
                    alert('账号注册成功');
                }else{
                    console.log("localStorage已存在");
                    alert('账号已被注册');
                }
            }
        }
    }
})