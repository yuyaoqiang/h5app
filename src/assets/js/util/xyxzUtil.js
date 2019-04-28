import arrayUtil  from './arrayUtil'
import objectUtil  from './objectUtil'
export default {
    ballColor:{
        red:['01', '04', '07', '10', '13', '16', '19', '22', '25', '28', '31', '34'],
        greed:['03', '06', '09', '12', '15', '18', '21', '24','27', '30','33', '36', ],
        blue:['02', '05', '08', '11', '14', '17', '20', '23', '26', '29', '32', '35', ],
    },
    chinaColor:[
        {english:'red',china:'红'},
        {english:'blue',china:'蓝'},
        {english:'greed',china:'绿'},
    ],
    isInit:false,
    currentCache:{},

    years:[2018,2019,2020,2021,2022],
    shenxiao:{
        year:2018,
        currentAnimal:'摩羯',
        animal:{
            '摩羯':[10,22,34,],
            '射手':[9,21,33,],
            '天蝎':[8,20,32,],
            '天秤':[7,19,31,],
            '处女':[6,18,30,],
            '狮子':[5,17,29,],
            '巨蟹':[4,16,28,],
            '双子':[3,15,27,],
            '金牛':[2,14,26,],
            '白羊':[1,13,25,],
            '双鱼':[12,24,36,],
            '水瓶':[11,23,35,],
        }
    },
    animals:['摩羯','射手','天蝎','天秤','处女','狮子','巨蟹','双子','金牛','白羊','双鱼','水瓶'],
    baseData:[[10,22,34,],[9,21,33,],[8,20,32,],[7,19,31,],[6,18,30,],[5,17,29,],[4,16,28,],[3,15,27,],[2,14,26,],[1,13,25,],[12,24,36,],[11,23,35,]],
    
    jiaye:[
        {
            type:0,
            names:['牛','马','羊','鸡','狗','猪',],
            number:[],
        },
        {
            type:1,
            names: ['鼠','虎','兔','龙','蛇','猴',],
            number:[],
        }
    ],
    weishuColumn:{
            firstColumn:['00尾','01尾',	'02尾','03尾','04尾','05尾','06尾','07尾','08尾','09尾'],
            secondColumn:['10-20-30','01-11-21-31','02-12-22-32','03-13-23-33','04-14-24-34','05-15-25-35','6-16-26-36','07-17-27-37','08-18-28','09-19-29'],
    },
    duanshu:{
        firstColumn:['00段','01段','02段','03段','04段','05段','06段','07段','08段','09段',],
        secondColumn:['01-02-03-04-05','06-07-08-09-10','11-12-13-14-15','16-17-18-19-20','21-22-23-24-25','26-27-28-29-30','31-32-33-34-35','36-37-38-39-40','41-42-43-44-45','46-47-48-49'],
    },
    setJiayeData(yearTime){
        this.countAnimalNumber(yearTime);
        var jiaye = this.jiaye;
        var animalList = this.shenxiao.animal;
        for(var i  in animalList){
            arrayUtil.forEach(jiaye,item =>{
                var names = item.names;
                if(arrayUtil.indexOf(names,this.animals[i])!=-1){
                    item.number = item.number.concat(animalList[i]);
                }
            })
        }
    },
    getAnimalStyle(yearTime,num,type){
       this.setJiayeData(yearTime);
       var flag = false;
        if(type==0) {
            var tempArr = this.jiaye[0].number;
            flag =  arrayUtil.indexOf(tempArr, num)!= -1 ?true :false;
        }else{
            var tempArr = this.jiaye[1].number;
            flag = arrayUtil.indexOf(tempArr, num)!= -1 ?true :false;
        }
        return flag;
    },
    //智能走势
    zhinengTrend(yearTime,array,data,selectIndex){
        if(selectIndex==0){
            this.pingma(array,data);
        }else{
            this.tema(array,data);
            this.animal(yearTime,array,data);
            this.singleAndDouble(array,data);
            this.getColorName(array,data);
            this.header(array,data);
            this.tail(array,data);
            this.heshuang(array,data);
            this.heshu(array,data);
        }
    },
    getYear(){
     var currentDate =  new Date();
     return currentDate.getFullYear();
    },
    morkColumnNums(){
        var arr = [];
        for(var i=1;i<=36;i++){
            arr.push(i)
        }
        return arr;
    },
    getWeiNumbers(){
     return this.weishuColumn;
    },
    getbose(){
     return this.ballColor;
    },
    getDuanNumber(){
     return this.duanshu;
    },

    morkAnimalNums(){
        this.countAnimalNumber(2018);
        var animalList = this.shenxiao.animal;
        var list = objectUtil.extendDeepCopy(animalList);
        var concatList = [];
        for(var i in list){
            var arr = list[i];
            arrayUtil.forEach(arr,(item,index)=>{
                if(arr.length-1 == index){
                    arr[index]={num:item,border:'trend-number'}
                }else{
                    arr[index]={num:item}
                }

            })
            concatList =  concatList.concat(arr);
        }
        return concatList;
    },
    morkAnimalNums2(){
        this.countAnimalNumber(2018);
        var animalList = this.shenxiao.animal;
        var list = objectUtil.extendDeepCopy(animalList);
        var concatList = [];
        for(var i in list){
            var arr = list[i];
            concatList.push(arr)
        }
        return concatList;
    },
    countAnimalNumber(yeartime){

        var _this =this;
        this.shenxiao.animal = this.currentCache[yeartime];
        if(this.isInit)return
        for(var i= 0; i<this.years.length; i++){
            _this.arrUpate(this.years[i]);
        }
        this.shenxiao.animal = this.shenxiao.animal;
        this.shenxiao.animal = this.currentCache[yeartime];
        this.isInit = true;
    },
    arrUpate(year){
        var arr = [];
        for(let i=0;i<this.baseData.length;i++){
           
            arr[i] = this.baseData[i];
            
        }
        if(this.currentCache['2017'] == null){
            var newAnimal={};
            arrayUtil.forEach(this.animals,(item,index)=>{
                newAnimal[index] = this.baseData[index];
            })
            this.currentCache['2017'] = newAnimal;
        }
        this.baseData = arr;
        var newAnimal={};
        arrayUtil.forEach(this.animals,(item,index)=>{
            newAnimal[index] = arr[index];
        })
        this.currentCache[year] = newAnimal;
    },
    getListLastNumber(numberList){
         var item =  numberList.slice(6,7)[0];
         return item;
    },
    getAnimal(yeartime,item){
        var ruslut ="";
        this.countAnimalNumber(yeartime);
        var animal = this.shenxiao.animal;
        for(var i in animal){
            arrayUtil.forEach(animal[i],a=>{
                if(item == a){
                    ruslut = this.animals[i];
                }
            })
        }
        return ruslut;
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
         var temp =  numberList.slice(0,6)
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
    animal(yearTime,numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var color = this.selectColor(item);
        var animal= this.getAnimal(yearTime,item/1)
        arr.push({num:animal,color:color,width:'xyxz-show',borderRight:'trend-number'});
    },
    singleAndDouble(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        if(item%2 == 0){
            arr.push({num:'双',borderRight:'trend-number'});
        }else{
            arr.push({num:'单',borderRight:'trend-number'});
        }
    },
    getColorName(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var colorName = this.selectColor(item);
        var chinaName = this.chinaColor;
        arrayUtil.forEach(chinaName,name=>{
           if( name.english == colorName){
               arr.push({num:name.china,borderRight:'trend-number'});
           }
        })
    },
    getwuxing(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:'金',borderRight:'trend-number'});
    },
    header(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:item[0]+'头',borderRight:'trend-number'});
    },
    tail(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        arr.push({num:item[1]+'尾',borderRight:'trend-number'});
    },
    heshuang(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var count = (item[0]/1) +(item[1]/1)
        var num=  count%2 == 0?'合双':'合单'
        arr.push({num:num,borderRight:'trend-number'});
    },
    heshu(numberList,arr){
        var item  =  this.getListLastNumber(numberList);
        var count = (item[0]/1) +(item[1]/1)
        arr.push({num:count+"合",borderRight:'trend-number'});
    },
    daxiao(numberList,arr){
        var ruslut = '';
        var item  =  this.getListLastNumber(numberList);
        ruslut = item/1 > 18 ? "大于>18":"小于<18";
        if(item == 18){
           ruslut = "等于=18"
        }
        arr.push({num:ruslut,borderRight:'trend-number'});
    },
    countNumber(numberList,arr){
        var ruslut = 0;
        arrayUtil.forEach(numberList,item =>{
            var num = item/1;
            ruslut+=num;
        })
        ruslut = ruslut/1 >= 112 ? ruslut+"≥112": ruslut+"≤111";
        arr.push({num:ruslut,borderRight:'trend-number'});
    }
}