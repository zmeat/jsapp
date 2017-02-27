var soap_header = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tip='http://www.dsc.com.tw/tiptop/TIPTOPServiceGateWay'>"+
"    <soapenv:Header>"+ 
"    <soapenv:Header/>"+
"    <soapenv:Body>"+
"        <tip:Sel_genRequest>"+
"            <tip:request>"+
"                <Request>"+
"                    <Access>"+
"                        <Authentication user='topgui' password='topgui'/>"+
"                        <Connection application='lvruan' source='192.168.0.5'/>"+
"                        <Organization name='DS1'/>"+
"                        <Locale language='zh-cn'/>"+
"                    </Access>"+
"                    <RequestContent>";
var soap_content = 		"<Document>"+
"                            <RecordSet id='1'>"+
"                                <Master name='gen_file'>"+
"                                    <Record>"+
"                                        <Field name='gen01' value='272'/>"+
"                                    </Record>"+
"                                </Master>"+
"                            </RecordSet>"+
"                        </Document>";
var soap_footer =  "</RequestContent>"+
"                </Request>"+
"            </tip:request>"+
"        </tip:Sel_genRequest>"+
"    </soapenv:Body>"+
"</soapenv:Envelope>";


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
	    data: {
	    	body:(soap_header + data + soap_footer)
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
			cb(err, ret);
		}
	});
}
