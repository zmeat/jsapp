//打开一个新窗口的简易封装方法
function openWin(name, url){
    api.openWin({
        name: name,
        url: url
    });
}
//关闭一个窗口的简易方法
function closeWin(name){
	api.closeWin({
	    name: name
	});
}
//简易封装的ajax方法 返回一个promise对象
function ajax(url, type, data, dataType, cb){
	if(!dataType){
		dataType = 'text'
	}
	
	data = (typeof(data) === 'string') ? data : JSON.stringify(data);

	api.ajax({
	    url: url,
	    method: type,
	    headers:{ 
				  'Content-Type':'text/xml; charset=UTF-8',
				  'Soapaction':'\"\"'
			    },
	    data: {
		    	body:data
		    },
	    dataType: dataType,
	    cache: false
	},function(ret, err){
		if($.isFunction(cb)){
			cb(err, ret);
		}
	});
}


//封装方便使用的alert
function alert(msgObj, cb, title){
	var msg = (typeof(msgObj) === 'string') ? msgObj : JSON.stringify(msgObj);

	api.alert({
	    title: title || '',
	    msg: msg,
	}, function(ret, err){
		if($.isFunction(cb)){
			cb(err, ret);
		}
	});
}

//打开搜过页面
function openSearch(cb){
	var UISearchBar = api.require('UISearchBar');

	UISearchBar.open({
	    placeholder: '请输入搜索关键字',
	    historyCount: 10,
	    showRecordBtn: true,
	    texts: {
	        cancelText: '取消',
	        clearText: '清除搜索记录'
	    },
	    styles: {
	        navBar: {
	            bgColor: '#FFFFFF',
	            borderColor: '#ccc'
	        },
	        searchBox: {
	            bgImg: '',
	            color: '#000',
	            height: 44
	        },
	        cancel: {
	            bg: 'rgba(0,0,0,0)',
	            color: '#D2691E',
	            size: 16
	        },
	        list: {
	            color: '#696969',
	            bgColor: '#FFFFFF',
	            borderColor: '#eee',
	            size: 16
	        },
	        clear: {
	            color: '#000000',
	            borderColor: '#ccc',
	            size: 16
	        }
	    }
	}, function(ret, err) {
		if($.isFunction(cb)){
			cb(err, ret, UISearchBar);
		}
	});
}

function openSelector(title, items, singleSelection, cb){
	var UIMultiSelector = api.require('UIMultiSelector');

	UIMultiSelector.open({
	     rect: {
	        h: 244
	     },
	     text: {
	         title: title,
	         leftBtn: '取消',
	         rightBtn: '完成',
	         selectAll: '全选'
	     },
	     max: 0,
	     singleSelection: singleSelection,
	     styles: {
		    bg: '#fff',                        //（可选项）字符串类型；主体的背景，支持 rgb，rgba，#，widget://，fs://；默认：#fff
		    mask: 'rgba(0,0,0,0.3)',           //（可选项）字符串类型；遮罩层的背景，支持 rgb、rgba、#、img；默认：rgba(0,0,0,0)
		    title: {                           //（可选项）JSON 类型；标题栏样式；默认：见内部字段
		        bg: '#ddd',                    //（可选项）字符串类型；标题栏的背景，支持 rgb、rgba、#、img；默认：#ddd
		        color:'#444',                  //（可选项）字符串类型；标题字体颜色，支持 rgb、gba、#；默认：#444
		        size: 16,                      //（可选项）数字类型；标题字体大小；默认：16
		        h: 44                          //（可选项）数字类型；标题栏的高度；默认：44
		    },
		    leftButton: {                      //（可选项）JSON 类型；左上角按钮样式；默认：见内部字段
		        bg: '#e51c23',                    //（可选项）字符串类型；按钮的背景，支持 rgb、rgba、#、img；默认：#f00
		        w: 80,                         //（可选项）数字类型；按钮的宽度；默认：80
		        h: 35,                         //（可选项）数字类型；按钮的高度；默认：35
		        marginT: 5,                    //（可选项）数字类型；按钮的上边距；默认：5
		        marginL: 8,                    //（可选项）数字类型；按钮的左边距；默认：8
		        color: '#fff',                 //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
		        size: 14                       //（可选项）数字类型；按钮的文字大小；默认：14
		    },
		    rightButton: {                     //（可选项）JSON 类型；右上角按钮样式；默认：见内部字段
		        bg: '#009688',                    //（可选项）字符串类型；按钮的背景，支持 rgb、rgba、#、img；默认：#0f0
		        w: 80,                         //（可选项）数字类型；按钮的宽度；默认：80
		        h: 35,                         //（可选项）数字类型；按钮的高度；默认：35
		        marginT: 5,                    //（可选项）数字类型；按钮的上边距；默认：5
		        marginR: 8,                    //（可选项）数字类型；按钮的右边距；默认：8
		        color: '#fff',                 //（可选项）字符串类型；按钮的文字颜色，支持 rgb、rgba、#；默认：#fff
		        size: 14                       //（可选项）数字类型；按钮的文字大小；默认：14
		    },
		    item: {                            //（可选项）JSON 类型；每个选项的样式；默认：见内部字段
		        h: 44,                         //（可选项）数字类型；按钮的高度；默认：35
		        bg: '#fff',                    //（可选项）字符串类型；选项的背景，支持 rgb、rgba、#、img；默认：#fff
		        bgActive: '#fff',              //（可选项）字符串类型；已选中选项的背景，支持 rgb、rgba、#、img；默认：bg
		        bgHighlight: '#fff',           //（可选项）字符串类型；选项的高亮背景，支持 rgb、rgba、#、img；默认：bg
		        color: '#444',                 //（可选项）字符串类型；选项的文字颜色，支持 rgb，rgba，#；默认：#444
		        active: '#444',                //（可选项）字符串类型；已选中选项的文字颜色，支持 rgb、rgba、#；默认：color
		        highlight: '#444',             //（可选项）字符串类型；选项的高亮文字颜色，支持 rgb、rgba、#；默认：color
		        size: 14,                      //（可选项）数字类型；选项的文字大小；默认：14
		        lineColor: '#ccc',             //（可选项）字符串类型；分隔线的颜色，支持 rgb、rgba、#；默认：rgba(0,0,0,0)
		        textAlign: 'left'              //（可选项）字符串类型；选项文字的对齐方式，'left|center|right'，当值为 left 或 right 时文字会根据情况空留 icon 已占的位置；默认：left
		    },
		    icon: {                            //（可选项）JSON 类型；每个选项的状态图标样式，若不传则不显示选中的状态图标
		        w: 20,                         //（可选项）数字类型；图标的高度；默认：20
		        h: 20,                         //（可选项）数字类型；图标的高度；默认：w
		        marginT: 11,                   //（可选项）数字类型；图标的上边距；默认：(item.h - h) / 2
		        marginH: 8,                    //（可选项）数字类型；图标的横向边距，与 align 的对齐方向相关；默认：8
		        bg: '#fff',                    //（可选项）字符串类型；图标未选中时的背景，支持 rgb、rgba、#、img；默认：rgba(0,0,0,0)
		        bgActive: ' #00bcd4',              //（可选项）字符串类型；已选中图标的背景，支持 rgb、rgba、#、img；默认：bg
		        bgHighlight: '#fff',           //（可选项）字符串类型；选项的高亮背景，支持 rgb、rgba、#、img；默认：bg
		        align: 'left'                  //（可选项）字符串类型；图标相对与选项的对齐方式：'left|right'；默认：left
		    }
		},
	     animation: true,
	     items: items
	 }, function(ret, err) {
	    if($.isFunction(cb)){
	    	cb(err, ret, UIMultiSelector);
	    }
	 });
}

//h5申请全屏方法简易封装
function fullScreen(element) {
	this.element = element;
	this.in = function(){
		if(typeof this.element == 'undefined'){
			return alert('element is needed');
		}
	  	if(this.element.requestFullScreen) {
	    	this.element.requestFullScreen();
	  	} else if(this.element.webkitRequestFullScreen ) {
	    	element.webkitRequestFullScreen();
	  	} else if(this.element.mozRequestFullScreen) {
	    	this.element.mozRequestFullScreen();
	  	}
	}
	this.out = function(){
		if (document.exitFullscreen) {
	        document.exitFullscreen();
	    }
	    else if (document.webkitCancelFullScreen) {
	        document.webkitCancelFullScreen();
	    }
	    else if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	    }else{
	    	document.cancelFullScreen();
	    }
	}
}


//时间格式化 引自网络

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/*
调用： 
var time1 = new Date().Format("yyyy-MM-dd");
var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");  
*/

