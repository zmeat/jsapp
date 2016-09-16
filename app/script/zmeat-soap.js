/**
 * zmeat-soap.js soap 参数封装
 * @author zmeat
 * @params window
 */

 (function(window){
 	'use strict';

 	zmeatSoap.prototype.options = {
 		urlTip: 'http://www.dsc.com.tw/tiptop/TIPTOPServiceGateWay',
 		urlSoapenv: 'http://schemas.xmlsoap.org/soap/envelope/',
 		func: 'Sel_genRequest',
 		user: 'topgui',
 		password: 'topgui',
 		application: 'lvruan',
 		source: '192.168.0.5'
 	};
 	zmeatSoap.prototype.temp = "<soapenv:Envelope xmlns:soapenv='{{urlSoapenv}}' xmlns:tip='{{urlTip}}'>"
		                    +"    <soapenv:Header/>"
		                    +"    <soapenv:Body>"
		                    +"       <tip:{{func}}>"
		                    +"          <tip:request>"
		                    +"          &lt;Request>"
		                    +"        &lt;Access>"
		                    +"     &lt;Authentication user='{{user}}' password='{{password}}'/>"
		                    +"     &lt;Connection application='{{application}}' source='{{source}}'/>"
		                    +"     &lt;Organization name='DS1'/>"
		                    +"     &lt;Locale language='zh-cn'/>"
		                    +"   &lt;/Access>"
		                    +"   &lt;RequestContent>"
		                    +"     &lt;Document>"
		                    +"       {{xml}}"
		                    +"     &lt;/Document>"
		                    +"   &lt;/RequestContent>"
		                    +" &lt;/Request>"
		                    +"          </tip:request>"
		                    +"       </tip:{{func}}>"
		                    +"    </soapenv:Body>"
		                    +" </soapenv:Envelope>";

 	zmeatSoap.prototype._init = function(json, options){
 		if(typeof(options) === 'object'){
 			extend(this.options, options);
 		}

 		if(typeof(json) === 'string'){
 			this.options.xml = json;
 		}else{
 			this.options.xml = this._jsonToXml(json);
 		}


 	}
 	/*
	* @params json||string 必填
	* @params option 可选
 	*/
 	function zmeatSoap(json, options){
 		this._init(json, options);
 	}

 	/*
 	*@params json
	*[
	*    {
	*        recordId : 1,
	*        master: [{
	*            name: 'gen_file',
	*            record: [
	*                [{
	*                    name: 'gen01',
	*                    value: '11' 
	*                }]
	*            ]
	*        }]
	*    }
	*]
 	*/
 	zmeatSoap.prototype._jsonToXml = function(json){
 		var str = '';

 		for(var i=0; i<json.length; i++){
		    str += "       &lt;RecordSet id='"+json[i].recordId+"'>"
		    for(var j=0; j<json[i].master.length; j++){
	            str += "         &lt;Master name='"+json[i].master[j].name+"'>"
	            for(var z=0; z<json[i].master[j].record.length; z++){
	            	str += "           &lt;Record>"
	            	for(var k=0; k<json[i].master[j].record[z].length; k++){
		            	str += "             &lt;Field name='"+(json[i].master[j].record[z])[k].name+"' value='"+(json[i].master[j].record[z])[k].value+"'/>"
	            	}
		            str += "           &lt;/Record>"
	            }
	            str += "         &lt;/Master>"
		    }
            str += "       &lt;/RecordSet>"
 		}

 		return str;
 	}
 	zmeatSoap.prototype.xml = function(){
 		var xml = this.temp;

 		for(var key in this.options){
 			var regStr = '{{'+key+'}}';

 			xml = xml.replace(new RegExp(regStr, 'g'), this.options[key]);
 		}

 		return xml;
 	}
 	function extend (a, b) {
		for (var key in a) {
		  	if (b.hasOwnProperty(key)) {
		  		a[key] = b[key];
		  	}
	  	}
	  	return a;
	}
	window.zmeatSoap = zmeatSoap;

 })(window);
