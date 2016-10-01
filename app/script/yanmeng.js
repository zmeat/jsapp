function fnTime () {

    var myTime = new Date();
    
    // number
    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth()+1;
    var iDate = myTime.getDate();
    var iWeek = myTime.getDay();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();
    var iSec = myTime.getSeconds();
    var str = '';
    
    if( iWeek === 0 ) iWeek = '星期日';
    if( iWeek === 1 ) iWeek = '星期一';
    if( iWeek === 2 ) iWeek = '星期二';
    if( iWeek === 3 ) iWeek = '星期三';
    if( iWeek === 4 ) iWeek = '星期四';
    if( iWeek === 5 ) iWeek = '星期五';
    if( iWeek === 6 ) iWeek = '星期六';
    


    str = iYear+ '-' +format(iMonth)+'-'+format(iDate);
    
    return str;

}

function format(d){
    var i = /([0-9]){2}/.test(d+'');

    if(i){
        return d;
    }else{
        return '0'+d;
    }
}