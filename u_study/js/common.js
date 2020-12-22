/* Create By LX  in  Beijing  at  Nov 2020 */
//这是一个用来获取元素样式的方法
function getStyle (ele,style){
    //var ele; var style;

    //2.写入主要代码  获取div的宽度
    //currentStyle  在标准浏览器中 值为undefined   而在ie8及以下浏览器中  值为对象
    //判断 如果当前currentStyle值为undefined  证明我们在标准浏览器中
    if(ele.currentStyle==undefined){
        //在标准浏览器中  应该使用  getComputedStyle获取非行内样式
        //如果想解析style这个变量 需要使用[]
        return getComputedStyle(ele)[style];
    }else{
        //在IE8及以下浏览器中   应该使用currentStyle获取样式
        return ele.currentStyle[style];
    }
    //3.分析主要代码中  不确定的值  并提取为形参    不确定的值：元素  和  样式
    //4.将形参 带入到 主要代码中
}


//这是一个用来给元素设置动画的函数
var timer = null;
function move (end1,step1,ele,style){
    clearInterval(timer);
    //2.编写主要代码 以div 从0 走到 1000px  为例
    timer = setInterval(function(){
        //走一步的代码
        //2.1设置三要素
        var start = parseInt(getStyle(ele,style));//500
        var end = end1;//30
        var step = step1;//5
        //2.2更新起点  判断  如果往前走（end>start）  执行+=  如果往回走（end<start） 执行-=
        end>start ?  step = step: step = -step;
        start+=step
        //判断  如果到达终点  清除定时器 停下来
        if(step>0&&start>=end || step<0&&start<=end){
            clearInterval(timer);
            start = end;
        }                
        //2.3将div定位到 新起点（当前的终点）
        ele.style[style] = start + 'px';
    },30) 
    //3.分析 不确定的值   提成参数  end  step  元素   属性
    //4.将形参 带入到 主要代码中
}


//封装一个 可以给 任意元素 添加任意事件 且处理函数为指定函数的  函数
function bind(ele,type,fun) {
    //如果想兼容  只要判断以下即可
    if (ele.addEventListener == undefined) {
        //证明在IE低版本浏览器中
        ele.attachEvent("on"+type, fun)
    } else {
        ele.addEventListener(type, fun)
    }
    //不确定的值  元素  事件类型  事件处理函数
}

//将绑定滚轮事件的兼容 封装为函数
function bindWheel(ele, fun) {
    ele.onmousewheel = fun;

    //判断  如果可以使用addEventListener  就使用这个方法 绑定一个滚轮事件
    if (ele.addEventListener != undefined) {
        ele.addEventListener("DOMMouseScroll", fun);
    }
    //分析不确定的值  事件处理函数   绑定事件的元素也不能确定
}


//需求：我们需要封装一个 可以给任意元素 添加拖拽效果的函数
function drag(ele) {
    var img = ele;
    //2.鼠标按下事件
    img.onmousedown = function (ev) {
        var event = window.event || ev;
        //设置全局捕获
        if (img.setCapture != undefined) {
            img.setCapture();
        }

        //2.1 计算一下位置差
        var disX = event.clientX + document.documentElement.scrollLeft - img.offsetLeft;
        var disY = event.clientY + document.documentElement.scrollTop - img.offsetTop;
        //3.添加鼠标移动事件
        document.onmousemove = function (ev) {
            var event = window.event || ev;
            //1.获取鼠标位置
            var x = event.clientX + document.documentElement.scrollLeft - disX;
            var y = event.clientY + document.documentElement.scrollTop - disY;
            //在定位之前 限制一下 定位值的范围
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            if (x > document.documentElement.clientWidth - img.offsetWidth) {
                x = document.documentElement.clientWidth - img.offsetWidth;
            }
            if (y > document.documentElement.clientHeight - img.offsetHeight) {
                y = document.documentElement.clientHeight - img.offsetHeight;
            }
            //2.设置图片定位
            img.style.left = x + 'px';
            img.style.top = y + 'px';
        }
        //在标准浏览器中 我们可以通过 阻止鼠标按下事件的默认行为来防止拖拽图片或文字的bug
        return false;
    }
    img.onmouseup = function () {
        document.onmousemove = null;
        if (img.releaseCapture != undefined) {
            img.releaseCapture();
        }

    }
    //拖拽效果在js中存在默认行为  当拖拽图片 拖拽选中的文字的时候  拖图片默认执行保存图片的效果  拖选中文字的时候 默认执行文字拖拽的效果


    //控制范围 其实就是 控制一下 元素定位的值
}


//封装缓冲动画函数
function bufferMove(ele,obj,fn){//形参fn用来接受回调函数
    clearInterval(ele.timer);
    //obj将接受一个对象类型实参  {width:500,height:500,opacity:0.5}  该对象中属性名是要添加动画的样式属性名  属性值 则是动画的终点值
    ele.timer = setInterval(function(){
        //声明一个状态变量  记录所有属性是否都到达终点
        var flag = '到了';
        //循环obj对象
        for(var key in obj){
            // key  obj[key]
            //三要素
            if(key=="opacity"){
                var start = getStyle(ele,key)*100;
                var end = obj[key]*100;
            }else{
                var start = parseInt(getStyle(ele,key));
                var end = obj[key];
            }
            var step = (end-start)/10;
            //处理步长 为了能走到终点
            step = step>0?Math.ceil(step):Math.floor(step);
            //更新起点
            start += step;
            if(start!=end){
               flag = "没到";
            }
            //设置样式
            if(key=="opacity"){
                ele.style[key] = start/100;
            }else{
                ele.style[key] = start + 'px';
            }
            
        }
        if(flag=="到了"){
            //等大家都到了 再清除定时器
            clearInterval(ele.timer);
            //动画结束了   这时我们立即调用回调函数
            if(fn!=undefined){
                 fn();
            }
        }
    },30)
}

//封装ajax函数  可以用来 请求任意后台地址的数据 可以使用用任意请求方式  可以提交任意数据
function ajax(url,method,fn,data){
    var xhr = new XMLHttpRequest();
    if(method=="get"){
        data!=undefined ? xhr.open(method,url+"?"+data) : xhr.open(method,url);
        xhr.send();
    }else{
        xhr.open(method,url);
        //设置请求头
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        data!=undefined ? xhr.send(data) : xhr.send();
    }
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&(xhr.status==200||xhr.status==304)){
            //这里形参fn 会 接收到 函数调用时传入的实参函数
            fn(xhr.responseText);
        }
    }//不确定的值  url地址 请求方式 提交的数据
}