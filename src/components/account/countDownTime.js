/**
 * Created by MILLER on 2017/3/28.
 */


export default  {
  getCountDownTime(_MissTime,_CTime){
    var _NowTime = new Date().getTime();
    var dni =_MissTime - (_NowTime - _CTime);
    if(dni<0){
      return "00:00:00";
    }
    var day =parseInt(dni/(1000*60*60*24));
    var hour = parseInt((dni-1000*60*60*24*day)/(1000*60*60));
    var minut = parseInt((dni-1000*60*60*24*day-1000*60*60*hour)/(1000*60));
    var second = parseInt((dni-1000*60*60*24*day-1000*60*60*hour-1000*60*minut)/1000);
    var content = "";
    if(hour>=1){
      content += hour<10?"0"+hour+":":hour+":"
    }else{
      content += "00:"
    }
    if(minut>=1){
      content += minut<10?"0"+minut+":":minut+":"
    }else{
      content += "00:"
    }
    if(second>=1){
      content += second<10?"0"+second:second;
    }else{
      content += "00";
    }
    return content;
  }
}





