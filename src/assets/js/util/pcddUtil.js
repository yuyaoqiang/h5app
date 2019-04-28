import arrayUtil  from './arrayUtil'
import objectUtil  from './objectUtil'
export default {
    ballColor:{
        red:['3','6','9','12', '15','18','21','24'],
        blue:['2','5','8','11','17','20','23','26'],
        greed:['1','4','7','10','16','19','22','25'],
        yellow:['0','13','14','27'],
    },
    chinaColor:[
        {english:'red',china:'红'},
        {english:'blue',china:'蓝'},
        {english:'greed',china:'绿'},
        {english:'yellow',china:'黄'},
    ],
    //智能走势
    zhinengTrend(array,data,selectIndex){
        if(selectIndex==0){
            this.pingma(array,data);
            this.heshu(array,data);
            return
        }
        this.singleAndDouble(array,data);
        this.getColorName(array,data);
        this.bigAndSmall(array,data);
        this.sameNumber(array,data);
        this.max(array,data);
        this.min(array,data);

    },
    selectColor(item){
        var colorArr= this.ballColor;
        var color = "";
        for(var i in colorArr){
            arrayUtil.forEach(colorArr[i],j=>{
                if(item == j){
                    color = i;
                }
            })
        }
        return color;
    },
    pingma(numberList,arr){
        var temp =  numberList;
        arrayUtil.forEach(temp,(item,index)=>{
             var color = this.selectColor(item)
            arr.push({num:item,color:color});
            if(temp.length-1==index){
                arr[index].borderRight='trend-number';
            }
        })
    },
    everyNumSetColor(item,arr){
        var color = this.selectColor(item)
            arr.push({num:item,color:color,border:'trend-number'});
    },
    tema(numberList,arr){
        var item =  this.getListLastNumber(numberList);
        var color = this.selectColor(item)
        arr.push({num:item,color:color,borderRight:'trend-number'});
    },
    bigAndSmall(numberList,arr){
        var count =   this.he(numberList);
        if(count<14){
            arr.push({num:'小',borderRight:'trend-number',});
        }else{
            arr.push({num:'大',borderRight:'trend-number'});
        }
    },
    max(numberList,arr){
        var count =   this.he(numberList)
        if(count>21){
            arr.push({num:'极大',borderRight:'trend-number',});
        }else{
            arr.push({num:'',borderRight:'trend-number',});
        }
    },
    min(numberList,arr){
        var count =   this.he(numberList)
        if(count<6){
            arr.push({num:'极小',borderRight:'trend-number',});
        }else{
            arr.push({num:'',borderRight:'trend-number',});
        }
    },
    singleAndDouble(numberList,arr){
        var count =   this.he(numberList)
        if(count%2 == 0){
            arr.push({num:'双',borderRight:'trend-number',});
        }else{
            arr.push({num:'单',borderRight:'trend-number'});
        }
    },
    getColorName(numberList,arr){
        var count =   this.he(numberList)
        var colorName = this.selectColor(count);
        var chinaName = this.chinaColor;
        arrayUtil.forEach(chinaName,name=>{
           if( name.english == colorName){
               arr.push({num:name.china,borderRight:'trend-number'});
           }
        })
    },
    he(numberList,arr){
        var item  =  numberList;
        var count = (item[0]/1) +(item[1]/1)+(item[2]/1)
        return count;
    },
    sameNumber(numberList,arr){
        var item  =  numberList;
        var count = [];
        arrayUtil.forEach(item,i=>{
             var temp =  arrayUtil.indexOf(count,i);
             if(temp == -1){
                 count.push(i);
             }
        })
        arr.push({num:count.length==1?"豹子":" ",borderRight:'trend-number'});
    },
    heshu(numberList,arr){
       var count =   this.he(numberList)
        var color = this.selectColor(count)
        arr.push({num:count,color:color,borderRight:'trend-number'});
    },
}